const { client, pool } = require('../config/db.config')

function allPitching(request,response) {
    const season = request.body.season
    const innings = [request.body.minip]
    pool.query(`SELECT * FROM "${season}pitching" WHERE ip >= $1 ORDER BY era ASC`, innings)
    .then(res => {
        if (res.rows.length === 0 || res.rows.length === undefined) {
            return response.send({success: false, msg: "Database error: Connection interrupted or data missing."})
        }
        return response.send({success: true, msg: "", data: res.rows})
    })
    .catch(err=> {return response.send({success: false, msg: `Database Error: Code ${err.code}`})})
}

function teamPitching(request,response) {
    const season = request.body.season
    const params = [request.body.minip, request.params.id]
    pool.query(`SELECT * FROM "${season}pitching" WHERE ip >= $1 AND team_id = $2 ORDER BY era ASC`, params)
    .then(res => {
        if (res.rows.length === 0 || res.rows.length === undefined) {
            return response.send({success: false, msg: "Database error: Connection interrupted or data missing."})
        }
        return response.send({success: true, msg: "", data: res.rows})
    })
    .catch(err=> {return response.send({success: false, msg: `Database Error: Code ${err.code}`})})
}

module.exports.allPitching = allPitching
module.exports.teamPitching = teamPitching