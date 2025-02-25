/**
 * @swagger
 * /difficultys_fixed_Data:
 *   get:
 *     tags: ["固定資料"]
 *     summary: 顯示全部的難度標籤資料
 *     description: 純資料表，會顯示全部的資料，若要查詢某筆資料請往下查看
 *     responses:
 *       200:
 *         description: 成功回傳全部難度標籤資料
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/difficultys_fixed_Data"
*/

/**
 * @swagger
 * /difficultys_fixed_Data/{difficulty_id}:
 *   get:
 *     tags: ["固定資料"]
 *     summary: 顯示某一筆資料
 *     description: 資料表/ID，可查到單筆資料
 *     parameters:
 *       - in: path
 *         name: difficulty_id
 *         required: true
 *         description: 難度標籤本身自己的ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 成功抓到此筆資料
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/difficultys_fixed_Data"
 *       404:
 *         description: 此ID無相關資料，請重新確認ID difficultys_fixed_Data
 */

/**
 * @swagger
 * /difficultys_fixed_Data/{difficulty_id}:
 *   patch:
 *     tags: ["固定資料"]
 *     summary: "修改一筆難度標籤是否啟用"
 *     description: "透過難度 ID 更新啟用欄位，請傳入更改即可"
 *     parameters:
 *       - in: path
 *         name: difficulty_id
 *         required: true
 *         description: "要更新的難度 ID"
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               is_use:
 *                 type: boolean
 *                 description: "是否啟用"
 *     responses:
 *       200:
 *         description: "成功更新資料"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/difficultys_fixed_Data"
 *       400:
 *         description: "請求格式錯誤"
 *       404:
 *         description: "找不到該筆資料"
 */

/**
 * @swagger
 * /propertys_fixed_Data:
 *   get:
 *     tags: ["固定資料"]
 *     summary: 顯示全部的分類標籤資料
 *     description: 純資料表，會顯示全部的資料，若要查詢某筆資料請往下查看
 *     responses:
 *       200:
 *         description: 成功回傳全部分類標籤資料
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/propertys_fixed_Data"
*/

/**
 * @swagger
 * /propertys_fixed_Data/{property_id}:
 *   get:
 *     tags: ["固定資料"]
 *     summary: 顯示某一筆資料
 *     description: 資料表/ID，可查到單筆資料
 *     parameters:
 *       - in: path
 *         name: property_id
 *         required: true
 *         description: 分類標籤本身自己的ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 成功抓到此筆資料
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/propertys_fixed_Data"
 *       404:
 *         description: 此ID無相關資料，請重新確認ID propertys_fixed_Data
 */

/**
 * @swagger
 * /propertys_fixed_Data/{property_id}:
 *   patch:
 *     tags: ["固定資料"]
 *     summary: "修改一筆分類標籤是否啟用"
 *     description: "透過店家 ID 更新啟用欄位，請傳入更改即可"
 *     parameters:
 *       - in: path
 *         name: property_id
 *         required: true
 *         description: "要更新的店家 ID"
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               is_use:
 *                 type: boolean
 *                 description: "是否啟用"
 *     responses:
 *       200:
 *         description: "成功更新資料"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/propertys_fixed_Data"
 *       400:
 *         description: "請求格式錯誤"
 *       404:
 *         description: "找不到該筆資料"
 */


/**
 * @swagger
 * /authorizedStore:
 *   get:
 *     tags: ["固定資料"]
 *     summary: 顯示全部的授權店家資料
 *     description: 純資料表，會顯示全部的資料，若要查詢某筆資料請往下查看
 *     responses:
 *       200:
 *         description: 成功回傳全部授權店家資料
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/authorizedStore"
*/
