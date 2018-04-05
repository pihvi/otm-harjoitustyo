module.exports = {
  feedList
}

const datastore = require('./datastore.js')

function feedList() {
  return datastore
    .getFeeds()
    .map((feed) => ({
      category: 'general',
      url: feed
    }))
}
