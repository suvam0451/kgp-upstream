import { query as q, Client } from 'faunadb'
import axios from 'axios'
import { callbackify } from 'util'
import { resolve } from 'dns'

interface FaunaResult {
  statusCode: number
  body: any
}

/* */
exports.handler = (event: any, context: any, callback: Function) => {
  const client = new Client({
    secret: process.env.FAUNADB_SECRET_SUMMERINTERN!
  })

  return client.query(q.Get(q.Ref(q.Collection('youtubecards'), '268850065239441939'))).then(res => {
    console.log(res)

    let retval: FaunaResult = { statusCode: 200, body: res }

    console.log('Resolving the promise', retval)
    return {
      statusCode: 200,
      body: JSON.stringify(res)
    }
  })
}
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
