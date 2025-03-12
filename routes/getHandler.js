module.exports = (router, db) => {
    return (req, res, next) => {
        const { tableName, primaryKey, subTable } = req.params;
        // console.log(`GET參數 ${tableName} ${primaryKey} ${subTable} `);

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
        // console.log("collection:", JSON.stringify(collection));
        // parseInt(primaryKey, 10) 的10 代表轉成十進制
        const itemToGet = collection.find({ [primaryKeyFields[tableName]]: parseInt(primaryKey, 10) }).value();

        // console.log("GET :" + JSON.stringify(itemToGet)); //檢查是否有抓到/id的相關資料

        // **✅ 解析 gamesData 的 game_info**
        if (tableName === "gamesData" && itemToGet.game_info) {
            itemToGet.game_info = itemToGet.game_info.replace(/\\n/g, "\n");
        }

        res.locals.filteredData = itemToGet;     //透過res.locals傳入completeTables中，讓他可以抓取id篩選過後的的資料

        if (!itemToGet) {
            return res.status(404).json({ "錯誤訊息": `此ID無相關資料，請重新確認ID ${tableName}` });
        }

        // 資料表相對應 > 關聯用
        const tableMappings = {
            "gamesData": {
                "pricesData": "game_id",
                "commentsData": "game_id",
                "groupsData": "game_id"
            },
            "usersData": {
                "storesData": "store_id",
                "groupsData": "user_id",
                "commentsData": "user_id"
            },
            "storesData": {
                "gamesData": "store_id"
            }
        };

        // **檢查是否符合條件的組合**
        if (subTable != undefined) {
            if (tableMappings[tableName] && tableMappings[tableName][subTable]) {
                const filterKey = tableMappings[tableName][subTable]; // 找到對應的 key
                const collection = db.get(subTable).value(); // 取得對應的資料表
                const filteredData = collection.filter(item => item[filterKey] === parseInt(primaryKey, 10));
                if (filteredData.length == 0) {
                    filteredData.push(`${tableName}的ID ${primaryKey} 在 ${subTable} 資料表中無相關資料`);
                }
                res.locals.filteredData = filteredData;   //透過res.locals傳入completeTables中，讓他可以抓取對應資料表跟id篩選過後的的資料，會覆蓋原本上面的資料
                // console.log(`filterKey  ${filterKey}`); //檢查有沒有取得對應的KEY
                // console.log(`collection  ${JSON.stringify(collection)}`); //檢查有沒有抓到相對應的全資料表內容
                // console.log(`filteredData  ${JSON.stringify(filteredData)}`); // 檢查是否有抓到相對應資料表並對應id的資料
            }
            else {
                // 如果對應錯誤，回傳錯誤訊息表示 mapping 有誤
                const filteredData = [];
                filteredData.push(`${tableName} 與 ${subTable} 的對應錯誤，請重新確認API文件。`);
                res.locals.filteredData = filteredData;
            }
        }

        return next();  // 繼續執行下一步
    };
};
