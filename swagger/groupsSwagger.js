/**
 * @swagger
 * tags:
 *   - name: "揪團相關"
 *     description: "抓取 / 傳入 / 刪除 / 修改 揪團資料"
 */

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
