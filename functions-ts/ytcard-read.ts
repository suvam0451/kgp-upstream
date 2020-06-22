import { query as q, Client } from 'faunadb'
import axios from 'axios'
import { callbackify } from 'util'

/* */
exports.handler = async (event: any, context: any, callback: Function) => {
  // Client Init
  // let _secret = process.env.FAUNADB_SECRET_SUMMERINTERN!
  // console.log('tarde secret was: ', _secret)
  const client = new Client({
    secret: process.env.FAUNADB_SECRET_SUMMERINTERN!
    //   API_CLIENT_SECRET: 'fnADunxTjNACBk9oeMNtYRJRAQZFhz2sgCJgxqiz'
  })

  client
    // .query(q.Match(q.Index('all_cards'), 'mainpage'))
    .query(q.Get(q.Ref(q.Collection('youtubecards'), '268850065239441939')))
    .then((res: any) => {
      console.log('success', res)
      // return new Promise(resolve => {
      //   resolve({ statuscode: 200, body: JSON.stringify(res) })
      return {
        statusCode: 200,
        // body: JSON.stringify(res)
        body: 'Hello!'
      }
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
    })
    .catch((err: Error) => {
      console.log(err)
      // return new Promise(resolve => {
      //   resolve({ statuscode: 401, body: JSON.stringify([]) })
      // callback({
      //   status: 401,
      //   data: JSON.stringify(err)
      // })
      return {
        statusCode: 400,
        data: JSON.stringify(err)
      }
      // })
      // return {
      //   statuscode: 401,
      //   body: JSON.stringify([])
      // }
    })
}
