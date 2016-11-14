var messageInput = document.getElementById('messageBox')
messageInput.addEventListener('keypress', enter)
messages = document.getElementById('messages')

// Pusher Setup
var pusher = new Pusher('0678e3357e1f836ce3ee', {
  encrypted: true
})

var pusherChannel = pusher.subscribe('chat_app')

pusherChannel.bind('new_chat', function(chat) {
  addChatMessage(chat)
})

function enter(enter){
  if(enter.key === 'Enter'){
    var message = messageInput.value
    messageInput.value = ''

    fetchData(message, true)
  }
}

function fetchData(message, push){
  fetch('/chats', {
      body: JSON.stringify({
        message: message,
        push: push
       }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
}

function addChatMessage(chat) {
  console.log(chat)
  fetchData(chat.message, false)
  if(chat.message.includes('giphy') || chat.message.includes('gif') || chat.message.includes('png')){
    var gif = document.createElement('img')
    gif.src = chat.message
    var msgs = document.createElement('li')
    msgs.classList.add('list-group-item')
    msgs.appendChild(gif)
    messages = document.getElementById('messages')
    msgsChild = messages.firstChild
    messages.insertBefore(gif , msgsChild)
  }
  var msgs = document.createElement('li')
  msgs.classList.add('list-group-item')
  msgs.innerHTML = chat.message
  messages = document.getElementById('messages')
  msgsChild = messages.firstChild
  messages.insertBefore(msgs, msgsChild)
}
