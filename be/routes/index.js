var express = require('express');
var router = express.Router();
const apiController = require('../controllers/controller');

/* GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

router.get('/', apiController.index);
router.post('/post-list', apiController.postList);

module.exports = router;
