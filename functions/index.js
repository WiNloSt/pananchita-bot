const functions = require('firebase-functions')
const { replyMessage, configure } = require('./line')

configure(functions.config().line.accesstoken, functions.config().line.secret)

exports.lineWebhook = functions.https.onRequest((request, response) => {
  const { events } = request.body

  Promise.all(events.map(eventHandler)).then(() => {
    response.send(':)')
  })
})

const eventHandler = event => {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return null
  }

  return replyMessage(event.replyToken, 'Hello from the other side')
}
