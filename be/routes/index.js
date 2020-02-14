let express = require('express');
let router = express.Router();
const apiController = require('../controllers/controller');
const logController = require('../controllers/logSaver');

router.get('/', apiController.index);
router.post('/login', apiController.loginCheck);
router.get('/profile', apiController.getLogList);

router.post('/saveLog', logController.saveLog);
router.get('/viewLog', logController.viewLog);

module.exports = router;


