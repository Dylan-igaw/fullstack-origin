let express = require('express');
let router = express.Router();
const apiController = require('../controllers/controller');

router.get('/', apiController.index);
router.post('/login', apiController.loginCheck);
router.get('/profile', apiController.getLogList);

module.exports = router;


