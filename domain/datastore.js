module.exports = {
  addFeed, getFeeds
}

const userDir = require('electron').remote.getGlobal('userData')
const NeDB = require('nedb')
const db = new NeDB({filename: require('path').join(userDir, 'db')})
db.loadDatabase()

const data = []

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
