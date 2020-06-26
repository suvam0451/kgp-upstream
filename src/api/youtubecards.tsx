import axios from 'axios';

interface IYoutubeEmbed {
  link: string;
  desc: string;
  id: string;
  tags: string;
}

export interface YoutubeCardResult {
  ref: any;
  ts: number;
  data: string[];
}

// interface ResponseType {
//   statuscode: number
//   data: string
// }
async function _read() {
  return fetch('/.netlify/functions/ytcard-read')
    .then((res: any) => {
      return res.json();
    })
    .catch(() => {
      console.log('Unknown error occured !');
    });
}

const _update = (data: string) => {
  return fetch('/.netlify/functions/youtube-cards-update', {
    body: JSON.stringify(data)
  }).then(res => {
    return res.json();
  });
};

const _delete = (data: IYoutubeEmbed) => {
  return fetch('/.netlify/functions/youtube-cards-delete', {
    body: JSON.stringify(data)
  }).then(res => {
    return res.json();
  });
};

export default {
  read: _read,
  update: _update,
  delete: _delete
};
