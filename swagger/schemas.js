/**
 * @swagger
 * components:
 *   schemas:
 *     gamesDataGet:
 *       type: object
 *       properties:
 *         game_id:
 *           type: integer
 *           description: "密室遊戲 ID"
 *         store_id:
 *           type: integer
 *           description: "店家 ID"
 *         game_name:
 *           type: string
 *           description: "密室名稱"
 *         game_address:
 *           type: string
 *           description: "密室地點"
 *         game_tel:
 *           type: string
 *           maxLength: 20
 *           description: "密室連絡電話"
 *         game_time:
 *           type: integer
 *           description: "解謎時間（分鐘）"
 *         game_minNum_Players:
 *           type: integer
 *           description: "遊玩最少人數"
 *         game_maxNum_Players:
 *           type: integer
 *           description: "遊玩最多人數"
 *         game_dif_tag:
 *           type: integer
 *           description: "ID-密室分類 - 難度"
 *         game_main_tag1:
 *           type: integer
 *           description: "ID-密室分類 - 性質1"
 *         game_main_tag2:
 *           type: integer
 *           description: "ID-密室分類 - 性質2"
 *         game_score:
 *           type: number
 *           description: "密室的星級評分"
 *         game_img:
 *           type: array
 *           items:
 *             type: string
 *           description: "密室主視圖 URL"
 *         game_isLimited:
 *           type: boolean
 *           description: "密室性質（是否有限制開放時間）"
 *         game_start_date:
 *           type: string
 *           description: "密室開始日期"
 *         game_end_date:
 *           type: string
 *           nullable: true
 *           description: "密室結束日期（可選）"
 *         game_info:
 *           type: string
 *           description: "主題介紹"
 *         game_remark:
 *           type: string
 *           description: "備註（可選）"
 *         game_score_num:
 *           type: integer
 *           description: "評價人數"
 *         game_isStock:
 *           type: boolean
 *           description: "是否上架"
 *         game_website:
 *           type: string
 *           description: "遊戲官網連結" 
 *         store_name:
 *           type: string
 *           description: "店家名稱（訪客可見）"
 *         store_email:
 *           type: string
 *           description: "店家信箱（訪客可見）" 
 *         game_dif_tagname:
 *           type: string
 *           description: "密室分類 - 難度"
 *         game_main_tag1name:
 *           type: string
 *           description: "密室分類 - 性質1"
 *         game_main_tag2name:
 *           type: string
 *           description: "密室分類 - 性質2"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     gamesDataPost:
 *       type: object
 *       properties:
 *         game_id:
 *           type: integer
 *           description: "密室遊戲 ID"
 *         store_id:
 *           type: integer
 *           description: "店家 ID"
 *         game_name:
 *           type: string
 *           description: "密室名稱"
 *         game_address:
 *           type: string
 *           description: "密室地點"
 *         game_tel:
 *           type: string
 *           maxLength: 20
 *           description: "密室連絡電話"
 *         game_time:
 *           type: integer
 *           description: "解謎時間（分鐘）"
 *         game_minNum_Players:
 *           type: integer
 *           description: "遊玩最少人數"
 *         game_maxNum_Players:
 *           type: integer
 *           description: "遊玩最多人數"
 *         game_dif_tag:
 *           type: integer
 *           description: "ID-密室分類 - 難度"
 *         game_main_tag1:
 *           type: integer
 *           description: "ID-密室分類 - 性質1"
 *         game_main_tag2:
 *           type: integer
 *           description: "ID-密室分類 - 性質2"
 *         game_score:
 *           type: number
 *           description: "密室的星級評分"
 *         game_img:
 *           type: array
 *           items:
 *             type: string
 *           description: "密室主視圖 URL"
 *         game_isLimited:
 *           type: boolean
 *           description: "密室性質（是否有限制開放時間）"
 *         game_start_date:
 *           type: string
 *           description: "密室開始日期"
 *         game_end_date:
 *           type: string
 *           nullable: true
 *           description: "密室結束日期（可選）"
 *         game_info:
 *           type: string
 *           description: "主題介紹"
 *         game_remark:
 *           type: string
 *           description: "備註（可選）"
 *         game_score_num:
 *           type: integer
 *           description: "評價人數"
 *         game_isStock:
 *           type: boolean
 *           description: "是否上架"
 *         game_website:
 *           type: string
 *           description: "遊戲官網連結" 
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     storesDataGet:
 *       type: object
 *       properties:
 *         store_id:
 *           type: integer
 *           description: "店家 ID"
 *         user_id:
 *           type: integer
 *           description: "會員 ID"
 *         store_contact:
 *           type: string
 *           description: "聯絡人（公司本人）"
 *         store_method:
 *           type: string
 *           description: "驗證方式"
 *         store_tax_id:
 *           type: string
 *           description: "統一編號"
 *         store_documentation:
 *           type: string
 *           description: "證明文件"
 *         store_self_tel:
 *           type: string
 *           description: "連絡電話（公司本人）"
 *         store_self_address:
 *           type: string
 *           description: "地址（公司本人）"
 *         store_website:
 *           type: string
 *           description: "官方網頁"
 *         store_name:
 *           type: string
 *           description: "店家名稱（訪客可見）"
 *         store_address:
 *           type: string
 *           description: "地址（訪客可見）"
 *         store_email:
 *           type: string
 *           description: "信箱（訪客可見）"
 *         store_tel:
 *           type: string
 *           description: "連絡電話（訪客可見）"
 *         store_open_time:
 *           type: string
 *           description: "營業時間"
 *         user_name:
 *           type: string
 *           description: "店家姓名"
 *         user_email:
 *           type: string
 *           description: "店家信箱"
 *         user_password:
 *           type: string
 *           description: "店家密碼" 
*/

/**
 * @swagger
 * components:
 *   schemas:
 *     storesDataPost:
 *       type: object
 *       properties:
 *         store_id:
 *           type: integer
 *           description: "店家 ID"
 *         user_id:
 *           type: integer
 *           description: "會員 ID"
 *         store_contact:
 *           type: string
 *           description: "聯絡人（公司本人）"
 *         store_method:
 *           type: string
 *           description: "驗證方式"
 *         store_tax_id:
 *           type: string
 *           description: "統一編號"
 *         store_documentation:
 *           type: string
 *           description: "證明文件"
 *         store_self_tel:
 *           type: string
 *           description: "連絡電話（公司本人）"
 *         store_self_address:
 *           type: string
 *           description: "地址（公司本人）"
 *         store_website:
 *           type: string
 *           description: "官方網頁"
 *         store_name:
 *           type: string
 *           description: "店家名稱（訪客可見）"
 *         store_address:
 *           type: string
 *           description: "地址（訪客可見）"
 *         store_email:
 *           type: string
 *           description: "信箱（訪客可見）"
 *         store_tel:
 *           type: string
 *           description: "連絡電話（訪客可見）"
 *         store_open_time:
 *           type: string
 *           description: "營業時間"
*/

/**
 * @swagger
 * components:
 *   schemas:
 *     usersData:
 *       type: object
 *       properties:
 *         user_id:
 *           type: integer
 *           description: "使用者 ID"
 *         user_role:
 *           type: string
 *           description: "使用者身分"
 *         user_reg_method:
 *           type: string
 *           description: "註冊方式"
 *         user_name:
 *           type: string
 *           description: "使用者姓名"
 *         user_email:
 *           type: string
 *           description: "使用者信箱"
 *         user_bhd:
 *           type: string
 *           description: "使用者生日"
 *         user_tel:
 *           type: string
 *           description: "使用者電話"
 *         user_password:
 *           type: string
 *           description: "使用者密碼"
 *         user_create_at:
 *           type: string
 *           description: "帳號建立時間"
 *         user_update_at:
 *           type: string
 *           description: "帳號更新時間"
 *         user_sex:
 *           type: string
 *           description: "使用者性別"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     pricesData:
 *       type: object
 *       properties:
 *         price_id:
 *           type: integer
 *           description: "價格 ID"
 *         game_id:
 *           type: integer
 *           description: "對應的遊戲 ID"
 *         price_is_difference:
 *           type: boolean
 *           description: "是否平假日金額不同" 
 *         price_count:
 *           type: integer
 *           description: "此遊戲的第幾個組合"
 *         price_day_type:
 *           type: string
 *           description: "此筆價格適用於平日或假日"
 *         price_mix:
 *           type: integer
 *           description: "價格金額"
 *         price_people:
 *           type: string
 *           description: "適用的人數組合"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     commentsData:
 *       type: object
 *       properties:
 *         comment_id:
 *           type: integer
 *           description: "評論 ID"
 *         user_id:
 *           type: integer
 *           description: "評論人 ID"
 *         game_id:
 *           type: integer
 *           description: "遊戲 ID"
 *         comment_isSpoilered:
 *           type: boolean
 *           description: "是否含有劇透"
 *         comment_content:
 *           type: string
 *           description: "評論內容"
 *         comment_star:
 *           type: number
 *           description: "評論星級"
 *         comment_played_time:
 *           type: string
 *           description: "遊玩日期"
 *         comment_isPass:
 *           type: boolean
 *           description: "是否通關"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     propertys_fixed_Data:
 *       type: object
 *       properties:
 *         property_id:
 *           type: integer
 *           description: "密室性質 ID"
 *         property_name:
 *           type: string
 *           description: "密室性質名稱"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     difficultys_fixed_Data:
 *       type: object
 *       properties:
 *         difficulty_id:
 *           type: integer
 *           description: "密室難度 ID"
 *         difficulty_name:
 *           type: string
 *           description: "密室難度名稱"
 */

