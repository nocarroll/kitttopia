import axios from 'axios'
import * as chunk from 'chunk'
const _url = 'http://127.0.0.1:3000'
const parser = new DOMParser()
const filetypes = new RegExp(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)

const scrape = (url = _url) => axios.get(url).then(response => {
  const source = parser.parseFromString(response.data, 'text/html')
  const samples = [...source.links].reduce((r, e) => {
    if (filetypes.test(e.href)) {
      const path = e.href.split('/')[e.href.split('/').length - 1]
      r.push({
        name: decodeURI(path),
        source: `${url}/${path}`
      })
    }
    return r
  }, [])
  return chunk(samples, 9)
})
.catch(e => {
  throw e
})

export default {
  scrape
}
