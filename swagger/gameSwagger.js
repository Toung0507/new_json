/**
 * @swagger
 * tags:
 *   - name: "密室相關"
 *     description: "抓取 / 傳入 / 刪除 / 修改 密室資料"
 */

/**
 * @swagger
 * /gamesData:
 *   get:
 *     tags: ["密室相關"]
 *     summary: 大標解釋
 *     description: 小標詳細解釋
 *     responses:
 *       200:
 *         description: 成功回傳全部資料
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   game_id:
 *                     type: integer
 *                     description: Unique identifier for the game
 *                   game_name:
 *                     type: string
 *                     description: Name of the game
 *                   store_id:
 *                     type: integer
 *                     description: The ID of the store offering the game
 *                   game_address:
 *                     type: string
 *                     description: The address of the game location
 *                   game_tel:
 *                     type: string
 *                     description: Contact phone number for the game
 *                   game_time:
 *                     type: integer
 *                     description: Duration of the game in minutes
 *                   game_minNum_Players:
 *                     type: integer
 *                     description: Minimum number of players for the game
 *                   game_maxNum_Players:
 *                     type: integer
 *                     description: Maximum number of players for the game
 *                   game_dif_tag:
 *                     type: integer
 *                     description: Difficulty level tag for the game
 *                   game_main_tag1:
 *                     type: integer
 *                     description: Main category tag for the game
 *                   game_main_tag2:
 *                     type: integer
 *                     description: Secondary category tag for the game
 *                   game_score:
 *                     type: number
 *                     format: float
 *                     description: Rating of the game
 *                   game_img:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: List of image URLs for the game
 *                   game_isLimited:
 *                     type: integer
 *                     description: Whether the game is limited (1) or not (0)
 *                   game_start_date:
 *                     type: string
 *                     format: date
 *                     description: Start date of the game
 *                   game_end_date:
 *                     type: string
 *                     format: date
 *                     description: End date of the game (if applicable)
 *                   game_info:
 *                     type: string
 *                     description: Description or storyline for the game
 *                   game_remark:
 *                     type: string
 *                     description: Any additional remarks for the game
 *                   game_score_num:
 *                     type: integer
 *                     description: The total number of ratings for the game
 *                   game_isStock:
 *                     type: integer
 *                     description: Whether the game is in stock (1) or not (0)
 *                   game_website:
 *                     type: string
 *                     description: Website URL for the game
 *       404:
 *         description: No games found
 */


/**
 * @swagger
 * /gamesData/{id}:
 *   get:
 *     tags: ["密室相關"]
 *     summary: Get price data for a specific game
 *     description: Fetch price-related data for a game using its ID and a specific table name.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the game
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved price data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 price_id:
 *                   type: integer
 *                   description: Unique identifier for the price entry
 *                 game_id:
 *                   type: integer
 *                   description: The ID of the associated game
 *                 price:
 *                   type: number
 *                   format: float
 *                   description: Price of the game
 *                 currency:
 *                   type: string
 *                   description: Currency of the price
 *                 last_updated:
 *                   type: string
 *                   format: date-time
 *                   description: Timestamp of the last update
 *       400:
 *         description: Invalid input parameters
 *       404:
 *         description: No price data found for the given game ID and table name
 */


/**
 * @swagger
 * /gamesData/{id}/{tableName}:
 *   get:
 *     tags: ["密室相關"]
 *     summary: Get price data for a specific game
 *     description: Fetch price-related data for a game using its ID and a specific table name.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the game
 *         schema:
 *           type: integer
 *       - in: path
 *         name: tableName
 *         required: true
 *         description: The name of the table to fetch price data from
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved price data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 price_id:
 *                   type: integer
 *                   description: Unique identifier for the price entry
 *                 game_id:
 *                   type: integer
 *                   description: The ID of the associated game
 *                 price:
 *                   type: number
 *                   format: float
 *                   description: Price of the game
 *                 currency:
 *                   type: string
 *                   description: Currency of the price
 *                 last_updated:
 *                   type: string
 *                   format: date-time
 *                   description: Timestamp of the last update
 *       400:
 *         description: Invalid input parameters
 *       404:
 *         description: No price data found for the given game ID and table name
 */
