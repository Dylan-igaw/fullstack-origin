const loginController = require('./loginController');
const DBConnect = require('../DBConnector/db');
const fetchController = require('./fetchController');

function saveLog(req, res) {
    const {adid, type, path} = req.body;
    const log = `__saveLog-${adid}-${type}-${path}`;
    const sql = "INSERT INTO LOG2020 (adid, type, path, log, date) VALUES($1, $2, $3, $4, $5) RETURNING *";
    const values = [adid, type, path, log, 'NOW()'];

    DBConnect.client.query(sql, values, (err, response) => {
        if (err) {
            console.log(err.stack)
        } else {
            fetchController.trResponse(res, "success save.");
            console.log(JSON.stringify(response.rows[0]).substring(0, 100) + "......");
        }
    });
}

function viewLog(req, res) {
    console.log("#### getProfileInfo:::: " + req);
    const key = req.cookies['authKey'];
    const result = loginController.checkLoginAuth(key);
    result.rs ? selectLog(res) : fetchController.faResponse(res, "load failed.");

}

function selectLog(res){
    const sql = "SELECT * FROM LOG2020 limit 100";
    DBConnect.client.query(sql, (err, response) => {
        if (err) {
            console.log(err.stack)
        } else {
            fetchController.trResponse(res, 'success load.', response.rows);
        }
    });
}

module.exports = {
    saveLog: saveLog,
    viewLog: viewLog,
};