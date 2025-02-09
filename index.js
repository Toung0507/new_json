const jsonServer = require("json-server");       // importing json-server library
const swaggerJsdoc = require("swagger-jsdoc");   // importing swagger規格文件 library
const swaggerUi = require("swagger-ui-express"); // importing swagger頁面呈現 library
const server = jsonServer.create();
const router = jsonServer.router("db.json");
// const middlewares = jsonServer.defaults();
const middlewares = jsonServer.defaults({ static: 'public' }); // 指定 public 資料夾內為首頁資料夾
const port = process.env.PORT || 4000; // 使用環境變數或預設為 4000

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
        components: { schemas },
        tags: [
            { name: "會員相關", description: "可傳入 / 刪除 / 修改 會員資料" },
            { name: "店家相關", description: "可傳入 / 刪除 / 修改 店家資料" },
            { name: "密室相關", description: "可傳入 / 刪除 / 修改 密室資料" },
            { name: "價格相關", description: "可傳入 / 刪除 / 修改 價格資料" },
            { name: "評論相關", description: "可傳入 / 刪除 / 修改 評論資料" },
            { name: "揪團相關", description: "可傳入 / 刪除 / 修改 揪團資料" },
            { name: "揪團相關", description: "可傳入 / 刪除 / 修改 揪團資料" },
            { name: "固定資料", description: "密室難度標籤跟分類標籤" },
        ]
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
const { pushToRepo } = require('./routes/autoUpdate');                         // 自動上傳最新版db

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
    pushToRepo();
});

// DELETE 請求
// server.delete("/:tableName/:primaryKey", tableExistsMiddleware, deleteHandler);
server.delete("/:tableName/:primaryKey", tableExistsMiddleware, (req, res) => {
    deleteHandler(req, res);
    pushToRepo();
});

// PATCH 請求
// server.patch("/:tableName/:primaryKey", tableExistsMiddleware, patchHandler);
server.patch("/:tableName/:primaryKey", tableExistsMiddleware, (req, res) => {
    patchHandler(req, res);
    pushToRepo();
});

server.use(router);

server.listen(port, () => {
    console.log('JSON SERVER IS RUNNING on', port);
});
