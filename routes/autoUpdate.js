const { exec } = require('child_process'); // 引入 exec 用來執行 shell 命令
// 設定遠端 repository 並開始流程
function setupRemoteAndFetch() {
    const GITHUB_USERNAME = process.env.GITHUB_USERNAME; // 你的 GitHub 使用者名稱
    const REPO_NAME = process.env.REPO_NAME; // 你的 Repo 名稱
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // 讀取 GitHub Token (確保在 Render 環境變數裡有設置)
    const remoteUrl = `https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/${REPO_NAME}.git`;

    if (!GITHUB_TOKEN) {
        console.error("GITHUB_TOKEN is not set!");
        return;
    }

    // 檢查是否已有遠端 origin，若無則新增
    exec('git remote -v', (error, stdout, stderr) => {
        if (error) {
            console.error('Error checking remote:', error);
            return;
        }

        if (!stdout.includes("origin")) {
            console.log('Adding remote origin...');
            exec(`git remote add origin ${remoteUrl}`, (error, stdout, stderr) => {
                if (error) {
                    console.error('Error adding remote:', error);
                    return;
                }
                console.log('Remote origin added successfully.');
                // 設置完成後執行 fetch 操作
                fetchAndProceed();
            });
        } else {
            console.log('Remote origin already exists.');
            fetchAndProceed();
        }
    });
}

// 抓取遠端資料並繼續後續操作
function fetchAndProceed() {
    console.log('Fetching latest branches from origin...');

    // 先抓取遠端資料
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
    console.log('Committing and pushing changes to db branch...');

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
module.exports = { setupRemoteAndFetch, fetchAndProceed, fetchDbJson, checkGitStatus, commitAndPushChanges };