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
const { stdout, stderr } = require("process");
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

// 引入不同的處理邏輯 相關的函數設定
const getHandler = require("./routes/getHandler")(router, router.db);          // 處理GET
const postHandler = require("./routes/postHandler")(router, router.db);        // 處理POST
const deleteHandler = require("./routes/deleteHandler")(router, router.db);    // 處理DELETE
const patchHandler = require("./routes/patchHandler")(router, router.db);      // 處理PATCH
const tableExistsMiddleware = require("./routes/isTableExists")(router);       // 檢查路徑的TABLE是否存在
const completeTables = require("./routes/completeTables")(router);             // 完善資料表的內容 > 將有外來鍵的資料所需資料放入原資料表
const { syncDbToRepo } = require('./routes/autoUpdate');                       // 自動上傳最新版db

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
