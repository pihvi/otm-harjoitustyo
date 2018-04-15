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
addFeed({name: 'Weather', url: 'http://example.com/weather', category: 'today'})
addFeed({name: 'Headlines', url: 'http://example.com/headlines', category: 'today'})
addFeed({name: 'HackerNews', url: 'http://example.com/HN', category: 'tech'})
