/**
 * @swagger
 * tags:
 *   - name: "店家相關"
 *     description: "抓取 / 傳入 / 刪除 / 修改 店家資料"
 */

/**
 * @swagger
 * /storesData:
 *   get:
 *     tags: ["店家相關"]
 *     summary: 顯示全部資料
 *     description: 純資料表，會顯示全部的資料，若要查詢某筆資料請往下查看
 *     responses:
 *       200:
 *         description: 成功回傳全部店家資料
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/storesDataGet"
*/

/**
 * @swagger
 * /storesData/{store_id}:
 *   get:
 *     tags: ["店家相關"]
 *     summary: 顯示某一筆資料
 *     description: 資料表/ID，可查到單筆資料
 *     parameters:
 *       - in: path
 *         name: store_id
 *         required: true
 *         description: 店家本身自己的ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 成功抓到此筆資料
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/storesDataGet"
 *       404:
 *         description: 此ID無相關資料，請重新確認ID storesData
 */


/**
 * @swagger
 * /storesData/{store_id}/gamesData:
 *   get:
 *     tags: ["店家相關"]
 *     summary: 顯示某店家的相關資料表資料
 *     description: 可輸入店家自己的ID，去確認對應的遊戲
 *     parameters:
 *       - in: path
 *         name: store_id
 *         required: true
 *         description: 店家本身自己的ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 成功抓到關連資料表內容/或者是對應資料表無資料
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/gamesDataGet"
 *       404:
 *         description: 此ID無相關資料，請重新確認ID storesData
 */
