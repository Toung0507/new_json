/**
 * @swagger
 * /pricesData:
 *   get:
 *     tags: ["價格相關"]
 *     summary: 顯示全部資料
 *     description: 純資料表，會顯示全部的資料，若要查詢某筆資料請往下查看
 *     responses:
 *       200:
 *         description: 成功回傳全部價格資料
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/pricesData"
*/

/**
 * @swagger
 * /pricesData/{price_id}:
 *   get:
 *     tags: ["價格相關"]
 *     summary: 顯示某一筆資料
 *     description: 資料表/ID，可查到單筆資料
 *     parameters:
 *       - in: path
 *         name: price_id
 *         required: true
 *         description: 價格本身自己的ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 成功抓到此筆資料
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/pricesData"
 *       404:
 *         description: 此ID無相關資料，請重新確認ID pricesData
 */

/**
 * @swagger
 * /pricesData:
 *   post:
 *     tags: ["價格相關"]
 *     summary: "新增一筆價格資料"
 *     description: "建立新的價格資料"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: "#/components/schemas/pricesData"
 *     responses:
 *       201:
 *         description: "成功建立資料"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/pricesData"
 *       400:
 *         description: "請求格式錯誤"
 */

/**
 * @swagger
 * /pricesData/{price_id}:
 *   delete:
 *     tags: ["價格相關"]
 *     summary: "刪除一筆價格資料"
 *     description: "透過價格 ID 刪除該筆資料"
 *     parameters:
 *       - in: path
 *         name: price_id
 *         required: true
 *         description: "要刪除的價格 ID"
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
 * /pricesData/{price_id}:
 *   patch:
 *     tags: ["價格相關"]
 *     summary: "更新價格資料"
 *     description: "透過價格 ID 更新部分欄位，請傳入要更改的即可"
 *     parameters:
 *       - in: path
 *         name: price_id
 *         required: true
 *         description: "要更新的價格 ID"
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price_mix:
 *                 type: integer
 *                 description: "價格金額"
 *               price_people:
 *                 type: string
 *                 description: "適用的人數組合"
 *     responses:
 *       200:
 *         description: "成功更新資料"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/pricesData"
 *       400:
 *         description: "請求格式錯誤"
 *       404:
 *         description: "找不到該筆資料"
 */
