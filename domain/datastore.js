module.exports = {
  addFeed, getFeeds, deleteFeed
}

const path = require('path')
const userDir = require('electron').remote.getGlobal('userData')
const NeDB = require('nedb')
const db = new NeDB({filename: path.join(userDir, 'db')})

db.loadDatabase()

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
