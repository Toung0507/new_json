module.exports = (router) => {
    return (req, res, next) => {
        const { tableName, primaryKey, subTable } = req.params;
        // console.log(`補全的參數 ${tableName} ${primaryKey} ${subTable} `);
        const db = router.db;
        const filteredData = res.locals.filteredData || null;
        // console.log('有無資料傳入：', filteredData);

        let finallyData = [];

        // 補全遊戲資料表函數
        const games = () => {
            const stores = db.get("storesData").value();
            const games = db.get("gamesData").value();
            const difficultys_fixed_Data = db.get("difficultys_fixed_Data").value();
            const propertys_fixed_Data = db.get("propertys_fixed_Data").value();
            console.log('gamexu3ua042k7', filteredData);

            if ((Array.isArray(filteredData) && filteredData.some(item => typeof item === "string" && (item.includes("無相關資料") || item.includes("重新確認API文件")))) ||
                //(typeof filteredData === "string" && filteredData.includes("無相關資料")) || > 不應該是字串，因此不需判斷 typeof filteredData === "string"
                (typeof filteredData === "object" && filteredData !== null && (JSON.stringify(filteredData).includes("無相關資料") || JSON.stringify(filteredData).includes("重新確認API文件")))) {
                // 檢查是否ID是否錯誤，若錯誤回傳原本的錯誤訊息
                console.log('hiu/ e9 ao6y uxl4');

                return filteredData;
            }
            else if (filteredData) {
                if (Array.isArray(filteredData)) {
                    // console.log('進此是陣列 > 篩選過後的資料');
                    const gamesAllData = filteredData.map((game) => {
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
                    return gamesAllData;
                }
                else {
                    let gamesAllData = filteredData;
                    // console.log('進此是物件 > 單一筆資料時');
                    games.forEach((game) => {
                        const store_info = stores.find((e) => e.user_id === game.store_id);
                        const difficulty_tag = difficultys_fixed_Data.find((e) => e.difficulty_id === game.game_dif_tag);
                        const propertys_tag1 = propertys_fixed_Data.find((e) => e.property_id === game.game_main_tag1);
                        const propertys_tag2 = propertys_fixed_Data.find((e) => e.property_id === game.game_main_tag2);
                        // 更新 game 物件，並新增屬性
                        gamesAllData = {
                            ...filteredData,
                            store_name: store_info ? store_info.store_name : "密室店家名稱缺少",
                            store_email: store_info ? store_info.store_email : "密室店家聯絡信箱缺少",
                            game_dif_tagname: difficulty_tag ? difficulty_tag.difficulty_name : "未選擇主題難度",
                            game_main_tag1name: propertys_tag1 ? propertys_tag1.property_name : "未選擇主題標籤1",
                            game_main_tag2name: propertys_tag2 ? propertys_tag2.property_name : "未選擇主題標籤2"
                        };
                    });
                    return gamesAllData;
                }
            }
            else {
                // console.log('進此是陣列 > 全資料');
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
                return gamesAllData;
            }
        };

        // 補全店家資料表函數
        const stores = () => {
            const db = router.db;
            const users = db.get("usersData").value();
            const stores = db.get("storesData").value();
            // console.log(Array.isArray(filteredData)); // 應該要輸出 true
            // console.log(filteredData); // 檢查陣列內容

            if ((Array.isArray(filteredData) && filteredData.some(item => typeof item === "string" && (item.includes("無相關資料") || item.includes("重新確認API文件")))) ||
                //(typeof filteredData === "string" && filteredData.includes("無相關資料")) || > 不應該是字串，因此不需判斷 typeof filteredData === "string"
                (typeof filteredData === "object" && filteredData !== null && (JSON.stringify(filteredData).includes("無相關資料") || JSON.stringify(filteredData).includes("重新確認API文件")))) {
                // 檢查是否ID是否錯誤，若錯誤回傳原本的錯誤訊息
                return filteredData;
            }
            else if (filteredData) {
                if (Array.isArray(filteredData)) {
                    // console.log('進此是陣列 > 篩選過後的資料');
                    const storesAllData = filteredData.map((store) => {
                        const user_info = users.find((e) => e.user_id === store.user_id);
                        return {
                            ...store,
                            user_name: user_info ? user_info.user_name : "無此店家名稱",
                            user_email: user_info ? user_info.user_email : "無此店家信箱",
                            user_password: user_info ? user_info.user_password : "無此店家密碼",
                        };
                    });
                    return storesAllData;
                }
                else {
                    // console.log('進此是物件 > 單一筆資料時');
                    let storesAllData = filteredData;
                    console.log('開頭', storesAllData);
                    // console.log('物件', filteredData);
                    stores.forEach((store) => {
                        const user_info = users.find((e) => e.user_id === store.user_id);

                        // 更新 store 物件，並新增必要的屬性
                        storesAllData = {
                            ...filteredData,
                            user_name: user_info ? user_info.user_name : "無此店家名稱",
                            user_email: user_info ? user_info.user_email : "無此店家信箱",
                            user_password: user_info ? user_info.user_password : "無此店家密碼",
                        };
                    });
                    console.log('結束', storesAllData);
                    return storesAllData;
                }
            }
            else {
                // console.log('進此是陣列 > 全資料');
                const storesAllData = stores.map((store) => {
                    const user_info = users.find((e) => e.user_id === store.user_id);
                    return {
                        ...store,
                        user_name: user_info ? user_info.user_name : "無此店家名稱",
                        user_email: user_info ? user_info.user_email : "無此店家信箱",
                        user_password: user_info ? user_info.user_password : "無此店家密碼",
                    };
                });
                return storesAllData;
            }
        };


        // 若是首頁，就直接往下顯示
        if (tableName === 'db' || tableName === '__rules') {
            // 若請求的資料表為 'db' 或 '__rules'，代表這是 json-server 內建的系統表，
            // 不需要進行補全，直接讓請求繼續往下，由 json-server 內部處理。
            return next();
        }
        // 若三個參數都有值得話進入這邊 ， 主要顯示的會是子查詢的資料表
        if (tableName && primaryKey && subTable) {
            if (subTable === "gamesData") {
                finallyData = games();
            }
            else if (subTable === "storesData") {
                finallyData = stores();
            }
            else {
                if (filteredData) {
                    // 若不是那兩個資料表的話，且有篩選出資料的話，就直接等於，回傳到res上
                    finallyData = filteredData;
                }
                else {
                    // 若是空值，代表是純資料表的全資料，也不需要補全，就直接next，讓json server原生router處理
                    // 若 filteredData 為空，代表當前請求應該由 json-server 原生的 router 處理，
                    // 這樣可以直接返回完整的資料表內容，無需額外補全資料，直接交給下一個處理函數
                    return next();

                }
            }
        }
        else {
            if (tableName === "gamesData") {


                finallyData = games();
            }
            else if (tableName === "storesData") {
                finallyData = stores();
            }
            else {
                if (filteredData) {
                    finallyData = filteredData;
                }
                else {
                    return next();
                }
            }
        }

        // 多一步確認是否有已有回傳到畫面上
        if (!res.headersSent) {
            return res.status(200).json(finallyData);
        }

    };
};
