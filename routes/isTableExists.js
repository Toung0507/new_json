module.exports = (router) => {
    return (req, res, next) => {
        const { tableName, subTable } = req.params;
        const db = router.db;
        // console.log('----------開頭開頭----------');
        console.log(`檢查table是否存在的參數 ${tableName} ${subTable} `);

        let errors = [];

        if (tableName === 'db' || tableName === '__rules') {
            return next(); // 直接跳過檢查，讓 / 或 /db 不會被攔截
        }

        if (tableName && !db.has(tableName).value()) {
            errors.push(`找不到主資料表: ${tableName}`);
        }

        if (subTable && !db.has(subTable).value()) {
            errors.push(`找不到子資料表: ${subTable}`);
        }

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        return next(); // 繼續執行下一步
    };
};
