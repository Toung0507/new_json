/**
 * @swagger
 * tags:
 *   - name: "價格相關"
 *     description: "抓取 / 傳入 / 刪除 / 修改 價格資料"
 */

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
