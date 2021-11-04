/*
 * @Author: DragonL
 * @Date: 2021-11-04 16:46:01
 * @LastEditors: DragonL
 * @LastEditTime: 2021-11-04 16:48:38
 * @Description: 
 */
const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
var bodyParser = require('koa-bodyparser');
const onerror = require('koa-onerror')
const logger = require('koa-logger')
const routers = require('./routers/index')
const responseFormatter = require('./middleware/response_formatter');
const path = require("path")
const schema = require("./graphql/index")
const cors = require('koa2-cors');
const { ApolloServer, gql } = require('apollo-server-koa');
// error handler
onerror(app)

// middlewares
// app.use(bodyparser({
//   enableTypes:['json', 'form', 'text']
// }))

// app.use(koaBody({
//   multipart: true, // 支持文件上传
//   formidable: {
//     formidable: {
//       uploadDir: path.join(__dirname, 'public/upload/'), // 设置文件上传目录
//       keepExtensions: true, // 保持文件的后缀
//       maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
//       onFileBegin: (name, file) => { // 文件上传前的设置
//         console.log(`name: ${name}`);
//         console.log(file);
//       },
//     },
//   },
// }));

app.use(cors());
app.use(json());
app.use(bodyParser());
// app.use(logger());
// app.use(responseFormatter(apiPrefix));


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



// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
