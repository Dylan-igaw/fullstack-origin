
function trResponse(response, msg, data) {
    console.log(msg);
    response.status(200).send({
        "rs": true,
        "msg": msg,
        "data": data,
    });
}

function faResponse(response, msg) {
    console.log(msg);
    response.status(200).send({
        "rs": false,
        "msg": msg,
    });
}

module.exports = {
    trResponse: trResponse,
    faResponse: faResponse,
};
