module.exports = {
  feedList, addFeed
}

const _ = require('lodash')
const datastore = require('./datastore.js')

function feedList() {
  return _(datastore.getFeeds())
    .groupBy('category')
    .value()
}

function addFeed(feed) {
  datastore.addFeed(feed)
}
