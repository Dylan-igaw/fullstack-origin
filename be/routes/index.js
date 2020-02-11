var express = require('express');
var router = express.Router();
const apiController = require('../controllers/controller');

/* GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

router.get('/', apiController.index);
router.get('/error-test', apiController.errorPage_test);
router.post('/post-list', apiController.postList);

module.exports = router;