const router = require('../base');
const CarToonController = require('../../controllers/module/carToon'); //漫画
router.get('/carToon/carToonCategory', CarToonController.carToonCategory);//分类
router.get('/carToon/carToonSearch', CarToonController.carToonSearch);//搜索
router.get('/carToon/carToonDetail',CarToonController.carToonDetail); //详情
router.get('/carToon/carToonChapterDetail',CarToonController.carToonChapterDetail); //章节详情
module.exports = router;