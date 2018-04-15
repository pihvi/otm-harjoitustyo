const FeedReader = require('../domain/FeedReader.js')

test('Feeds are listed under categories', () => {
  expect(FeedReader.feedList()).toEqual({
    "tech": [{
      "category": "tech",
      "name": "HackerNews",
      "url": "http://example.com/HN"
    }],
    "today": [{
      "category": "today",
      "name": "Weather",
      "url": "http://example.com/weather"
    }, {
      "category": "today",
      "name": "Headlines",
      "url": "http://example.com/headlines"
    }]
  })
})

test('Adding a feed to new category lists it there', () => {
  FeedReader.addFeed({
    category: 'news',
    name: 'hesari',
    url: 'http://hs.fi/rss',
  })
  expect(FeedReader.feedList()['news']).toEqual([{
    "category": "news",
    "name": "hesari",
    "url": "http://hs.fi/rss"
  }])
})
