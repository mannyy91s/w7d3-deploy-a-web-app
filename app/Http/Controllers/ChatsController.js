'use strict'

const Pusher = require('pusher')
const Chat = use('App/Model/Chat')
class ChatsController {

  * index(request, response) {
      var chats = yield Chat.query().orderBy('id','desc')
      yield response.sendView('chats', {
          chats: chats
  })
  }

  * store(request, response) {
    var message = request.input('message')

    if (request.input('push') === true) {
      var pusher = new Pusher({
        appId: '268895',
        key: '0678e3357e1f836ce3ee',
        secret: 'c874543a228c48f309c3',
        encrypted: true
      })

      pusher.trigger('chat_app', 'new_chat', {
        message: message
      })
    }

    // saves the messages to your Chat model
    var chat = new Chat()
    chat.message = message
    yield chat.save()

    response.json(true)

  }

}

module.exports = ChatsController
