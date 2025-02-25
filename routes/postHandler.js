module.exports = (router, db) => {
    return (req, res) => {
        const tableName = req.params.tableName;
        const isEmptyObject = (obj) => {
            return typeof obj === 'object' && obj !== null && Object.keys(obj).length === 0;
        };

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
        const newItem = req.body;

        // **1. 檢查是否為物件**
        if (typeof newItem !== "object" || newItem === null || Array.isArray(newItem) || isEmptyObject(newItem)) {
            return res.status(400).json({ error: "傳入的資料格式錯誤，應該是一個物件，且物件內需有資料。" });
        }
        else {
            // **2. 檢查必要欄位是否存在**
            // const requiredFields = ["game_id", "name", "price"]; > 這個部分交由前端判斷，後端先不卡
            // const missingFields = requiredFields.filter(field => !(field in newItem));
            const missingFields = [];
            if (missingFields.length > 0) {
                return res.status(400).json({ error: `缺少必要欄位: ${missingFields.join(", ")}` });
            }
            else {
                const pkField = primaryKeyFields[tableName];

                // 如果沒有提供主鍵，則自動生成一個新 ID（最大值 + 1）
                if (!newItem[pkField]) {
                    // collection 會是一個封裝的結果 Lodash 封裝的物件
                    const items = collection.value(); //轉成實際的物件或陣列

                    // 找出最大 ID，確保陣列不為空再進行計算
                    let maxId = items.length > 0 ? Math.max(...items.map(item => item[pkField] || 0)) : 0;
                    newItem[pkField] = maxId + 1;
                }

                // 檢查是否有重複 ID
                const existingItem = collection.find({ [primaryKeyFields[tableName]]: newItem[primaryKeyFields[tableName]] }).value();
                if (existingItem) {
                    return res.status(400).json({ error: "已有重複ID，請重新確認" });
                }

                // 新增資料
                collection.push(newItem).write();
                res.status(201).json({ message: "資料新增成功", data: newItem });
            }
        }
    };
};
