const loginController = require('./loginController');
const DBConnect = require('../DBConnector/db');

function saveLog(req) {
    const {adid, type, path} = req.body;
    const log = `__saveLog-${adid}-${type}-${path}`;
    const sql = "INSERT INTO LOG2020 (adid, type, path, log, date) VALUES($1, $2, $3, $4, $5) RETURNING *";
    const values = [adid, type, path, log, 'NOW()'];

    DBConnect.client.query(sql, values, (err, response) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(JSON.stringify(response.rows[0]).substring(0, 100) + "......");
        }
    });
}

function viewLog(req, res) {
    const sql = "SELECT * FROM LOG2020 limit 100";
    DBConnect.client.query(sql, (err, response) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(JSON.stringify(response.rows[0]).substring(0, 100) + "......");
            loginController.checkLoginAuth(req, res, response.rows);
        }
    });
}

module.exports = {
    saveLog: saveLog,
    viewLog: viewLog,
};