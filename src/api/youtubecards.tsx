import axios from 'axios'
import { YoutubeExhibit } from '../components/special/YoutubeExhibit'
import { resolve } from 'dns'

interface IYoutubeEmbed {
  link: string
  desc: string
  id: string
  tags: string
}

export interface YoutubeCardResult {
  ref: any
  ts: number
  data: string[]
}

// 200
export interface IResultYTCardUpdate {
  ref: any
  ts: number
  data: {
    id: string
    link: string
    desc: string
    tags: string
  }
}

export interface IResponseWithBody {
  status: number
  payload: any
}

/** Adds an entry if doesn't exist. */
export function updatecards(_ref: React.RefObject<HTMLInputElement>, setSection: React.Dispatch<React.SetStateAction<JSX.Element>>) {
  if (typeof _ref.current != 'undefined') {
    let val = _ref.current!.value
    _update(val).then(res => {
      if (typeof res != 'undefined') {
        setSection(<p>Successfully added entry for {res.data.id}. Refreshing...</p>)
        readcards(setSection)
      } else {
        // Print debug message for this
      }
    })
  }
}

/** Reads all the entries by Index. */
export function readcards(setSection: React.Dispatch<React.SetStateAction<JSX.Element>>) {
  setSection(<p>'Loading data...'</p>)

  _read().then((res: YoutubeCardResult) => {
    const retval: any = [] // Returned React component
    if (typeof res == 'undefined') {
      // console.log('Failed to obtain API data')
    } else {
      // loop out the inks
      let cardlinks: string[] = []
      res.data.forEach(linkobject => {
        cardlinks = cardlinks.concat([linkobject])
      })

      console.log('Setting successful...')

      retval.push(<YoutubeExhibit cardlinks={cardlinks} />)
      setSection(retval)
    }
  })
}

export interface IResponse {
  statusCode: number
  data: Object
}
async function _read() {
  return fetch('/.netlify/functions/ytcard-read')
    .then((res: any) => {
      return res.json()
    })
    .catch(() => {
      console.log('Unknown error occured !')
    })
}

async function _update(data: string): Promise<IResultYTCardUpdate | undefined> {
  return fetch('/.netlify/functions/ytcard-update', {
    method: 'PUT',
    body: JSON.stringify(data)
  }).then(res => {
    return new Promise<IResultYTCardUpdate | undefined>((resolve, reject) => {
      switch (res.status) {
        case 201: {
          resolve(res.json()) // results appended to "res.requestResult"
        }
        case 400: {
          resolve(undefined)
          // return
        }
        default: {
          resolve(undefined)
        }
      }
    })
  })
}

const _delete = (data: IYoutubeEmbed) => {
  return fetch('/.netlify/functions/youtube-cards-delete', {
    body: JSON.stringify(data)
  }).then(res => {
    return res.json()
  })
}

export default {
  read: _read,
  update: _update,
  delete: _delete,
  updatecards: updatecards,
  readcards: readcards
}
