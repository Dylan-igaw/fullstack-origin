const loginController = require('./loginController');
const fetchController = require('./fetchController');
const profile = require('../public/javascripts/profileData');

function viewProfile(req, res) {
    console.log("#### getProfileInfo:::: " + req);
    const key = req.cookies['authKey'];
    const result = loginController.checkLoginAuth(key);
    result.rs ? selectProfile(res) : fetchController.faResponse(res, "load failed.");
}

function selectProfile(res){
    return function () {
        fetchController.trResponse(res, 'success load.', profile.data);
    }();
}

module.exports = {
    viewProfile: viewProfile,
};
