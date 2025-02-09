/**
 * @swagger
 * /usersData:
 *   get:
 *     tags: ["會員相關"]
 *     summary: 顯示全部資料 
 *     description: 純資料表，會顯示全部的資料，若要查詢某筆資料請往下查看
 *     responses:
 *       200:
 *         description: 成功回傳全部會員資料
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/usersData"
*/

/**
 * @swagger
 * /usersData/{user_id}:
 *   get:
 *     tags: ["會員相關"]
 *     summary: 顯示某一筆資料 
 *     description: 資料表/ID，可查到單筆資料
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: 會員本身自己的ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 成功抓到此筆資料
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/usersData"
 *       404:
 *         description: 此ID無相關資料，請重新確認ID usersData
 */


/**
 * @swagger
 * /usersData/{user_id}/{tableName}:
 *   get:
 *     tags: ["會員相關"]
 *     summary: 顯示某會員的相關資料表資料 
 *     description: 可輸入會員自己的ID，去確認對應的店家/評論/揪團
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: 會員本身自己的ID
 *         schema:
 *           type: integer
 *       - in: path
 *         name: tableName
 *         required: true
 *         description: 對應的資料表：storesData、commentsData、groupsData
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 成功抓到關連資料表內容/或者是對應資料表無資料
 *         content:
 *           application/json:
 *             oneOf:
 *               - $ref: "#/components/schemas/storesDataGet"
 *               - $ref: "#/components/schemas/commentsData"
 *               - $ref: "#/components/schemas/groupsData"
 *       404:
 *         description: 此ID無相關資料，請重新確認ID usersData
 */

/**
 * @swagger
 * /usersData:
 *   post:
 *     tags: ["會員相關"]
 *     summary: 新增一筆會員資料 
 *     description: "建立新的會員資料"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: "#/components/schemas/usersData"
 *     responses:
 *       201:
 *         description: "成功建立資料"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/usersData"
 *       400:
 *         description: "請求格式錯誤"
 */

/**
 * @swagger
 * /usersData/{user_id}:
 *   delete:
 *     tags: ["會員相關"]
 *     summary: 刪除一筆會員資料 
 *     description: "透過會員 ID 刪除該筆資料"
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: "要刪除的會員 ID"
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
 * /usersData/{user_id}:
 *   patch:
 *     tags: ["會員相關"]
 *     summary: 更新會員資料 
 *     description: "透過會員 ID 更新部分欄位，請傳入要更改的即可"
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: "要更新的會員 ID"
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_active_date:
 *                 type: string
 *                 description: "遊玩日期"
 *               user_noob:
 *                 type: boolean
 *                 description: "適合新手"
 *     responses:
 *       200:
 *         description: "成功更新資料"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/usersData"
 *       400:
 *         description: "請求格式錯誤"
 *       404:
 *         description: "找不到該筆資料"
 */
