const { client, pool } = require('../config/db.config')

function collect(players, stat) {
    return players.reduce((acc, player) => acc + parseFloat(player[stat]), 0)
}

function allPitching(request, response) {
    const season = request.body.season
    const innings = [request.body.minip]
    pool.query(`SELECT * FROM "${season}pitching" WHERE ip >= $1 ORDER BY era ASC`, innings)
        .then(res => {
            if (res.rows.length === 0 || res.rows.length === undefined) {
                return response.send({ success: false, msg: "Database error: Connection interrupted or data missing." })
            }
            return response.send({ success: true, msg: "", data: res.rows })
        })
        .catch(err => { return response.send({ success: false, msg: `Database Error: Code ${err.code}` }) })
}

function teamPitching(request, response) {
    const season = request.body.season
    const params = [request.body.minip, request.params.id]
    pool.query(`SELECT * FROM "${season}pitching" WHERE ip >= $1 AND team_id = $2 ORDER BY era ASC`, params)
        .then(res => {
            if (res.rows.length === 0 || res.rows.length === undefined) {
                return response.send({ success: false, msg: "Database error: Connection interrupted or data missing." })
            }
            return response.send({ success: true, msg: "", data: res.rows })
        })
        .catch(err => { return response.send({ success: false, msg: `Database Error: Code ${err.code}` }) })
}

// FIP function works but needs a way to handle Infinity

function getFip(request, response) {
    const season = request.body.season
    pool.query(`SELECT * FROM "${season}pitching"`).then(res => {
        let data = res.rows
        data.forEach(obj => {
            let finalIP = obj["ip"];
            finalIP = (Math.trunc(finalIP) + (((finalIP * 10) % 10) / 3));
            obj["ipn"] = finalIP
        })
        let leaguehr = collect(data, "hr");
        let leaguebb = collect(data, "bb");
        let leaguehb = collect(data, "hb");
        let leagueso = collect(data, "so");
        let leagueer = collect(data, "er");
        let leagueip = collect(data, "ipn");
        let leagueERA = ((leagueer / leagueip) * 9);
        let lgFIPconstant = leagueERA - (((13 * leaguehr) + (3 * (leaguebb + leaguehb)) - (2 * leagueso)) / leagueip)
        console.log(lgFIPconstant)
        let constants = [request.body.season, lgFIPconstant]
        pool.query(`INSERT into "season constants"(season,league_id,league,sport_id,fipconst) VALUES ($1,1,'mlb',1,$2)`, constants).catch(
            result => {
                console.log(result); return response.send({ msg: "Bahroken" })
            })
        data.forEach(obj => {
            let pitcherFIP = ((((13 * parseInt(obj["hr"])) + (3 * (parseInt(obj["bb"]) + parseInt(obj["hb"]))) - (2 * parseInt(obj["so"]))) / obj["ipn"]) + lgFIPconstant);
            
            obj["fip"] = pitcherFIP
            let params = [obj.fip, obj.id]
            pool.query(`UPDATE "${season}pitching" SET fip = $1 WHERE id = $2`, params).catch(err=>console.log(err,`for ${obj["name_first_last"]}`))
        })
        return response.send({msg: "We did it!"})
    })
}


module.exports.allPitching = allPitching
module.exports.teamPitching = teamPitching
module.exports.getFip = getFip