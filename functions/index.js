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
  if (
    event.type !== 'message' ||
    event.message.type !== 'text' ||
    !event.message.text.match('เปรี้ยง')
  ) {
    return null
  }

  const message = randomMessage()

  return replyMessage(event.replyToken, message)
}

const randomMessage = () => MESSAGES[parseInt(Math.random() * 6)]

const MESSAGES = [
  '💄 No.1 Lucien แปลว่า พบเจอแสงสว่าง',
  '💄 No.2 Miguel มิเกล แปลว่า ดุจเทพเจ้า',
  '💄 No.3 Tadeo ทาดีโอ้ แปลว่า มีแต่คนยกย่อง',
  '💄 No.4 Ecio อี ซิ โอ้ ภาษาละติน ถูกสิงสู่สิ่งดีๆ โดยพลังอันเข้มแข็ง',
  '💄 No.5 Racknar แร็คน่า พลังอันแข็งแกร่ง',
  '💄 No.6 Olivia โอลิเวีย สัญลักษณ์แห่งความสุข'
]
