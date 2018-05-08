const FeedReader = require('../domain/FeedReader.js')

jest.mock('../domain/datastore')

test('item is not marked as read by default', done => {
  FeedReader.isReadItem('itemid', 'feedid', (err, isRead) => {
    expect(err).toEqual(null)
    expect(isRead).toEqual(false)
    done()
  })
})

test('marking item as read, returns it as read item', done => {
  FeedReader.markItemAsRead('itemid', 'feedid', err => {
    expect(err).toEqual(null)
    FeedReader.isReadItem('itemid', 'feedid', (err2, isRead) => {
      expect(err2).toEqual(null)
      expect(isRead).toEqual(true)
      done()
    })
  })
})
