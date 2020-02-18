const DBConnect = require('../DBConnector/db');
const fetchController = require('./fetchController');
const crypto = require('crypto');

function login(req, res) {
    const insertId = req.body.id;
    const insertPw = crypto.createHash('sha512').update(req.body.password).digest("base64");
    const sql = `SELECT ID, PASSWORD FROM USERS WHERE ID='${insertId}' AND PASSWORD='${insertPw}'`;

    DBConnect.client.query(sql, (err, response) => {
        if (err) {
            fetchController.faResponse(res, "아이디 또는 패스워드를 다시 확인 해주세요.");
        } else {
            console.log(response.rows[0]);
            const authKey = crypto.createHash('sha512')
                .update(response.rows[0].id + response.rows[0].password)
                .digest("base64");
            res.status(200).cookie('authKey', authKey, {
                expires: new Date(Date.now() + 900000),
            }).send({rs: true, msg: '로그인 성공'});
        }
    });
}

function checkLoginAuth(req, res, data) {
    const key = req.cookies['authKey'];
    const id = req.body.id;
    const sql = `SELECT ID FROM USERS WHERE KEY='${key}'`;
    console.log('______check cookie authKey ..... >>>> ');
    DBConnect.client.query(sql, (err, response) => {
        if (err) {
            console.log('>>>>>>>> failed check key,,,,,  ');
            fetchController.faResponse(res, "load failed.");
        } else if (response.rows.length > 0 && response.rows[0].id === id) {
            console.log('>>>>>>>> SUCCESS!!! check key,,,,,  ');
            fetchController.trResponse(res, "load success.", data);
        }else {
            console.log('>>>>>>>> failed check key &&&&& ID,,,,,  ');
            fetchController.faResponse(res, "load failed.");
        }
    });
}

module.exports = {
    login: login,
    checkLoginAuth: checkLoginAuth,
};
