/*
 * @Author: DragonL
 * @Date: 2021-11-04 16:45:33
 * @LastEditors: DragonL
 * @LastEditTime: 2021-11-04 16:48:57
 * @Description: 
 */

const mysql = require('mysql')
const config = require('../config/index')

const pool = mysql.createPool({
  host        : config.database.HOST,
  user        : config.database.USERNAME,
  password    : config.database.PASSWORD,
  database    : config.database.DATABASE,
  port        : config.database.PORT,
  dateStrings : true
})

let query = ( sql, values ) => {
    return new Promise(( resolve, reject ) => {
      pool.getConnection( (err, connection) => {
        if (err) {
          reject( err )
        } else {
          connection.query(sql, values, ( err, rows) => {
            if ( err ) {
              reject( err )
            } else {
              resolve( rows )
            }
            connection.release()
          })
        }
      })
    })
  }
  
  module.exports = query

