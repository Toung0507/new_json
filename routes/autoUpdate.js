const { exec } = require('child_process'); // 引入 exec 用來執行 shell 命令
// 抓取 db.json 資料
function syncDbToRepo() {
    console.log('Fetching db.json from Render...');
    exec('curl -v -o db.json https://new-json.onrender.com/db', (error, stdout, stderr) => {
        if (error) {
            console.error('Error fetching db.json:', error);
            return;
        }
        // console.log('Fetch stdout:', stdout);
        // console.error('Fetch stderr:', stderr);

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
            pushToRepo();
        } else {
            console.log('No changes detected in db.json');
        }
    });
}

// 將 db.json 推送到 GitHub
function pushToRepo() {
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
                        commitAndPushChanges();
                    });
                } else {
                    console.log('Remote exists.');
                    commitAndPushChanges();
                }
            });
        });
    });
}

// 提交並推送變更
function commitAndPushChanges() {
    console.log('checkout branch');

    exec('git fetch origin', (error, stdout) => {
        if (error) {
            console.error('fetch error ', error);
            return;
        }
        // console.log('Changes pushed successfully:', stdout);
        // console.log('branch', stdout);
        exec('git branch -r', (error, stdout) => {
            if (error) {
                console.error('fetch branch error ', error);
                return;
            }
            // console.log('Changes pushed successfully:', stdout);
            console.log('all branch', stdout);
        });
    });

    // console.log('Switching to main branch...');
    console.log('Switching to db branch...');
    // exec('git checkout main', (error, stdout, stderr) => {
    exec('git checkout db || git checkout -b db origin/db', (error, stdout, stderr) => {
        if (error) {
            // console.error('Error switching to main branch:', error);
            console.error('Error switching to db branch:', error);
            return;
        }
        // console.log('Switched to main:', stdout);
        console.log('Switched to db:', stdout);

        console.log('Committing changes...');
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

                // exec('git push origin main', (error, stdout, stderr) => {
                exec('git push origin db', (error, stdout) => {
                    if (error) {
                        console.error('Error pushing to GitHub:', error);
                        return;
                    }
                    // console.log('Changes pushed successfully:', stdout);
                    console.log('Changes pushed to db branch successfully:', stdout);
                });
            });
        });
    });
}

// 匯出函式
module.exports = { syncDbToRepo, checkGitStatus, pushToRepo, commitAndPushChanges };