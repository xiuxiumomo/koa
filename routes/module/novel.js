const router = require('../base');
const novelController = require('../../controllers/module/novel'); //用户
router.get('/novel/novelSearch', novelController.novelSearch);
router.get('/novel/novelDetail', novelController.novelDetail);
router.get('/novel/novelChapterDetail', novelController.novelChapterDetail);
module.exports = router;