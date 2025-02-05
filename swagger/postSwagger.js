// routes/postSwagger.js

/**
 * @swagger
 * tags:
 *   - name: "傳入"
 *     description: "Operations related to 傳入"
 */

/**
 * @swagger
 * /gamesData:
 *   post:
 *     tags: ["傳入"]
 *     summary: Add a new game
 *     description: Create a new game with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               game_id:
 *                 type: integer
 *                 description: Unique identifier for the game
 *               store_id:
 *                 type: integer
 *                 description: Store where the game is offered
 *               game_name:
 *                 type: string
 *                 description: Name of the game
 *               game_address:
 *                 type: string
 *                 description: Game location address
 *               game_tel:
 *                 type: string
 *                 description: Contact phone number for the game
 *               game_time:
 *                 type: integer
 *                 description: Time duration in minutes
 *               game_minNum_Players:
 *                 type: integer
 *                 description: Minimum number of players
 *               game_maxNum_Players:
 *                 type: integer
 *                 description: Maximum number of players
 *               game_dif_tag:
 *                 type: integer
 *                 description: Difficulty level of the game
 *               game_main_tag1:
 *                 type: integer
 *                 description: Main tag for the game
 *               game_main_tag2:
 *                 type: integer
 *                 description: Secondary tag for the game
 *               game_score:
 *                 type: number
 *                 format: float
 *                 description: Rating of the game
 *               game_img:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Image URLs for the game
 *               game_isLimited:
 *                 type: integer
 *                 description: Whether the game is limited (1) or not (0)
 *               game_start_date:
 *                 type: string
 *                 format: date
 *                 description: Start date of the game
 *               game_end_date:
 *                 type: string
 *                 format: date
 *                 description: End date of the game (optional)
 *               game_info:
 *                 type: string
 *                 description: Detailed description of the game
 *               game_remark:
 *                 type: string
 *                 description: Additional remarks about the game
 *               game_score_num:
 *                 type: integer
 *                 description: Number of times the game has been rated
 *               game_isStock:
 *                 type: integer
 *                 description: Whether the game is in stock (1) or not (0)
 *               game_website:
 *                 type: string
 *                 description: The website link for the game
 *     responses:
 *       201:
 *         description: Game has been successfully created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
