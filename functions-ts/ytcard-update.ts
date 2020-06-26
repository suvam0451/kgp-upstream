import { query as q, Client } from 'faunadb';
import axios from 'axios';
import { callbackify } from 'util';
import { resolve } from 'dns';

interface IYoutubeEmbed {
    link: string;
    desc: string;
    id: string;
    tags: string;
}

/* */
exports.handler = (event: any, context: any, callback: Function) => {
    const client = new Client({
        secret: process.env.FAUNADB_SECRET_SUMMERINTERN!
    });

    let data: string = JSON.parse(event.body);
    let exportItem = {
        data: data
    };

    let ex: RegExp = /www.youtube.com\/watch\?v=([a-zA-Z0-9]+)/;

    if (ex.test(data)) {
        console.log("Query successful");
        return client.query(q.Create(q.Ref(q.Collection("youtube_cards"), "id"), exportItem)).then(res => {
            console.log("query response was", res);
            return {
                statusCode: 200,
                body: JSON.stringify(res)
            };
        });
    } else {
        return {
            statusCode: 400,
            body: []
        };
    }
    // https://www.youtube.com/watch?v=Hf4MJH0jDb4&t=170s

    // client.query(q.Match(q.Index('all_cards'), 'mainpage'))
    // return client.query(q.Get(q.Ref(q.Collection('youtubecards'), '268850065239441939'))).then(res => {

    // return client.query(q.Paginate(q.Match(q.Index('all_cards'), 'mainpage'), { before: null })).then(res => {
    //     console.log('query response was', res);
    //     return {
    //         statusCode: 200,
    //         body: JSON.stringify(res)
    //     };
    // });


};
