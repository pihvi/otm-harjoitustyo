const app = require('../domain/FeedReader.js')

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

updateFeedList()

function updateFeedList() {
  $('#feeds')
    .empty()
    .append(_.map(app.feedList(), (feeds, category) => {
      const divs = feeds
        .map(feed => $('<div>' + feed.name + '</div>'))
      return $('<li>' + category + '</li>')
        .append(divs)
    }))
}

function toggleAddForm() {
  $('#add-feed')
    .toggle()[0]
    .reset()
}
