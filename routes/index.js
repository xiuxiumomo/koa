const router = require('koa-router')();
const UserController = require('../controllers/user'); //用户
const ArticleController = require('../controllers/article'); //文章
router.prefix('/api/v1');

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

/**
 * 用户
 * */
//注册
router.post('/user/register',UserController.create);
//登录
router.post('/user/login',UserController.login);
//获取用户详情
router.get('/user/:id',UserController.detail);
//获取用户列表
router.post('/user/getList', UserController.getList);
//修改用户
router.post('/user/update', UserController.updateData);
//删除用户
router.post('/user/delete',ArticleController.deleteArticle);
module.exports = router;
