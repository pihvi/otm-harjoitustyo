module.exports = {
  feedList, addFeed
}

const _ = require('lodash')
const datastore = require('./datastore.js')

/**
 * Get list of feeds grouped by categories
 */
function feedList(cb) {
  datastore.getFeeds((err, feeds) => {
    cb(err, _.groupBy(feeds, 'category'))
  })
}

/**
 * Add feed object to datastore
 */
function addFeed(feed) {
  datastore.addFeed(feed)
}
