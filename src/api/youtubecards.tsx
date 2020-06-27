import axios from 'axios'
import { YoutubeExhibit } from '../components/special/YoutubeExhibit'

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
export interface IResponseWithBody {
  status: number
  payload: any
}

/** Adds an entry if doesn't exist. */
export function updatecards(_ref: React.RefObject<HTMLInputElement>, setSection: React.Dispatch<React.SetStateAction<JSX.Element>>) {
  if (typeof _ref.current != 'undefined') {
    let val = _ref.current!.value
    setSection(<p>Processing query...</p>)
    _update(val).then(res => {
      console.log('Now printing information...')
      console.log(res, res.requestResult.statusCode)
      switch (res.requestResult.statusCode) {
        case 201: {
          setSection(<p>Successfully added entry...</p>)
          break
        }
        case 409: {
          setSection(<p>Entry already exists. Skipping...</p>)
          break
        }
        case 400: {
          setSection(<p>Entry already exists. Skipping...</p>)
          break
        }
        default: {
          setSection(<p>Entry already exists. Skipping...</p>)
          break
        }
      }
    })
  }
}

/** Reads all the entries by Index. */
export function readcards(
  setSection: React.Dispatch<React.SetStateAction<JSX.Element>>,
  setSwitch: React.Dispatch<React.SetStateAction<boolean>>,
  valSwitch: boolean
) {
  setSection(<p>'Loading data...'</p>)

  // If switch is pressed
  if (valSwitch == true) {
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

        retval.push(<YoutubeExhibit cardlinks={cardlinks} />)
        setSection(retval)
      }
    })
    setSwitch(false)
  } else {
    // hide carousal element if already visible
    setSwitch(true)
  }
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

async function _update(data: string) {
  return fetch('/.netlify/functions/ytcard-update', {
    method: 'PUT',
    body: JSON.stringify(data)
  }).then(res => {
    return res.json() // results appended to "res.requestResult"
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
