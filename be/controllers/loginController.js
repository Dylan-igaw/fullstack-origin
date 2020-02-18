const DBConnect = require('../DBConnector/db');
const fetchController = require('./fetchController');
const crypto = require('crypto');
const AUTH_KEY_NAME = 'authKey';
const users = [];

function login(req, res) {
    const insertId = req.body.id;
    const insertPw = crypto.createHash('sha512').update(req.body.password).digest("base64");
    const sql = `SELECT ID, PASSWORD FROM USERS WHERE ID='${insertId}' AND PASSWORD='${insertPw}'`;
    console.log("#### login:::: ");
    DBConnect.client.query(sql, (err, response) => {
        if (err) {
            console.log(err.stack);
            fetchController.falseResponse(res, "아이디 또는 패스워드를 다시 확인 해주세요.");
        } else if(response.rows.length > 0){
            console.log(response.rows[0]);
            const authKey = crypto.createHash('sha512')
                .update(response.rows[0].id + response.rows[0].password)
                .digest("base64");
            users.push(authKey);
            res.status(200).cookie(AUTH_KEY_NAME, authKey, {
                expires: new Date(Date.now() + 900000),
            }).send({rs: true, msg: '로그인 성공'});
        }else{
            fetchController.falseResponse(res, "아이디 또는 패스워드를 다시 확인 해주세요.");
        }
    });
}

function logout(req, res){
    const key = req.cookies['authKey'];
    const result = checkLoginAuth(key);
    console.log("#### logout:::: ");
    if(result.rs){
        users.splice(result.index, 1);
        fetchController.trueResponse(res, "logout.", "");
    } else {
        fetchController.falseResponse(res, "already logout.");
    }
}

function checkLoginAuth(key){
    let cursor = users.indexOf(key);
    if(cursor === -1){
        return {"rs" : false, "index" : 0,};
    }else {
        return {"rs" : true, "index" : cursor,};
    }
}

module.exports = {
    login,
    logout,
    checkLoginAuth,
    AUTH_KEY_NAME,
};
