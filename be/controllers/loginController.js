const DBConnect = require('../DBConnector/db');
const fetchController = require('./fetchController');
const crypto = require('crypto');
let users = [];

function login(req, res) {
    const insertId = req.body.id;
    const insertPw = crypto.createHash('sha512').update(req.body.password).digest("base64");
    const sql = `SELECT ID, PASSWORD FROM USERS WHERE ID='${insertId}' AND PASSWORD='${insertPw}'`;
    console.log("#### login:::: ");
    DBConnect.client.query(sql, (err, response) => {
        if (err) {
            fetchController.faResponse(res, "아이디 또는 패스워드를 다시 확인 해주세요.");
        } else {
            console.log(response.rows[0]);
            const authKey = crypto.createHash('sha512')
                .update(response.rows[0].id + response.rows[0].password)
                .digest("base64");
            users.push(authKey);
            res.status(200).cookie('authKey', authKey, {
                expires: new Date(Date.now() + 900000),
            }).send({rs: true, msg: '로그인 성공'});
        }
    });
}

function logout(req, res){
    const key = req.cookies['authKey'];
    const result = checkLoginAuth(key);
    console.log("#### logout:::: ");
    if(result.rs){
        users.splice(result.index, 1);
        fetchController.trResponse(res, "logout.", "");
    } else {
        fetchController.faResponse(res, "already logout.");
    }
}

function checkLoginAuth(key){
    let cursor = {
        "rs" : false,
        "index" : 0,
    };
    users.length>0 && users.map((v, i) => {
        if(users[i] === key) cursor={
            "rs" : true,
            "index" : i,
        };
    });
    return cursor;
}

module.exports = {
    login: login,
    logout: logout,
    checkLoginAuth: checkLoginAuth,
};
