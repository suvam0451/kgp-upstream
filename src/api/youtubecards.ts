import axios from 'axios'

interface YoutubeEmbedData {
  link: string
  desc: string
}

// interface ResponseType {
//   statuscode: number
//   data: string
// }
async function _read() {
  console.log('Starting a read...')
  // let yeet = await axios.get('/.netlify/functions/ytcard-read')
  let res = await axios.get('/.netlify/functions/ytcard-read')
  console.log('Resolution was: ', res)
  // .then(res => {
  //   console.log(res.json())
  return res.data
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
