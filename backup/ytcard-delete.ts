import { query as q, Client } from 'faunadb'

/* */
exports.handler = async (event: any, context: any, callback: Function) => {
  const client = new Client({
    secret: process.env.FAUNADB_SECRET_SUMMERINTERN!
  })

  let data: string = JSON.parse(event.body)
  let ex: RegExp = /www.youtube.com\/watch\?v=([_-a-zA-Z0-9]+)/

  if (ex.test(data)) {
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
        console.log(res)
        // Check for empty response
        if (!Object.keys(res.data).length) {
          return {
            status: 409, // Conflict
            body: JSON.stringify([])
          }
        } else {
          // Entry found... deleting
          return client.query(q.Delete(q.Ref(q.Collection('spells')))).then(ret => {
            console.log(ret)
            return {
              status: 409, // Conflict
              body: JSON.stringify([])
            }
          })
        }
      },
      (err: any) => {
        err => {
          return {
            status: 400,
            body: JSON.stringify(err)
          }
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
