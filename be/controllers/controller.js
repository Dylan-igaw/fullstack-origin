const crypto = require('crypto');
const authKey = crypto.createHash('sha512').update('test123').digest("base64");

function index(req, res) {
    res.status(200).render(
        'index',
        {
            title: 'Express'
        }
    );
}

function loginCheck(req, res) {
    const receivedId = req.body.id;
    const receivedPw = req.body.password;
    if (checkLoginAuth(receivedId+receivedPw)) {
        res.status(200).cookie('authKey', authKey, {
            expires: new Date(Date.now() + 900000),
        }).send({rs:true, msg:'로그인 성공'});
    }else{
        res.status(200).send({rs:false, msg:'아이디 또는 패스워드를 다시 확인 해주세요.'});
    }
    console.log("#### ____login:::: " + checkLoginAuth(receivedId+receivedPw));
}

function getLogList(req, res){
    console.log("#### ____getLogList:::: ");
    const key = req.cookies['authKey'];
    if(key === authKey){
        res.status(200).send(
            {
                "rs" : true,
                "message" : "load success.",
                "data": {
                    "name": "John",
                    "age": 30,
                    "cars": [
                        {"name": "Ford", "models": ["Fiesta", "Focus", "Mustang"]},
                        {"name": "BMW", "models": ["320", "X3", "X5"]},
                        {"name": "Fiat", "models": ["500", "Panda"]}
                    ]
                },
            }
        );
    }else{
        res.status(200).send(
            {
                "rs": false,
                "message": "load failed.",
            }
        )
    }
}

function checkLoginAuth (key) {
    key = crypto.createHash('sha512').update(key).digest("base64");
    return key === authKey;
}

module.exports = {
    index: index,
    loginCheck: loginCheck,
    getLogList: getLogList,
    authKey: authKey,
};
