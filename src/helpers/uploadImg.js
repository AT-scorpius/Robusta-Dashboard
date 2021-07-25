import axios from 'axios';

export default function uploadImage(img) {
  const body = new FormData();
  body.append('key', '22db36e00bee3ef919df52f806224a17');
  body.append('image', img);
  return axios({
    method: 'post',
    url: 'https://api.imgbb.com/1/upload',
    data: body,
    headers: {
      'content-type': 'multipart/form-data',
    }
  }).then((res) => res.data.data.display_url).catch(() => false);
}
