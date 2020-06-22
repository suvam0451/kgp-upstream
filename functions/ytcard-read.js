"use strict";
exports.__esModule = true;
var faunadb_1 = require("faunadb");
/* */
exports.handler = function (event, context, callback) {
    // Client Init
    // let _secret = process.env.FAUNADB_SECRET_SUMMERINTERN!
    // console.log('tarde secret was: ', _secret)
    var client = new faunadb_1.Client({
        secret: process.env.FAUNADB_SECRET_SUMMERINTERN
        //   API_CLIENT_SECRET: 'fnADunxTjNACBk9oeMNtYRJRAQZFhz2sgCJgxqiz'
    });
    client
        // .query(q.Match(q.Index('all_cards'), 'mainpage'))
        .query(faunadb_1.query.Get(faunadb_1.query.Ref(faunadb_1.query.Collection('youtubecards'), '268850065239441939')))
        .then(function (res) {
        console.log(res);
        // return new Promise(resolve => {
        //   resolve({ statuscode: 200, body: JSON.stringify(res) })
        // return {
        //   statuscode: 200,
        //   body: JSON.stringify(res)
        // }
        callback({
            status: 200,
            data: JSON.stringify(res)
        });
        // resolve(AxiosResponse)
        // return {
        //   status: 200,
        //   data: JSON.stringify(res)
        // }
        // })
    })["catch"](function (err) {
        console.log(err);
        // return new Promise(resolve => {
        //   resolve({ statuscode: 401, body: JSON.stringify([]) })
        callback({
            status: 401,
            data: JSON.stringify(err)
        });
        // return {
        //   status: 401,
        //   data: JSON.stringify(err)
        // }
        // })
        // return {
        //   statuscode: 401,
        //   body: JSON.stringify([])
        // }
    });
};
