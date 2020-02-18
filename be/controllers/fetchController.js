
function trResponse(response, msg, data) {
    response.status(200).send({
        "rs": true,
        "message": msg,
        "data": data,
    });
}

function faResponse(response, msg) {
    response.status(200).send({
        "rs": false,
        "message": msg,
    });
}

module.exports = {
    trResponse: trResponse,
    faResponse: faResponse,
};
