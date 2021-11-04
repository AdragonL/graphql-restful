/*
 * @Author: DragonL
 * @Date: 2021-11-04 16:45:33
 * @LastEditors: DragonL
 * @LastEditTime: 2021-11-04 16:49:15
 * @Description: 
 */

const { GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList } = require("graphql")

const pf = require("../lib/pf")
const pfSer = require("../lib/pf_ser")
/**
 * @description: 返回某个游戏全部平台或平台渠道信息 (平台ID， 平台名称）
 * @param1 {*}pf_id pf_name
 * @return {*}
 * @detail: 
 */
const infostyped = new GraphQLObjectType({
    name: "infostyped",
    fields: {
        pf_id: {
            type: GraphQLInt
        },
        pf_name: {
            type: GraphQLString
        }
    }
})


/**
 * @description: 返回某个游戏的平台下服务器列表信息（服务器ID, 服务器名，IP，端口, 开服时间，合服状态）数据格式
 * @param1 {*} //srv_id,srv_name,open_time,srv_port,ip,srv_status
 * @return {*}
 * @detail: 
 */
let infotyped = new GraphQLObjectType({
    name: "infotyped",   //必要 不然会报 must provide name error
    fields: {
        srv_id: {
            type: GraphQLInt
        },
        srv_name: {
            type: GraphQLString
        },
        open_time: {
            type: GraphQLInt
        },
        srv_port: {
            type: GraphQLString
        },
        ip: {
            type: GraphQLString
        },
        srv_status: {
            type: GraphQLInt
        }
    }
})


const info = {
    name: "info",
    type: new GraphQLList(infotyped),
    args: {
        game_id: {
            name: 'game_id',
            type: GraphQLInt
        }
    },
    async resolve(root, params, options) {
        console.log(params)
        return await pfSer.findSome(params.game_id)
    }
}

const infos = {
    name: 'infos',
    type: new GraphQLList(infostyped),
    args: {
        game_id: {
            name: 'game_id',
            type: GraphQLInt
        }
    },
    async resolve(root, params, options) {
        console.log(params)
        // let sql = `params.game_id`
        //   return  query(sql) 
        return params.game_id ? await pf.findById(params.game_id) : await pf.findAll()
        // return []
    }
}

let queryObj = new GraphQLObjectType({
    name: 'query',
    fields: () => ({
        info,
        infos
    })
})

let schema = new GraphQLSchema({
    query: queryObj,
})

module.exports = schema
