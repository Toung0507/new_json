module.exports = (router, db) => {
    return (req, res) => {
        const tableName = req.params.tableName;
        const primaryKey = req.params.primaryKey;

        const primaryKeyFields = {
            difficultys_fixed_Data: "difficulty_id",
            propertys_fixed_Data: "property_id",
            usersData: "user_id",
            storesData: "store_id",
            gamesData: "game_id",
        };

        if (!primaryKeyFields[tableName]) {
            return res.status(400).json({ error: `Invalid table name: ${tableName}` });
        }

        const collection = db.get(tableName);
        const itemToGet = collection.find({ [primaryKeyFields[tableName]]: parseInt(primaryKey, 10) }).value();

        if (!itemToGet) {
            return res.status(404).json({ error: `Item not found in ${tableName}` });
        }

        res.status(201).json({ data: itemToGet });

    };
};
