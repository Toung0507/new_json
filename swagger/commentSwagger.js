/**
 * @swagger
 * /commentsData:
 *   get:
 *     tags: ["評論相關"]
 *     summary: 顯示全部資料
 *     description: 純資料表，會顯示全部的資料，若要查詢某筆資料請往下查看
 *     responses:
 *       200:
 *         description: 成功回傳全部評論資料
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/commentsData"
*/

/**
 * @swagger
 * /commentsData/{comment_id}:
 *   get:
 *     tags: ["評論相關"]
 *     summary: 顯示某一筆資料
 *     description: 資料表/ID，可查到單筆資料
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         description: 評論本身自己的ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 成功抓到此筆資料
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/commentsData"
 *       404:
 *         description: 此ID無相關資料，請重新確認ID commentsData
 */

/**
 * @swagger
 * /commentsData:
 *   post:
 *     tags: ["評論相關"]
 *     summary: "新增一筆評論資料"
 *     description: "建立新的評論遊戲資料"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: "#/components/schemas/commentsData"
 *     responses:
 *       201:
 *         description: "成功建立資料"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/commentsData"
 *       400:
 *         description: "請求格式錯誤"
 */


/**
 * @swagger
 * /commentsData/{comment_id}:
 *   delete:
 *     tags: ["評論相關"]
 *     summary: "刪除一筆評論資料"
 *     description: "透過評論 ID 刪除該筆資料"
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         description: "要刪除的評論遊戲 ID"
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "成功刪除"
 *       404:
 */

/**
 * @swagger
 * /commentsData/{comment_id}:
 *   patch:
 *     tags: ["評論相關"]
 *     summary: "更新評論資料"
 *     description: "透過評論 ID 更新部分欄位，請傳入要更改的即可"
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         description: "要更新的評論遊戲 ID"
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment_content:
 *                 type: string
 *                 description: "評論內容"
 *     responses:
 *       200:
 *         description: "成功更新資料"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/commentsData"
 *       400:
 *         description: "請求格式錯誤"
 *       404:
 *         description: "找不到該筆資料"
 */

