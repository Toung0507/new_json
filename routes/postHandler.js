module.exports = (router, db) => {
    return (req, res) => {
        const tableName = req.params.tableName;

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
        const newItem = req.body;

        // 檢查是否有重複 ID
        const existingItem = collection.find({ [primaryKeyFields[tableName]]: newItem[primaryKeyFields[tableName]] }).value();
        if (existingItem) {
            return res.status(400).json({ error: "Duplicate ID" });
        }


        // 新增資料
        collection.push(newItem).write();
        res.status(201).json({ message: "Record added successfully", data: newItem });
    };
};
