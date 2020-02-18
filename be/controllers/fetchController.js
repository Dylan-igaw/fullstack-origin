
function trResponse(response, msg, data) {
    response.status(200).send({
        "rs": true,
        "message": msg,
        "data": data,
    });
}

function faResponse(response, log) {
    response.status(200).send({
        "rs": false,
        "message": log,
    });
}

module.exports = {
    trResponse: trResponse,
    faResponse: faResponse,
};
