const router = require('koa-router')();
// const config = require('../config/index');
// const { graphqlKoa, graphiqlKoa } = require('graphql-server-koa')
const tPf = require('./tPf');
const tPfSer = require('./tPfSer');
const { graphql } = require('graphql');
router.prefix('/api');

router.use('/tPf', tPf.routes(), tPf.allowedMethods());
router.use('/tPfSer', tPfSer.routes(), tPfSer.allowedMethods());

const schema = require("../graphql/index")


router.get('/graphql', async (ctx, next) => {
    let query = ctx.request.query
    console.log('ccccc',query)
    let result = await graphql(schema, query)
    ctx.body = JSON.stringify(result, null, 2);
})


module.exports = router;
