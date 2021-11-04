
这一次使用restful和graph两种api对比之下，发现graph相对比restful更加的灵活。graph可以生成接口文档，让前端人员决定返回的数据结构，在如果出现一个页面大量出现相类似的api的时候可以选择使用graph api，
前端可以使用graphql-request 配合graphql-tag来作为前端的对接接口

前端vue

```

import { GraphQLClient } from 'graphql-request';

const url = 'http://localhost:3000/graphql';

const graphQLClient = new GraphQLClient(url, {
  mode: 'cors',
});

export default graphQLClient;  //封装graphql请求


```
之后在另外页面编写api文件
```
type infos = {
    'pf_id': number,
    'pf_name': string
}
type pf = {
    infos: infos
}

export default async function pfList(gameId: number): Promise<pf> {
  const query = gql`
    query  {
        infos(game_id:${gameId}) {
            pf_id,
            pf_name
        }
      }
       
    `;

  // eslint-disable-next-line no-return-await
  return await client.request(query, { game_id: gameId });
}


```

最后在页面中调用即可


在后台选用的是koa2

首先需要封装graphql
```

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


```

数据库使用的是mysql

```
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
```

```
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
```

在router/index.js
```
const router = require('koa-router')();
// const config = require('../config/index');
// const { graphqlKoa, graphiqlKoa } = require('graphql-server-koa')
const { graphql } = require('graphql');
router.prefix('/api');


const schema = require("../graphql/index")


router.get('/graphql', async (ctx, next) => {
    let query = ctx.request.query
    console.log('ccccc',query)
    let result = await graphql(schema, query)
    ctx.body = JSON.stringify(result, null, 2);
})


module.exports = router;


```

还有controllers
```
exports.find = async (ctx) => {
    let result;
    const reqQuery = ctx.query;
    if (reqQuery && !tool.isEmptyObject(reqQuery)) {
        result = my.findSome(reqQuery.game_id);
    }
    await result.then((res) => {
        if (res) {
            ctx.body = res;
            return res
        } else {
            throw new ApiError(ApiErrorNames.UNEXIST_ID);
        }
    }).catch((err) => {
        throw new ApiError(err.name, err.message);
    });
};

```
在app.js
```
app.use(routers.routes(), routers.allowedMethods())


let server;
async function aa() {
  server = new ApolloServer({ //创建Graphql server
    schema,
    context: ({ ctx }) => {
      // let token = ctx.
    }
  });
  await server.start()
  server.applyMiddleware({ app });
}
aa()
```

剩下的还有restful就不放出来了 可以在github上看一看

参考资料 ：
https://gitee.com/zouchengxin/blog-vue3/ （前端 vue3）
https://juejin.cn/post/6844903545276203022#heading-6 （后端）
https://www.jianshu.com/p/8d6f51fb0055（后端）