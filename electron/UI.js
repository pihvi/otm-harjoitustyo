const app = require('../domain/FeedReader.js')
const shell = require('electron').shell
const Parser = require('rss-parser')
const parser = new Parser()

$(document).on('click', 'a[href^="http"]', function(event) {
  event.preventDefault()
  shell.openExternal(this.href)
})

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

$('#feeds').on('click', 'li > div .icon-trash', function(e) {
    e.stopPropagation()
    if (confirm('Delete ' + $(this).parent().text() + '?')) {
      app.deleteFeed('lol', updateFeedList)
    }
  }
)

$('#list-view').on('click', 'li', function(e) {
  $('#list-view li').removeClass('selected')
  $(this).addClass('selected')
  $('#article-view').html($(this).data('content'))
})

updateFeedList()

function showFeed(url) {
  (async () => {
    $('#welcome').hide()
    $('#article-view').empty()
    $('#list-view').empty()
    const feed = await parser.parseURL(url)
    feed.items.forEach(item => {
      $('#list-view').append($('<li/>')
        .data('content', item.content)
        .text(item.title))
    })
  })()
}

function updateFeedList() {
  app.feedList((err, categories) => {
    $('#feeds')
      .empty()
      .append(_.map(categories, (feeds, category) => {
        const divs = feeds
          .map(feed => $('<div><span class="icon icon-trash"/>' + feed.name + '</div>')
            .data('url', feed.url))
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
