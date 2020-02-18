let express = require('express');
let router = express.Router();
const contentController = require('../controllers/contentController');
const reportController = require('../controllers/reportController');
const loginController = require('../controllers/loginController');

//login
router.post('/login', loginController.login);
router.post('/logout', loginController.logout);

//content
router.post('/profile', contentController.viewProfile);

//report
router.post('/saveLog', reportController.saveLog);
router.post('/viewLog', reportController.viewLog);

module.exports = router;


