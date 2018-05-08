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
  showFeed($(this).data('id'), $(this).data('url'))
})

$('#feeds').on('click', 'li > div .icon-trash', function(e) {
    e.stopPropagation()
    if (confirm('Delete ' + $(this).parent().text() + '?')) {
      app.deleteFeed($(this).parent().data('id'), updateFeedList)
    }
  }
)

$('#list-view').on('click', 'li', function(e) {
  $('#list-view li').removeClass('selected')
  $(this).addClass('selected')
  if (!$(this).hasClass('read')) {
    app.markItemAsRead($(this).data('id'), $(this).data('feed'), updateReadItems)
  }
  $('#article-view').html($(this).data('content'))
})

updateFeedList()

function updateReadItems() {
  $('#list-view li').each(function() {
    app.isReadItem($(this).data('id'), $(this).data('feed'), (err, isRead) => {
      $(this).toggleClass('read', isRead)
      updateReadCount()
    })
  })
}

function updateReadCount() {
  const unread = $('#list-view li:not(.read)').length
  $('#feeds div.selected .unread').text(unread > 0 ? unread : '')
}

function showFeed(id, url) {
  (async () => {
    $('#welcome').hide()
    $('#article-view').empty()
    $('#list-view').empty()
    const feed = await parser.parseURL(url)
    feed.items.forEach(item => {
      $('#list-view').append($('<li/>')
        .data('content', item.content)
        .data('feed', id)
        .data('id', item.guid)
        .text(item.title))
    })
    updateReadItems()
  })()
}

function updateFeedList() {
  app.feedList((err, categories) => {
    $('#feeds')
      .empty()
      .append(_.map(categories, (feeds, category) => {
        const divs = feeds
          .map(feed => $('<div><span class="icon icon-trash"/>' + feed.name + '<span class="unread"/></div>')
            .data('url', feed.url)
            .data('id', feed._id))
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
