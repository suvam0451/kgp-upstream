"use strict";
exports.__esModule = true;
var faunadb_1 = require("faunadb");
/* */
exports.handler = function (event, context, callback) {
    var client = new faunadb_1.Client({
        secret: process.env.FAUNADB_SECRET_SUMMERINTERN
    });
    return client.query(faunadb_1.query.Paginate(faunadb_1.query.Match(faunadb_1.query.Index('all_cards'), 'mainpage'), { before: null })).then(function (res) {
        console.log('query response was', res);
        return {
            statusCode: 200,
            body: JSON.stringify(res)
        };
    });
};
