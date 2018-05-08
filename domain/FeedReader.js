module.exports = {
  feedList, addFeed, deleteFeed, markItemAsRead, isReadItem
}

const _ = require('lodash')
const datastore = require('./datastore.js')

/**
 * Mark item of a feed as read
 * @param {String} itemId - id of the item
 * @param {String} feedId - id of the feed
 * @param {function} cb - callback for getting items marked as read
 */
function markItemAsRead(itemId, feedId, cb) {
  datastore.markItemAsRead(itemId, feedId, cb)
}

/**
 * Check if given item is read already
 * @param {String} itemId - id of the item
 * @param {String} feedId - id of the feed
 * @param {function} cb - callback for getting the read status
 */
function isReadItem(itemId, feedId, cb) {
  datastore.getReadItem(itemId, feedId, (err, items) => {
    cb(err, items !== null && items.length > 0)
  })
}

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
