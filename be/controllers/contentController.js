const loginController = require('./loginController');
const fetchController = require('./fetchController');
const profile = require('../public/javascripts/profileData');

function viewProfile(req, res) {
    console.log("#### getProfileInfo:::: " + req);
    const key = req.cookies[loginController.AUTH_KEY_NAME];
    const result = loginController.checkLoginAuth(key);
    result.rs ? fetchController.trueResponse(res, 'success load.', profile.data)
        : fetchController.falseResponse(res, "load failed.");
}

module.exports = {
    viewProfile,
};
