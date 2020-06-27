import { query as q, Client } from 'faunadb';
import axios from 'axios';
import { callbackify } from 'util';
import { resolve } from 'dns';
import { Link } from 'gatsby';

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
    let ex: RegExp = /www.youtube.com\/watch\?v=([a-zA-Z0-9]+)/;

    if (ex.test(data)) {
        // Prepare the export data
        let exportData: IYoutubeEmbed = {
            link: "link",
            tags: "mainpage",
            id: data,
            desc: ""
        };
        let exportItem = {
            data: {
                id: data.match(ex)[1],
                link: data,
                desc: "None",
                tags: "mainpage",
            }
        };

        let videoID = data.match(ex)[1];

        return client.query(q.Paginate(q.Match(q.Index('all_cards'), [videoID, "mainpage"]))).then((res: any) => {
            // Check for empty response
            if (!Object.keys(res.data).length) {
                return client.query((q.Create(q.Collection("youtubecards"), exportItem))).then((res) => {
                    return {
                        statusCode: 200,
                        body: JSON.stringify(res)
                    };
                });
            }
            // return {
            //     statusCode: 200,
            //     body: JSON.stringify(res)
            // };
        }, (err) => {
            console.log("failure", err);
            return {
                statusCode: 400,
                body: JSON.stringify(err)
            };
        });

        // return client.query(q.If(
        //     q.Exists(
        //         q.Ref(
        //             q.Paginate(q.Match(q.Index('all_cards'), [videoID, "mainpage"]))
        //         )
        //     ), true,
        //     q.Create(q.Ref(q.Collection("youtube_cards")), exportItem)
        // )).then(res => {
        //     console.log("query response was", res);
        //     return {
        //         statusCode: 200,
        //         body: JSON.stringify(res)
        //     };
        // });
    } else {
        return {
            statusCode: 400,
            body: []
        };
    }
};
