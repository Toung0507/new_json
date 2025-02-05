module.exports = (router, db) => {
    return (req, res) => {
        const tableName = req.params.tableName;
        const primaryKey = req.params.primaryKey;
        const updatedData = req.body;

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
        const itemToUpdate = collection.find({ [primaryKeyFields[tableName]]: parseInt(primaryKey, 10) }).value();

        if (!itemToUpdate) {
            return res.status(404).json({ error: `Item not found in ${tableName}` });
        }

        // 更新資料
        collection.find({ [primaryKeyFields[tableName]]: parseInt(primaryKey, 10) }).assign(updatedData).write();
        res.status(200).json({ message: "Record updated successfully", data: updatedData });
    };
};
