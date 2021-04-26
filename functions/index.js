const functions = require('firebase-functions')
const { replyMessage, configure } = require('./line')

configure(functions.config().line.accesstoken, functions.config().line.secret)

exports.lineWebhook = functions.https.onRequest((request, response) => {
  const { events } = request.body

  Promise.all(events.map(eventHandler)).then(() => {
    response.send(':)')
  })
})

const eventHandler = (event) => {
  if(event.type == 'message' || event.message.type == 'text') {
    if (event.message.text.match('ห้องเทรน')) {
      const message = `Partner ทุกคน กดเข้ากลุ่มเทรนได้เลยนะคะ 
      มีคู่มือการขายต่างๆให้ทบทวน และสามารถดึงตัวแทนใหม่เข้าได้ ก่อนเข้าพิมตอบคำถามกลุ่มก่อนนะคะ
      
      https://www.facebook.com/groups/693721457896607/?ref=share
      
      ถ้าคุณแน่อย่าแพ้พี่มาร์ค #ยิงแอด
      https://www.facebook.com/groups/2673968282685102/?ref=share
      
      กลุ่ม Pananchita Academy
      https://www.facebook.com/coachkae666/videos/1271929149843010/`
      
      return replyMessage(event.replyToken, message)
    } else if (event.message.text.match('openchat')) {
      const message = `New กลุ่มไลน์โอเพ่นแชท กลุ่มทีมใหม่
      เพื่อรวมตัวแทนทุกห้องให้อยู่ห้องเดียวกัน
      พูดคุยแลกเปลี่ยน สอบถามกันได้ในห้องนี้นะคะ
      วิธีเข้า
      1. ต้องตอบรหัสตัวแทน และชื่อแม่ทีม
      2.ใส่รูป ตั้งชื่อไลน์โดยใส่ชื่อแม่ทีมต่อท้ายด้วย
      ดูวิธีตามคลิปที่แนบนี้นะคะ
      
      กดเข้าห้อง 666 ยืนหนึ่งห้องใหม่ค่ะ
      
      https://line.me/ti/g2/Qd246jAsiFVCnBevLdxXaQ?utm_source=invitation&utm_medium=link_copy&utm_campaign=default`
      return replyMessage(event.replyToken, message)
    }
    else {
      return null
    }
  }
}
