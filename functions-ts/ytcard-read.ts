import { query as q, Client } from 'faunadb'
import axios from 'axios'
import { callbackify } from 'util'

/* */
exports.handler = (event: any, context: any, callback: Function) => {
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
      console.log(res)
      // return new Promise(resolve => {
      //   resolve({ statuscode: 200, body: JSON.stringify(res) })
      // return {
      //   statuscode: 200,
      //   body: JSON.stringify(res)
      // }
      callback({
        status: 200,
        data: JSON.stringify(res)
      })
      // resolve(AxiosResponse)
      // return {
      //   status: 200,
      //   data: JSON.stringify(res)
      // }
      // })
    })
    .catch(err => {
      console.log(err)
      // return new Promise(resolve => {
      //   resolve({ statuscode: 401, body: JSON.stringify([]) })
      callback({
        status: 401,
        data: JSON.stringify(err)
      })
      // return {
      //   status: 401,
      //   data: JSON.stringify(err)
      // }
      // })
      // return {
      //   statuscode: 401,
      //   body: JSON.stringify([])
      // }
    })
}
