const deleted = []

module.exports = {
  addFeed, getFeeds, deleteFeed, deleted, getReadItem, markItemAsRead
}

const data = []
const read = {}

function markItemAsRead(itemId, feedId, cb) {
  read[itemId + feedId] = {item: itemId, feed: feedId}
  cb(null)
}

function getReadItem(itemId, feedId, cb) {
  const res = []

  if (read[itemId + feedId]) {
    res.push(read[itemId + feedId])
  }
  cb(null, res)
}

function addFeed(feed) {
  data.push(feed)
}

function getFeeds(cb) {
  cb(null, data)
}

function deleteFeed(id, cb) {
  deleted.push(id)
  cb()
}

addFeed({name: 'Weather', url: 'http://example.com/weather', category: 'today'})
addFeed({name: 'Headlines', url: 'http://example.com/headlines', category: 'today'})
addFeed({name: 'HackerNews', url: 'http://example.com/HN', category: 'tech'})
