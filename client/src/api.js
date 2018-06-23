exports.sendRequest = (query) => {
  return fetch (`${process.env.SERVER_HOST}/graphql?query=${query}`)
    .then(res => res.json())
    .then(json => json.data)
}
