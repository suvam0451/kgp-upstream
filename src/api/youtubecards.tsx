import axios from 'axios'

interface YoutubeEmbedData {
  link: string
  desc: string
}

export interface YoutubeCardResult {
  ref: any
  ts: number
  data: {
    desc?: string
    id: string
    link: string
    tags: string
  }[]
}

// interface ResponseType {
//   statuscode: number
//   data: string
// }
async function _read() {
  return fetch('/.netlify/functions/ytcard-read')
    .then((res: any) => {
      return res.json()
    })
    .catch(() => {
      console.log('Unknown error occured !')
    })
  // .then((data: any) => {
  //   console.log(data.body)
  // })

  // })
  // console.log(yeet.data)
  // then(
  //   (res: Response) => {
  //     // console.log('full result was:', res.json())
  //     console.log(res)
  // return res.body
  // res.json().then(x => {
  //   console.log(x)
  //   return x.body
  // })
  // let _body = res.body
  // let arson: any = JSON.parse(_body!)
  // }
  // () => {
  //   console.log('Rejetcted')
  // }
  // )
  // .catch(err => {
  //   console.log('No reply !!!')
  // })
}

const _update = (data: YoutubeEmbedData) => {
  return fetch('/.netlify/functions/youtube-cards-update', {
    body: JSON.stringify(data)
  }).then(res => {
    return res.json()
  })
}

const _delete = (data: YoutubeEmbedData) => {
  return fetch('/.netlify/functions/youtube-cards-delete', {
    body: JSON.stringify(data)
  }).then(res => {
    return res.json()
  })
}
export default {
  read: _read,
  update: _update,
  delete: _delete
}
