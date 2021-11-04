const query = require('./mysql')

class pfSql {
    findById(id) {
        let _sql = `SELECT pf_id,pf_name FROM t_pf WHERE game_id=${id}`
        return query(_sql)
    }
    findAll() {
        let _sql = `SELECT pf_id,pf_name FROM t_pf `
        // console.log("dwdwdadasd,good")
        return query(_sql)
    }
}

module.exports = new pfSql