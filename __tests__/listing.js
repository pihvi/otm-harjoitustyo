const FeedReader = require('../domain/FeedReader.js')

jest.mock('../domain/datastore')

test('Feeds are listed under categories', done => {
  FeedReader.feedList((err, res) => {
    expect(err).toEqual(null)
    expect(res).toEqual({
      'tech': [{
        'category': 'tech',
        'name': 'HackerNews',
        'url': 'http://example.com/HN'
      }],
      'today': [{
        'category': 'today',
        'name': 'Weather',
        'url': 'http://example.com/weather'
      }, {
        'category': 'today',
        'name': 'Headlines',
        'url': 'http://example.com/headlines'
      }]
    })
    done()
  })
})

test('Adding a feed to new category lists it there', done => {
  FeedReader.addFeed({
    category: 'news',
    name: 'hesari',
    url: 'http://hs.fi/rss'
  })
  FeedReader.feedList((err, res) => {
    expect(err).toEqual(null)
    expect(res.news).toEqual([{
      'category': 'news',
      'name': 'hesari',
      'url': 'http://hs.fi/rss'
    }])
    done()
  })
})

test('Deleting feed deletes it from datastore', done => {
  FeedReader.deleteFeed('feedid', () => {
    const deleted = require('../domain/datastore.js').deleted
    expect(deleted[0]).toEqual('feedid')
    done()
  })
})
