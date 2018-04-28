const app = require('../domain/FeedReader.js')
const Parser = require('rss-parser')
const parser = new Parser()

$('#add, #cancel-add-feed').click(toggleAddForm)

$('#add-add-feed').click(() => {
  const name = $('#name').val()
  const category = $('#category').val()
  const url = $('#url').val()
  if (!name || !category || !url) {
    alert('All fields are required')
  } else {
    app.addFeed({name, url, category})
    updateFeedList()
    toggleAddForm()
  }
})

$('#feeds').on('click', 'li > div', function(e) {
  $('#feeds div').removeClass('selected')
  $(this).addClass('selected')
  showFeed($(this).data('url'))
})

updateFeedList()

function showFeed(url) {
  (async () => {
    let feed = await parser.parseURL(url)
    feed.items.forEach(item => {
      console.log(item)
    })
  })()
}

function updateFeedList() {
  app.feedList((err, categories) => {
    $('#feeds')
      .empty()
      .append(_.map(categories, (feeds, category) => {
        const divs = feeds
          .map(feed => $('<div>' + feed.name + '</div>').data('url', feed.url))
        return $('<li>' + category + '</li>')
          .append(divs)
      }))
  })
}

function toggleAddForm() {
  $('#add-feed')
    .toggle()[0]
    .reset()
}
