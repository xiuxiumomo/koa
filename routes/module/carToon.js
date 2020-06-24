const router = require('../base');
const CarToonController = require('../../controllers/module/carToon'); //漫画
router.get('/carToon/carToonCategory', CarToonController.carToonCategory);
router.get('/carToon/carToonSearch', CarToonController.carToonSearch);
module.exports = router;