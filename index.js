const jsonServer = require("json-server"); // importing json-server library
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 4000; // you can use any port number here; i chose to use 3001
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
// const middlewares = jsonServer.defaults({ static: 'public' }); // 指定 public 資料夾


// 引入 Swagger 配置
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'D-04 密室搜搜 API 說明',
            version: '1.0.0',
            description: '專題使用的API文件'
        },
    },
    apis: ['./swagger/*.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// 引入不同的處理邏輯
const getHandler = require("./routes/getHandler")(router, router.db);
const postHandler = require("./routes/postHandler")(router, router.db);
const deleteHandler = require("./routes/deleteHandler")(router, router.db);
const patchHandler = require("./routes/patchHandler")(router, router.db);

// 使用 middleware
server.use(middlewares);
server.use(jsonServer.bodyParser);

// 使用 Swagger 路由
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// GET 請求
// server.get("/:tableName/:primaryKey", getHandler);
server.get("/:tableName/:primaryKey/:subTable?", getHandler);

// POST 請求
server.post("/:tableName", postHandler);

// DELETE 請求
server.delete("/:tableName/:primaryKey", deleteHandler);

// PATCH 請求
server.patch("/:tableName/:primaryKey", patchHandler);

// 將store資料補全
server.get("/storesData", (req, res) => {
    const db = router.db; //jsonserver的db.json中
    const users = db.get("usersData").value(); //抓出users的資料
    const stores = db.get("storesData").value(); //抓出stores的資料

    const storesAllData = stores.map((store) => {
        const user_info = users.find((e) => e.user_id === store.user_id);
        return {
            ...store,
            user_name: user_info ? user_info.user_name : "無此店家名稱",
            user_email: user_info ? user_info.user_email : "無此店家信箱",
            user_password: user_info ? user_info.user_password : "無此店家密碼",
        };
    });
    res.json(storesAllData);
});

// 將game資料補全
server.get("/gamesData", (req, res) => {
    const db = router.db; //jsonserver的db.json中
    const stores = db.get("storesData").value(); //抓出stores的資料
    const games = db.get("gamesData").value(); //抓出games的資料
    const difficultys_fixed_Data = db.get("difficultys_fixed_Data").value(); //抓出difficultys_fixed_Data的資料
    const propertys_fixed_Data = db.get("propertys_fixed_Data").value(); //抓出propertys_fixed_Data的資料

    const gamesAllData = games.map((game) => {
        const store_info = stores.find((e) => e.user_id === game.store_id);
        const difficulty_tag = difficultys_fixed_Data.find((e) => e.difficulty_id === game.game_dif_tag);
        const propertys_tag1 = propertys_fixed_Data.find((e) => e.property_id === game.game_main_tag1);
        const propertys_tag2 = propertys_fixed_Data.find((e) => e.property_id === game.game_main_tag2);

        return {
            ...game,
            store_name: store_info ? store_info.store_name : "密室店家名稱缺少",
            store_email: store_info ? store_info.store_email : "密室店家聯絡信箱缺少",
            game_dif_tagname: difficulty_tag ? difficulty_tag.difficulty_name : "未選擇主題難度",
            game_main_tag1name: propertys_tag1 ? propertys_tag1.property_name : "未選擇主題標籤1",
            game_main_tag2name: propertys_tag2 ? propertys_tag2.property_name : "未選擇主題標籤2",
        };
    });
    res.json(gamesAllData);
});

server.use(router);

server.listen(port, () => {
    console.log('JSON SERVER IS RUNNING on', port);

});
