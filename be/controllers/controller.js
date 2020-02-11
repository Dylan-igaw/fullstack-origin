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

module.exports = {
    //basicAPI: basicAPI,
    //testAPI: testAPI,
    index: index,
    postList: postList,
}