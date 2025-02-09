/**
 * @swagger
 * /gamesData:
 *   get:
 *     tags: ["密室相關"]
 *     summary: 顯示全部資料
 *     description: 純資料表，會顯示全部的資料，若要查詢某筆資料請往下查看
 *     responses:
 *       200:
 *         description: 成功回傳全部密室資料
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/gamesDataGet"
*/

/**
 * @swagger
 * /gamesData/{game_id}:
 *   get:
 *     tags: ["密室相關"]
 *     summary: 顯示某一筆資料
 *     description: 資料表/ID，可查到單筆資料
 *     parameters:
 *       - in: path
 *         name: game_id
 *         required: true
 *         description: 密室本身自己的ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 成功抓到此筆資料
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/gamesDataGet"
 *       404:
 *         description: 此ID無相關資料，請重新確認ID gamesData
 */


/**
 * @swagger
 * /gamesData/{game_id}/{tableName}:
 *   get:
 *     tags: ["密室相關"]
 *     summary: 顯示某密室的相關資料表資料
 *     description: 可輸入密室自己的ID，去確認對應的價格表/評論/揪團
 *     parameters:
 *       - in: path
 *         name: game_id
 *         required: true
 *         description: 密室本身自己的ID
 *         schema:
 *           type: integer
 *       - in: path
 *         name: tableName
 *         required: true
 *         description: 對應的資料表：pricesData、commentsData、groupsData
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 成功抓到關連資料表內容/或者是對應資料表無資料
 *         content:
 *           application/json:
 *             oneOf:
 *               - $ref: "#/components/schemas/pricesData"
 *               - $ref: "#/components/schemas/commentsData"
 *               - $ref: "#/components/schemas/groupsData"
 *       404:
 *         description: 此ID無相關資料，請重新確認ID gamesData
 */

/**
 * @swagger
 * /gamesData:
 *   post:
 *     tags: ["密室相關"]
 *     summary: "新增一筆密室資料"
 *     description: "建立新的密室遊戲資料"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/gamesDataPost"
 *     responses:
 *       201:
 *         description: "成功建立資料"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/gamesDataPost"
 *       400:
 *         description: "請求格式錯誤"
 */

/**
 * @swagger
 * /gamesData/{game_id}:
 *   delete:
 *     tags: ["密室相關"]
 *     summary: "刪除一筆密室資料"
 *     description: "透過密室 ID 刪除該筆資料"
 *     parameters:
 *       - in: path
 *         name: game_id
 *         required: true
 *         description: "要刪除的密室遊戲 ID"
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "成功刪除"
 *       404:
 *         description: "找不到該筆資料"
 */

/**
 * @swagger
 * /gamesData/{game_id}:
 *   patch:
 *     tags: ["密室相關"]
 *     summary: "更新密室資料"
 *     description: "透過密室 ID 更新部分欄位，請傳入要更改的即可"
 *     parameters:
 *       - in: path
 *         name: game_id
 *         required: true
 *         description: "要更新的密室遊戲 ID"
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               game_name:
 *                 type: string
 *                 description: "密室名稱"
 *               game_address:
 *                 type: string
 *                 description: "密室地點"
 *               game_tel:
 *                 type: string
 *                 description: "連絡電話"
 *     responses:
 *       200:
 *         description: "成功更新資料"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/gamesDataPost"
 *       400:
 *         description: "請求格式錯誤"
 *       404:
 *         description: "找不到該筆資料"
 */
