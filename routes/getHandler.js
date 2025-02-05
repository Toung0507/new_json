module.exports = (router, db) => {
    return (req, res) => {
        const { tableName, primaryKey } = req.params;
        const subTable = req.path.split("/")[3]; // 確保能正確解析 `subTable`

        const primaryKeyFields = {
            difficultys_fixed_Data: "difficulty_id",
            propertys_fixed_Data: "property_id",
            usersData: "user_id",
            storesData: "store_id",
            gamesData: "game_id",
            pricesData: "price_id",
            commentsData: "comment_id",
            groupsData: "group_id"
        };

        if (!primaryKeyFields[tableName]) {
            return res.status(400).json({ error: `Invalid table name: ${tableName}` });
        }

        const collection = db.get(tableName);
        const itemToGet = collection.find({ [primaryKeyFields[tableName]]: parseInt(primaryKey, 10) }).value();

        if (!itemToGet) {
            return res.status(404).json({ error: `Item not found in ${tableName}` });
        }

        // **如果請求 `/gamesData/:game_id/pricesData`，則回傳該遊戲的價格資訊**
        if (subTable === "pricesData") {
            const pricesCollection = db.get("pricesData").value();
            const filteredPrices = pricesCollection.filter(price => price.game_id === parseInt(primaryKey, 10));
            return res.json(filteredPrices);
        }

        // **正常回傳 `game_id` 的遊戲資訊**
        res.status(200).json(itemToGet);
    };
};
