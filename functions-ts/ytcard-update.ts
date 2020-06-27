import { query as q, Client } from 'faunadb'
import axios from 'axios'
import { callbackify } from 'util'
import { resolve } from 'dns'
import { Link } from 'gatsby'

interface IYoutubeEmbed {
  link: string
  desc: string
  id: string
  tags: string
}

/* */
exports.handler = (event: any, context: any, callback: Function) => {
  const client = new Client({
    secret: process.env.FAUNADB_SECRET_SUMMERINTERN!
  })

  let data: string = JSON.parse(event.body)
  let ex: RegExp = /www.youtube.com\/watch\?v=([_-=a-zA-Z0-9]+)/

  if (ex.test(data)) {
    // Prepare the export data
    let exportData: IYoutubeEmbed = {
      link: 'link',
      tags: 'mainpage',
      id: data,
      desc: ''
    }
    let exportItem = {
      data: {
        id: data.match(ex)[1],
        link: data,
        desc: 'None',
        tags: 'mainpage'
      }
    }

    let videoID = data.match(ex)[1]

    return client.query(q.Paginate(q.Match(q.Index('all_cards'), [videoID, 'mainpage']))).then(
      (res: any) => {
        // Check for empty response
        if (!Object.keys(res.data).length) {
          //   console.log('Entry not found. adding...')
          return client.query(q.Create(q.Collection('youtubecards'), exportItem)).then(res => {
            return {
              status: 201, // Created
              body: JSON.stringify(res)
            }
          })
        } else {
          // entry already exists
          //   console.log('Entry found. Skipping...')
          return {
            status: 409, // Conflict
            body: JSON.stringify([])
          }
        }
      },
      err => {
        // console.log('failure', err)
        return {
          status: 400,
          body: JSON.stringify(err)
        }
      }
    )
  } else {
    return {
      status: 400,
      body: []
    }
  }
}
