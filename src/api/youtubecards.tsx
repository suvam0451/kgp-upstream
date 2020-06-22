import axios from 'axios'

interface YoutubeEmbedData {
  link: string
  desc: string
}

// interface FaunaResult {
//   statusCode: number
//   body: any
// }

// interface ResponseType {
//   statuscode: number
//   data: string
// }
async function _read() {
  console.log('Starting a read...')
  // let yeet = await axios.get('/.netlify/functions/ytcard-read')
  return fetch('/.netlify/functions/ytcard-read')
    .then((res: any) => {
      // console.log(res.json())
      console.log('At least the promise was resolved...')

      console.log('tag result was ', res)
      return res.json()
      // res.json().then(x => {
      //   console.log('resolution was', x)
      //   return x
      // })
      // console.log('Resolution was: ', res.)
      // .then(res => {
      //   console.log(res.json())
      // return res.body
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
