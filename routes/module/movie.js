const router = require('../base');
const MovieController = require('../../controllers/module/movie'); //用户
router.get('/movie/getSearch', MovieController.movieSearch);
router.get('/movie/movieDetail', MovieController.movieDetail);
module.exports = router;