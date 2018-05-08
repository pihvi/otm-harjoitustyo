module.exports = {
  addFeed, getFeeds, deleteFeed, markItemAsRead, getReadItem
}

const path = require('path')
const userDir = require('electron').remote.getGlobal('userData')
const NeDB = require('nedb')
const db = new NeDB({filename: path.join(userDir, 'db')})

db.loadDatabase()

function markItemAsRead(itemId, feedId, cb) {
  db.insert({
    type: 'read',
    item: itemId,
    feed: feedId
  }, cb)
}

function getReadItem(itemId, feedId, cb) {
  db.find({type: 'read', item: itemId, feed: feedId}, cb)
}

function deleteFeed(id, cb) {
  db.remove({_id: id}, {}, cb)
}

function addFeed(feed) {
  feed.type = 'feed'
  db.insert(feed, reportError)
}

function getFeeds(cb) {
  db.find({type: 'feed'}, (err, docs) => {
    reportError(err)
    cb(err, docs)
  })
}

function reportError(err) {
  if (err) {
    alert('Failed to load or save data.')
    console.error(err)
  }
}
