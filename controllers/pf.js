/*
 * @Author: DragonL
 * @Date: 2021-11-04 16:45:33
 * @LastEditors: DragonL
 * @LastEditTime: 2021-11-04 16:49:28
 * @Description: 
 */

const ApiError = require('../error/api_error');
const ApiErrorNames = require('../error/api_error_name');
const tool = require('../utils/tool');
const my = require("../lib/pf")


/**
 * 查
 */
exports.find = async (ctx) => {
  let result;
  const reqQuery = ctx.query;
  console.log(reqQuery.game_id, "666666666")
  if (reqQuery && !tool.isEmptyObject(reqQuery)) {
    // if (reqQuery.game_id) {
    result = my.findById(reqQuery.game_id);
    // } 
  } else {
    result = my.findAll();
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

/**
 * 查 动态路由 id
 */
//  exports.detail = async (ctx) => {
//   const { id } = ctx.params;
//   if (!tool.validatorsFun.numberAndCharacter(id)) {
//     throw new ApiError(ApiErrorNames.LEGAL_ID);
//   }
//   await dbHelper.findById(id).then((res) => {
//     if (res) {
//       ctx.body = res;
//     } else {
//       throw new ApiError(ApiErrorNames.UNEXIST_ID);
//     }
//   }).catch((err) => {
//     throw new ApiError(err.name, err.message);
//   });
// };

