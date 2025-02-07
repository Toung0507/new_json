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

// 使用 curl 命令來抓取 Render 上的 db.json
function syncDbToRepo() {
    exec('curl -o db-last.json https://new-json.onrender.com/db', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }

        // 成功抓取 db.json 後，推送到 GitHub repository
        console.log('Successfully fetched db.json from Render');
        pushToRepo();
    });
}

// 將 db.json 推送到 GitHub
function pushToRepo() {
    exec('git config --global user.email "spexial110@gmail.com"', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log('first');
    });
    //exec('git config --global user.email "spexial110@gmail.com" && git config --global user.name "Toung" && git add db-last.json && git commit -m "Update db-last.json from Render" && git push origin main', (error, stdout, stderr) => {
    //    if (error) {
    //        console.error(`exec error: ${error}`);
    //        return;
    //    }
    //    console.log('Successfully pushed db.json to GitHub');
    //});
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
