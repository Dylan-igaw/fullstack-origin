const apiController = require('../controllers/controller');
const {Client} = require('pg');

const client = new Client({
    user: 'postgres',
    host: '192.168.0.128',
    database: 'analytics',
    password: 'dmp1',
    port: 5432,
});

client.connect();

function executeInsertQuery(sql, values) {
    client.query(sql, values,(err, response) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(JSON.stringify(response.rows[0]).substring(0, 100) + "......");
        }
    });
}

function saveLog(req, res) {
    const {adid, type, path} = req.body;
    const log = `__saveLog-${adid}-${type}-${path}`;
    const sql = "INSERT INTO LOG2020 (adid, type, path, log, date) VALUES($1, $2, $3, $4, $5) RETURNING *";
    const values = [adid, type, path, log, 'NOW()'];

    executeInsertQuery(sql, values);
    res.status(200).send();
}

function viewLog(req, res) {
    const key = req.cookies['authKey'];
    if(key === apiController.authKey) {
        const sql = "SELECT * FROM LOG2020";
        client.query(sql, (err, response) => {
            if (err) {
                console.log(err.stack)
            } else {
                console.log(JSON.stringify(response.rows[0]).substring(0, 100) + "...... [ count for " + response.rows.length + " ]");
                res.status(200).send(JSON.stringify(response.rows));
            }
        });
    }else{
        res.status(200).send(['invalid data', 'login failed.']);
    }
}

module.exports = {
    saveLog: saveLog,
    viewLog: viewLog,
};