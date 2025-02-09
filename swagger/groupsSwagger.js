/**
 * @swagger
 * /groupsData:
 *   get:
 *     tags: ["揪團相關"]
 *     summary: 顯示全部資料
 *     description: 純資料表，會顯示全部的資料，若要查詢某筆資料請往下查看
 *     responses:
 *       200:
 *         description: 成功回傳全部揪團資料
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/groupsData"
*/

/**
 * @swagger
 * /groupsData/{group_id}:
 *   get:
 *     tags: ["揪團相關"]
 *     summary: 顯示某一筆資料
 *     description: 資料表/ID，可查到單筆資料
 *     parameters:
 *       - in: path
 *         name: group_id
 *         required: true
 *         description: 揪團本身自己的ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 成功抓到此筆資料
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/groupsData"
 *       404:
 *         description: 此ID無相關資料，請重新確認ID groupsData
 */

/**
 * @swagger
 * /groupsData:
 *   post:
 *     tags: ["揪團相關"]
 *     summary: "新增一筆揪團資料"
 *     description: "建立新的揪團遊戲資料"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: "#/components/schemas/groupsData"
 *     responses:
 *       201:
 *         description: "成功建立資料"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/groupsData"
 *       400:
 *         description: "請求格式錯誤"
 */


/**
 * @swagger
 * /groupsData/{group_id}:
 *   delete:
 *     tags: ["揪團相關"]
 *     summary: "刪除一筆揪團資料"
 *     description: "透過揪團 ID 刪除該筆資料"
 *     parameters:
 *       - in: path
 *         name: group_id
 *         required: true
 *         description: "要刪除的揪團 ID"
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
 * /groupsData/{group_id}:
 *   patch:
 *     tags: ["揪團相關"]
 *     summary: "更新揪團資料"
 *     description: "透過揪團 ID 更新部分欄位，請傳入要更改的即可"
 *     parameters:
 *       - in: path
 *         name: group_id
 *         required: true
 *         description: "要更新的揪團 ID"
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               group_active_date:
 *                 type: string
 *                 description: "遊玩日期"
 *               group_noob:
 *                 type: boolean
 *                 description: "適合新手"
 *     responses:
 *       200:
 *         description: "成功更新資料"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/groupsData"
 *       400:
 *         description: "請求格式錯誤"
 *       404:
 *         description: "找不到該筆資料"
 */
