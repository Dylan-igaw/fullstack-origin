/**
 * index
 * @param req
 * @param res
 */
function index(req, res) {
    res.status(200).render(
        'index',
        {
            title: 'Express'
        }
    );
}

/**
 * @@error jade test
 * @param req
 * @param res
 */
function errorPage_test(req, res) {
    res.status(200).render(
        'error',
        {
            message: 'error test',
            error: {
                status: 404,
                error: 'test',
            }
        }
    );
}

/**
 * @@test
 * request - json
 * {
 *     "message" : {string}
 * }
 * @param req
 * response - json
 * {
 *     "receive_message" : {string}
 * }
 * @param res
 */
function postList(req, res) {
    const user_message = req.body.message;
    res.status(200).json(
        {
            "receive_message": user_message
        }
    );
}

/**
 * react-app login api
 * request
 * {
 *     "insertId" : {string},
 *     "insertPw" : {string}
 * }
 * @param req
 * response
 * {
 *     "checked" : {boolean}
 * }
 * @param res
 */
function loginCheck(req, res) {
    const id = 'test';
    const pw = '123';
    const insertId = req.body.insertId;
    const insertPw = req.body.insertPw;

    if (id === insertId && pw === insertPw) {
        res.status(200).cookie('checked', 'true', {
            expires: new Date(Date.now() + 900000),
        }).send();
    }else{
        res.status(200).send();
    }
}

module.exports = {
    //basicAPI: basicAPI,
    //testAPI: testAPI,
    index: index,
    errorPage_test: errorPage_test,
    postList: postList,
    loginCheck: loginCheck,
}
