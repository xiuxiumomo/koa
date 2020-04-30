const router = require('../base');
const ArticleController = require('../../controllers/article'); //用户

/**
 * 文章接口
 */


// 创建文章接口（路由）
router.post('/article', ArticleController.create);
// 获取文章详情接口（路由）
router.get('/article/:id', ArticleController.detail);
// 获取所有文章
router.post('/article/getList', ArticleController.getList);
//更新文章
router.post('/article/update',ArticleController.updateArticle);
//删除文章
router.post('/article/delete',ArticleController.deleteArticle);

module.exports = router;