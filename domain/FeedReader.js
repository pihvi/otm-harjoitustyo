module.exports = {
  feedList, addFeed
}

const _ = require('lodash')
const datastore = require('./datastore.js')

/**
 * Get list of feeds grouped by categories
 */
function feedList() {
  return _(datastore.getFeeds())
    .groupBy('category')
    .value()
}

/**
 * Add feed object to datastore
 */
function addFeed(feed) {
  datastore.addFeed(feed)
}
