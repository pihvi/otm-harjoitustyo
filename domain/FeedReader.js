module.exports = {
  feedList, addFeed, deleteFeed
}

const _ = require('lodash')
const datastore = require('./datastore.js')

/**
 * Get list of feeds grouped by categories
 * @param {function} cb - callback for getting the result
 */
function feedList(cb) {
  datastore.getFeeds((err, feeds) => {
    cb(err, _.groupBy(feeds, 'category'))
  })
}

/**
 * Add feed object to datastore
 * @param {Object} feed - the feed object to store
 */
function addFeed(feed) {
  datastore.addFeed(feed)
}

/**
 * Delete feed with given id
 * @param {Object} id - id of the feed to delete
 * @param {function} cb - callback after deletion
 */
function deleteFeed(id, cb) {
  datastore.deleteFeed(id, cb)
}
