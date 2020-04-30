const router = require('../base');
const UploadController = require('../../controllers/upload'); //上传


// 上传
router.post('/upload/index', UploadController.index);
module.exports = router;