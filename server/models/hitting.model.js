const { client, pool } = require('../config/db.config')

function allHitting(request, response) {
    if (request.body.posfilter === "all") {
        const season = request.body.season
        const search = [request.body.minpa]
        pool.query(`SELECT * FROM "${season}hitting" WHERE tpa >= $1 ORDER BY obp DESC`, search)
            .then(res => {
                if (res.rows.length === 0 || res.rows.length === undefined) {
                    return response.send({ success: false, msg: "Database error: Connection interrupted or data missing." })
                }
                return response.send({ success: true, msg: "", data: res.rows })
            })
            .catch(err => { return response.send({ success: false, msg: `Database Error: Code ${err.code}` }) })
    }
    else if (request.body.posfilter === "OF") {
        const season = request.body.season
        const search = [request.body.minpa]
        pool.query(`SELECT * FROM "${season}hitting" WHERE tpa >= $1 AND primary_position LIKE '_F' ORDER BY obp DESC`, search)
            .then(res => {
                if (res.rows.length === 0 || res.rows.length === undefined) {
                    return response.send({ success: false, msg: "Database error: Connection interrupted or data missing." })
                }
                return response.send({ success: true, msg: "", data: res.rows })
            })
            .catch(err => { return response.send({ success: false, msg: `Database Error: Code ${err.code}` }) })
    }
    else {
        const season = request.body.season
        const search = [request.body.minpa, request.body.posfilter]
        pool.query(`SELECT * FROM "${season}hitting" WHERE tpa >= $1 AND primary_position = $2 ORDER BY obp DESC`, search)
            .then(res => {
                if (res.rows.length === 0 || res.rows.length === undefined) {
                    return response.send({ success: false, msg: "Database error: Connection interrupted or data missing." })
                }
                return response.send({ success: true, msg: "", data: res.rows })
            })
            .catch(err => { return response.send({ success: false, msg: `Database Error: Code ${err.code}` }) })
    }
}
function teamHitting(request, response) {
    if (request.body.position === "all") {
        const season = request.body.season
        const search = [request.body.minpa, request.params.id]
        pool.query(`SELECT * FROM "${season}hitting" WHERE tpa >= $1 AND team_id = $2 ORDER BY obp DESC`, search)
            .then(res => {
                if (res.rows.length === 0 || res.rows.length === undefined) {
                    return response.send({ success: false, msg: "Database error: Connection interrupted or data missing." })
                }
                return response.send({ success: true, msg: "", data: res.rows })
            })
            .catch(err => { return response.send({ success: false, msg: `Database Error: Code ${err.code}` }) })
    }
}
module.exports.allHitting = allHitting
module.exports.teamHitting = teamHitting