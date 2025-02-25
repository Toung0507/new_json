module.exports = (router, db) => {
    return (req, res) => {
        const { tableName, primaryKey } = req.params;

        // 設定自定義主鍵
        const primaryKeyFields = {
            difficultys_fixed_Data: "difficulty_id",
            propertys_fixed_Data: "property_id",
            usersData: "user_id",
            storesData: "store_id",
            gamesData: "game_id",
            pricesData: "price_id",
            commentsData: "comment_id",
            groupsData: "group_id",
            authorizedStore: "austore_id"
        };

        const collection = db.get(tableName);
        const itemToDelete = collection.find({ [primaryKeyFields[tableName]]: parseInt(primaryKey, 10) }).value();

        if (!itemToDelete) {
            return res.status(404).json({ "錯誤訊息": `此ID無資料，無法做刪除動作，請重新確認ID ${tableName}` });
        }

        // 刪除資料 .write() 代表會寫回去封裝狀態，若沒寫就不會被更動，只會刪除再當下
        collection.remove({ [primaryKeyFields[tableName]]: parseInt(primaryKey, 10) }).write();
        res.status(200).json({ message: "此筆資料刪除成功" });
    };
};
