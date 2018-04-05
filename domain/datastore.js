module.exports = {
  addFeed, getFeeds
}

const data = []

function addFeed(feed) {
  data.push(feed)
}

function getFeeds() {
  return data
}

// For initial testing
addFeed('http://example.com/rss')
addFeed('http://example.com/atom')
