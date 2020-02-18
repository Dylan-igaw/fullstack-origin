const loginController = require('./loginController');
const outData = require('../public/javascripts/profileData');

function getProfileInfo(req, res) {
    console.log("#### getProfileInfo:::: " + req);
    loginController.checkLoginAuth(req, res, outData.data);
}

module.exports = {
    getProfileInfo: getProfileInfo,
};