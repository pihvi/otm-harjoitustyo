module.exports = {
  feedList
}

const _ = require('lodash')
const datastore = require('./datastore.js')

function feedList() {
  return _(datastore.getFeeds())
    .groupBy('category')
    .value()
}
