const jsonServer = require("json-server"); // importing json-server library
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 4000; // you can use any port number here; i chose to use 3001

server.use(middlewares);

// 新增測試
// 自定義路由處理邏輯
server.get("/gamesWithDetails", (req, res) => {
    const db = router.db; // 獲取 db.json 資料
    const games = db.get("gamesData").value(); // 取得 gamesData
    const difficulties = db.get("difficultys_fixed_Data").value(); // 取得難度資料
    const properties = db.get("propertys_fixed_Data").value(); // 取得屬性資料
    const stores = db.get("storesData").value(); // 取得商店資料

    // 建立自定義資料結構
    const result = games.map((game) => {
        const difficulty = difficulties.find(
            (d) => d.difficulty_id === game.game_dif_tag
        )?.difficulty_name;

        const tags = [game.game_main_tag1, game.game_main_tag2]
            .map((tagId) => properties.find((p) => p.property_id === tagId)?.property_name)
            .filter((tag) => tag);

        const store = stores.find((store) => store.store_id === game.store_id);

        return {
            game_id: game.game_id,
            game_name: game.game_name,
            difficulty: difficulty || "未知難度",
            tags: tags.length > 0 ? tags : ["無標籤"],
            store: store
                ? {
                    store_id: store.store_id,
                    store_name: store.store_name,
                    store_address: store.store_address,
                }
                : null,
        };
    });

    res.json(result); // 回傳自定義的資料
});

// 新增結束

server.use(router);

server.listen(port, () => {
    console.log('JSON SERVER IS RUNNING on', port);

});
