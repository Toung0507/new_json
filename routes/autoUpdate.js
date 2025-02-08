const { exec } = require('child_process'); // 引入 exec 用來執行 shell 命令
// 切換到 db 分支並抓取最新 db.json
function switchToDbBranchAndFetch() {
    console.log('Fetching latest branches from origin...');

    // 先抓取遠端的資料
    exec('git fetch origin', (error, stdout, stderr) => {
        if (error) {
            console.error('Error fetching from origin:', error);
            return;
        }

        console.log('Fetched from origin successfully:', stdout);

        // 確認遠端分支是否有 db 分支
        exec('git branch -r', (error, stdout, stderr) => {
            if (error) {
                console.error('Error listing remote branches:', error);
                return;
            }

            console.log('Remote branches:', stdout);

            // 切換到 db 分支（若不存在則創建）
            exec('git checkout db || git checkout -b db origin/db', (error, stdout, stderr) => {
                if (error) {
                    console.error('Error switching to db branch:', error);
                    return;
                }
                console.log('Switched to db branch:', stdout);

                // 抓取最新的 db.json
                fetchDbJson();
            });
        });
    });
}

// 抓取 db.json 資料
function fetchDbJson() {
    console.log('Fetching db.json from Render...');

    exec('curl -v -o db.json https://new-json.onrender.com/db', (error, stdout, stderr) => {
        if (error) {
            console.error('Error fetching db.json:', error);
            return;
        }

        // 檢查 db.json 內容
        exec('cat db.json', (error, stdout, stderr) => {
            if (error) {
                console.error('Error reading db.json:', error);
                return;
            }
            // console.log('db.json content:', stdout);  // 顯示 db.json 內容

            // 進行 Git 操作
            checkGitStatus();
        });
    });
}

// 檢查 Git 狀態，確認是否有變更
function checkGitStatus() {
    console.log('Checking git status before commit...');

    exec('git status --porcelain', (error, stdout, stderr) => {
        if (error) {
            console.error('Error checking git status:', error);
            return;
        }

        if (stdout) {
            console.log('Git status before commit:', stdout);
            // 如果有變更，就進行提交
            commitAndPushChanges();
        } else {
            console.log('No changes detected in db.json');
        }
    });
}

// 提交並推送變更
function commitAndPushChanges() {
    const GITHUB_USERNAME = process.env.GITHUB_USERNAME; // 你的 GitHub 使用者名稱
    const REPO_NAME = process.env.REPO_NAME; // 你的 Repo 名稱
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // 讀取 GitHub Token (確保在 Render 環境變數裡有設置)
    const user_email = process.env.GITHUB_EMAIL; // user.email
    const user_name = process.env.GITHUB_NAME; // user.name

    if (!GITHUB_TOKEN) {
        console.error("GITHUB_TOKEN is not set!");
        return;
    }
    const remoteUrl = `https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/${REPO_NAME}.git`;

    // 設定使用者名稱和電子郵件
    exec(`git config --global user.email "${user_email}"`, (error) => {
        if (error) {
            console.error('Error setting email:', error);
            return;
        }
        exec(`git config --global user.name "${user_name}"`, (error) => {
            if (error) {
                console.error('Error setting username:', error);
                return;
            }

            // 檢查 remote 是否存在
            exec('git remote -v', (error, stdout) => {
                if (error) {
                    console.error('Error checking remote:', error);
                    return;
                }
                if (!stdout.includes("origin")) {
                    exec(`git remote add origin ${remoteUrl}`, (error) => {
                        if (error) {
                            console.error('Error adding remote:', error);
                            return;
                        }
                        console.log('Remote added successfully.');
                        pushChanges();
                    });
                } else {
                    console.log('Remote exists.');
                    pushChanges();
                }
            });
        });
    });
}

// 將變更推送到 GitHub
function pushChanges() {
    console.log('Pushing changes to db branch...');

    exec('git add db.json', (error) => {
        if (error) {
            console.error('Error adding db.json to git:', error);
            return;
        }

        exec('git commit -m "Update db.json"', (error) => {
            if (error) {
                console.error('Error committing db.json:', error);
                return;
            }

            exec('git push origin db', (error, stdout) => {
                if (error) {
                    console.error('Error pushing to GitHub:', error);
                    return;
                }
                console.log('Changes pushed to db branch successfully:', stdout);
            });
        });
    });
}

// 匯出函式
module.exports = { switchToDbBranchAndFetch, fetchDbJson, checkGitStatus, commitAndPushChanges, pushChanges };