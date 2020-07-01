import { query as q, Client } from 'faunadb'

/* */
exports.handler = (event: any, context: any, callback: Function) => {
  const client = new Client({
    secret: process.env.FAUNADB_SECRET_SUMMERINTERN!
  })

  return client.query(q.Paginate(q.Match(q.Index('all_cards'), 'mainpage'), { before: null })).then(res => {
    console.log('query response was', res)
    return {
      statusCode: 200,
      body: JSON.stringify(res)
    }
  })
}
