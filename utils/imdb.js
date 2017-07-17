import 'isomorphic-fetch';

const IMBD_KEY = "a99cc60fc2b34dbb18cb806b8a88ed14"

const parameterize = (object)=>{
  let res = ""
  return Object.keys(object).map(k => encodeURIComponent(k) + "=" + encodeURIComponent(object[k])).join("&")
}

export const searchMovies = async (params)=> {
  let mergedParams = Object.assign({}, params, {api_key: IMBD_KEY})
  console.log(mergedParams)
  let response = await fetch(`https://api.themoviedb.org/3/search/movie?${parameterize(mergedParams)}`, {
    method: "GET",
    headers: {
      'Accept':  'application/json'
    },
  })

  let json = await response.json()
  return json;
}

export const imageUrl = (path, size=300)=>{
  return `https://image.tmdb.org/t/p/w${size}/${path}`
}