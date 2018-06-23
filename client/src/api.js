exports.sendRequest = (query) => {
  return fetch (`${process.env.SERVER_HOST}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ query })
  })
    .then(res => res.json())
    .then(json => json.data)
}
