/**
 * @swagger
 * tags:
 *   - name: "評論相關"
 *     description: "抓取 / 傳入 / 刪除 / 修改 評論資料"
 */

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
