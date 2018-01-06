const line = require('@line/bot-sdk')

let client

exports.configure = (channelAccessToken, channelSecret) => {
  client = new line.Client({
    channelAccessToken,
    channelSecret
  })
}

exports.replyMessage = (replyToken, message) =>
  client
    .replyMessage(replyToken, {
      type: 'text',
      text: message
    })
    .then(() => {
      console.log('success')
    })
    .catch(err => {
      console.error('error occured', err)
    })

exports.pushMessage = (receiverId, message) =>
  client
    .pushMessage(receiverId, {
      type: 'text',
      text: message
    })
    .then(() => {
      console.log('success')
    })
    .catch(err => {
      console.error('error occured', err)
    })
