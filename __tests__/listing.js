const FeedReader = require('../domain/FeedReader.js')

test('Feeds are listed in general category', () => {
  expect(FeedReader.feedList()).toEqual([{
    category: 'general',
    url: 'http://example.com/rss'
  }, {
    category: 'general',
    url: 'http://example.com/atom'
  }])
})
