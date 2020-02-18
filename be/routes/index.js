let express = require('express');
let router = express.Router();
const contentController = require('../controllers/contentController');
const reportController = require('../controllers/reportController');
const loginController = require('../controllers/loginController');

//login
router.post('/login', loginController.login);

//content
router.post('/profile', contentController.getProfileInfo);

//report
router.post('/saveLog', reportController.saveLog);
router.post('/viewLog', reportController.viewLog);

module.exports = router;


