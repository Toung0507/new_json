const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function pushToRepo() {
    const GITHUB_USERNAME = process.env.GITHUB_USERNAME; // GitHub 使用者名稱
    const REPO_NAME = process.env.REPO_NAME; // Repository 名稱
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // 讀取 GitHub Token，確保環境變數中已設定
    const GITHUB_EMAIL = process.env.GITHUB_EMAIL; // 讀取 email

    if (!GITHUB_TOKEN) {
        console.error("GITHUB_TOKEN is not set!");
        return;
    }

    // 組合 GitHub 遠端倉庫的 URL，使用 Token 進行身份驗證
    const remoteUrl = `https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/${REPO_NAME}.git`;

    try {
        // 設定全局設定
        await exec(`git config --global user.name "${GITHUB_USERNAME}"`);
        await exec(`git config --global user.email "${GITHUB_EMAIL}"`);
        console.log('Git global user info set successfully');

        // 檢查是否已經有設定遠端 origin
        const { stdout } = await exec('git remote -v');
        if (!stdout.includes("origin")) {
            console.log('No remote origin found, adding one...');
            await exec(`git remote add origin ${remoteUrl}`); // 新增遠端 origin
            console.log('remote add ok');
        } else {
            console.log('Remote origin exists, updating URL...');
            await exec(`git remote set-url origin ${remoteUrl}`); // 更新遠端 URL
            console.log('remote set-url ok');
        }

        // 抓取遠端倉庫的最新資訊
        console.log('Fetching latest branches from origin...');
        const { stdout: fetchOutput } = await exec('git fetch origin');
        console.log('Fetch ok:', fetchOutput);

        // 確認目前的分支，並確認出是否有*main 或 *db的回傳結果
        console.log('Check now branch');
        const { stdout: brancOutput } = await exec('git branch');
        console.log('now branch', brancOutput);
        // 檢查是否在當前分支中包含 *main 或 *db
        if (brancOutput.includes('*main')) {
            console.log('You are on the main branch!');
            // 切換到 main 分支，確保處於正確的分支狀態
            console.log('Checking out main branch...');
            await exec('git checkout main');
            console.log('Switched to main');

            // 確認 main 分支是否有未提交的變更
            const { stdout: statusMain } = await exec('git status --porcelain');
            if (statusMain) {
                console.log('Stashing local changes in main branch...');
                await exec('git stash'); // 暫存變更，確保乾淨切換分支
                console.log('Stash ok');
            }

            // 切換到 db 分支，若無則從遠端建立
            console.log('Checking out db branch...');
            await exec('git checkout db || git checkout -b db origin/db');
            console.log('Switched to db branch');

        } else if (brancOutput.includes('*db')) {
            console.log('You are on the db branch!');
        } else {
            console.log('You are on another branch!');
        }

        // 透過 curl 抓取最新的 db.json
        console.log('Fetching latest db.json from Render...');
        await exec('curl -v -o db.json https://new-json.onrender.com/db');
        console.log('db.json fetched');

        // 顯示 db.json 內容
        const { stdout: dbJsonContent } = await exec('cat db.json');
        console.log('db.json content:', dbJsonContent);

        // 確認 db.json 是否有變更
        const { stdout: statusDb } = await exec('git status --porcelain');
        if (statusDb) {
            console.log('Adding db.json to git...');
            await exec('git add db.json'); // 加入 Git 追蹤
            console.log('Add ok');

            await exec('git commit -m "Update db.json from Render"'); // 提交變更
            console.log('Commit ok');

            await exec('git push origin db'); // 推送至遠端 db 分支
            console.log('Push ok');
        } else {
            console.log('No changes detected, skipping commit');
        }
    } catch (error) {
        console.error(`exec error: ${error}`); // 錯誤處理
    }
}


// 匯出函式
module.exports = { pushToRepo };