/*
 * @Author: DragonL
 * @Date: 2021-11-04 16:45:33
 * @LastEditors: DragonL
 * @LastEditTime: 2021-11-04 16:49:06
 * @Description: 
 */

const query = require('./mysql')

class pfSerSql {

    //srv_id 服务器ID   srv_name 服务器名 open_time 开服时间  srv_port端口 ip IP srv_status合服状态
    findSome(game) {
        let _sql = `select srv_id,srv_name,open_time,srv_port,ip,srv_status from t_srv  join t_srv_host on t_srv.game_id=t_srv_host.game_id where t_srv.game_id=${game};`
        console.log(_sql)
        return query(_sql)
    }
}

function keyValue(dd) {
    let c = ''
    let a = Object.keys(dd)
    // for (let b = 0; b < a.length; b++) {
    //     // console.log(dd[a[b]], a[b])
    //     c += `AND ${a[b]}=${typeof dd[a[b]] === Number ? dd[a[b]] : '"' + dd[a[b]] + '"'} `
    // }
    return c
}


module.exports = new pfSerSql