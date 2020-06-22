"use strict";
exports.__esModule = true;
var faunadb_1 = require("faunadb");
/* */
exports.handler = function (event, context, callback) {
    var client = new faunadb_1.Client({
        secret: process.env.FAUNADB_SECRET_SUMMERINTERN
    });
    return client.query(faunadb_1.query.Get(faunadb_1.query.Ref(faunadb_1.query.Collection('youtubecards'), '268850065239441939'))).then(function (res) {
        console.log(res);
        var retval = { statusCode: 200, body: res };
        console.log('Resolving the promise', retval);
        return {
            statusCode: 200,
            body: JSON.stringify(res)
        };
    });
};
// .query(q.Match(q.Index('all_cards'), 'mainpage'))
// _query.then((res: any) =>
//   console.log(res.ref)
//   return {
//       statusCode: 200,
//       // body: JSON.stringify(res)
//       body: 'Hello!'
//     }
// );
// .then((data: any)=>
//   console.log('success', data)
//   // return new Promise(resolve => {
//   //   resolve({ statuscode: 200, body: JSON.stringify(res) })
//   return {
//     statusCode: 200,
//     // body: JSON.stringify(res)
//     body: 'Hello!'
//   }
// callback({
//   status: 200,
//   data: JSON.stringify(res)
// })
// resolve(AxiosResponse)
// return {
//   status: 200,
//   data: JSON.stringify(res)
// }
// })
// })
// .catch((err: Error) => {
//   console.log(err)
//   // return new Promise(resolve => {
//   //   resolve({ statuscode: 401, body: JSON.stringify([]) })
//   // callback({
//   //   status: 401,
//   //   data: JSON.stringify(err)
//   // })
//   return {
//     statusCode: 400,
//     data: JSON.stringify(err)
//   }
//   // })
//   // return {
//   //   statuscode: 401,
//   //   body: JSON.stringify([])
//   // }
// })}
