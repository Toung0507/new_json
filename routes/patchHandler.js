module.exports = (router, db) => {
    return (req, res) => {
        const { tableName, primaryKey } = req.params;
        const updatedData = req.body;

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
            authorizedStore: "austore_id",
            cities: "city_id"
        };

        const collection = db.get(tableName);
        const itemToUpdate = collection.find({ [primaryKeyFields[tableName]]: parseInt(primaryKey, 10) }).value();

        if (!itemToUpdate) {
            return res.status(404).json({ "錯誤訊息": `此ID無資料，無法做修改動作，請重新確認ID ${tableName}` });
        }

        // 更新資料 assign 更新傳入的欄位，不更動其他欄位
        collection.find({ [primaryKeyFields[tableName]]: parseInt(primaryKey, 10) }).assign(updatedData).write();
        res.status(200).json({ message: "資料修改成功，傳入的修改資料：", data: updatedData });
    };
};
