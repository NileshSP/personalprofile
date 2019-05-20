export async function cachedFetch(url, options) {
  // Use the URL as the cache key to sessionStorage
  let cacheName = "ProfileCache"
  let cacheKey = url


  // START new cache HIT code
  //let cacheObject = await caches.open(cacheName);
  //let cached = await cacheObject.match(cacheKey)
  let cached = sessionStorage.getItem(cacheKey)
  if (cached !== null) {
    // it was in sessionStorage! Yay!
    let response = new Response(new Blob([cached]))
    console.log(`${url} data is from cache`)
    return Promise.resolve(response)
  }
  // END new cache HIT code

  return fetch(url, options).then(response => {
    // let's only store in cache if the content-type is
    // JSON or something non-binary
    if (response.status === 200) {
      let ct = response.headers.get('Content-Type')
      if (ct && (ct.match(/application\/json/i) || ct.match(/text\//i))) {
        // There is a .json() instead of .text() but
        // we're going to store it in sessionStorage as
        // string anyway.
        // If we don't clone the response, it will be
        // consumed by the time it's returned. This
        // way we're being un-intrusive.
        //cacheObject.put(url,response.clone())
        response.clone().text().then(content => {
          sessionStorage.setItem(cacheKey, content)
        })
      }
    }
    return response
  })
}