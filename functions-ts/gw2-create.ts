import { query as q, Client } from 'faunadb'

// const q = faunadb.query

interface GW2MarketItem {
  id: number
  whitelisted: boolean
  buys: {
    quantity: number
    unit_price: number
  }
  sells: {
    quantity: number
    unit_price: number
  }
}

exports.handler = async (event: any, context: any, callback: Function) => {
  // DB secret
  const client = new Client({
    // secret: process.env.FAUNADB_DB_SECRET
    secret: 'fnADunxTjNACBk9oeMNtYRJRAQZFhz2sgCJgxqiz'
  })

  const data: GW2MarketItem = JSON.parse(event.body)
  const entryItem = {
    data: data
  }

  // DB query -- CREATE
  //   return client.query(q.Create(q.Ref('')))
  console.log('Sample obtained...')
  callback(null, { statusCode: 200, body: 'Hello, world' })

  return client
    .query(
      q.If(
        q.Exists(q.Ref(q.Collection('lastupdated'), entryItem.data.id)),
        q.Update(q.Ref(q.Collection('lastupdated'), entryItem.data.id), entryItem),
        q.Create(q.Ref(q.Collection('lastupdated'), entryItem.data.id), entryItem)
      )
    )
    .then(
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )
}
