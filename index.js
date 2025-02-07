const jsonServer = require("json-server");       // importing json-server library
const swaggerJsdoc = require("swagger-jsdoc");   // importing swagger規格文件 library
const swaggerUi = require("swagger-ui-express"); // importing swagger頁面呈現 library
const server = jsonServer.create();
const router = jsonServer.router("db.json");
// const middlewares = jsonServer.defaults();
const middlewares = jsonServer.defaults({ static: 'public' }); // 指定 public 資料夾內為首頁資料夾
const port = process.env.PORT || 4000; // 使用環境變數或預設為 4000
const axios = require('axios');                  // 引入 axios 用於發送 HTTP 請求
const { exec } = require('child_process'); // 引入 exec 用來執行 shell 命令

// 引入 Swagger 配置
const schemas = require('./swagger/schemas'); // 引入 schemas.js
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'D-04 密室搜搜 API 說明',
            version: '1.0.0',
            description: '專題使用的API文件'
        },
        components: { schemas }
    },
    apis: ['./swagger/*.js'] //相關文件設定都在此資料夾下，一個檔案是一種tag分類
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// 抓取 db.json 資料
function syncDbToRepo() {
    console.log('Fetching db.json from Render...');
    exec('curl -v -o db.json https://new-json.onrender.com/db', (error, stdout, stderr) => {
        if (error) {
            console.error('Error fetching db.json:', error);
            return;
        }
        console.log('Fetch stdout:', stdout);
        console.error('Fetch stderr:', stderr);

        // 檢查 db.json 內容
        exec('cat db.json', (error, stdout, stderr) => {
            if (error) {
                console.error('Error reading db.json:', error);
                return;
            }
            console.log('db.json content:', stdout);  // 顯示 db.json 內容

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
    const GITHUB_USERNAME = "Toung0507"; // 你的 GitHub 使用者名稱
    const REPO_NAME = "new_json"; // 你的 Repo 名稱
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // 讀取 GitHub Token (確保在 Render 環境變數裡有設置)

    if (!GITHUB_TOKEN) {
        console.error("GITHUB_TOKEN is not set!");
        return;
    }

    const remoteUrl = `https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/${REPO_NAME}.git`;

    // 設定使用者名稱和電子郵件
    exec('git config --global user.email "spexial110@gmail.com"', (error) => {
        if (error) {
            console.error('Error setting email:', error);
            return;
        }
        exec('git config --global user.name "Toung"', (error) => {
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

            // 推送變更到 GitHub
            console.log('Pushing changes...');
            exec('git push', (error, stdout, stderr) => {
                if (error) {
                    console.error('Error pushing to GitHub:', error);
                    return;
                }
                console.log('Changes pushed successfully:', stdout);
                console.log('Changes pushed err successfully:', stderr);
            });
        });
    });
}

// 引入不同的處理邏輯 相關的函數設定
const getHandler = require("./routes/getHandler")(router, router.db);          // 處理GET
const postHandler = require("./routes/postHandler")(router, router.db);        // 處理POST
const deleteHandler = require("./routes/deleteHandler")(router, router.db);    // 處理DELETE
const patchHandler = require("./routes/patchHandler")(router, router.db);      // 處理PATCH
const tableExistsMiddleware = require("./routes/isTableExists")(router);       // 檢查路徑的TABLE是否存在
const completeTables = require("./routes/completeTables")(router);             // 完善資料表的內容 > 將有外來鍵的資料所需資料放入原資料表

// 使用 middleware
server.use(middlewares);
server.use(jsonServer.bodyParser);


// 使用 Swagger 路由
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// GET 請求
server.get("/:tableName/:primaryKey/:subTable?", tableExistsMiddleware, getHandler, completeTables);
server.get("/:tableName", tableExistsMiddleware, completeTables);

// POST 請求
// server.post("/:tableName", tableExistsMiddleware, postHandler);
server.post("/:tableName", tableExistsMiddleware, (req, res) => {
    postHandler(req, res);
    syncDbToRepo();
});

// DELETE 請求
// server.delete("/:tableName/:primaryKey", tableExistsMiddleware, deleteHandler);
server.delete("/:tableName/:primaryKey", tableExistsMiddleware, (req, res) => {
    deleteHandler(req, res);
    syncDbToRepo();
});

// PATCH 請求
// server.patch("/:tableName/:primaryKey", tableExistsMiddleware, patchHandler);
server.patch("/:tableName/:primaryKey", tableExistsMiddleware, (req, res) => {
    patchHandler(req, res);
    syncDbToRepo();
});

server.use(router);

server.listen(port, () => {
    console.log('JSON SERVER IS RUNNING on', port);
});
