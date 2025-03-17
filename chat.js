let username = localStorage.getItem('username');
let chatrooms = JSON.parse(localStorage.getItem('chatrooms')) || [];
let currentChatroom = null;

if (username) {
  document.getElementById('username').value = username;
}

document.getElementById('set-username').addEventListener('click', setUsername);
document.getElementById('view-chatrooms').addEventListener('click', showChatrooms);
document.getElementById('create-chatroom').addEventListener('click', createChatroom);
document.getElementById('send-message').addEventListener('click', sendMessage);

function setUsername() {
  username = document.getElementById('username').value;
  if (!username) {
    alert('Please enter a valid username');
    return;
  }
  localStorage.setItem('username', username);
  alert('Username set: ' + username);
}

function showChatrooms() {
  const chatroomList = document.getElementById('chatroom-list');
  chatroomList.innerHTML = '';
  if (chatrooms.length === 0) {
    chatroomList.innerHTML = 'No chatrooms available.';
  }
  chatrooms.forEach(chatroom => {
    const chatroomButton = document.createElement('button');
    chatroomButton.innerText = chatroom.name;
    chatroomButton.onclick = () => joinChatroom(chatroom.name);
    chatroomList.appendChild(chatroomButton);
  });
}

function createChatroom() {
  const chatroomName = prompt('Enter a name for the new chatroom');
  if (!chatroomName) return;

  const newChatroom = {
    name: chatroomName,
    messages: []
  };

  chatrooms.push(newChatroom);
  localStorage.setItem('chatrooms', JSON.stringify(chatrooms));
  showChatrooms();
}

function joinChatroom(chatroomName) {
  currentChatroom = chatrooms.find(chat => chat.name === chatroomName);
  if (!currentChatroom) return;

  document.getElementById('chat-container').style.display = 'block';
  document.getElementById('current-chatroom-name').innerText = chatroomName;
  displayMessages();
}

function displayMessages() {
  const messagesDiv = document.getElementById('messages');
  messagesDiv.innerHTML = '';
  currentChatroom.messages.forEach(message => {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.innerText = `${message.username}: ${message.text}`;
    messagesDiv.appendChild(messageDiv);
  });
}

function sendMessage() {
  const messageInput = document.getElementById('message-input');
  const messageText = messageInput.value.trim();

  if (!messageText) return;

  const message = {
    username: username || 'Anonymous',
    text: messageText
  };

  currentChatroom.messages.push(message);
  localStorage.setItem('chatrooms', JSON.stringify(chatrooms));

  messageInput.value = '';
  displayMessages();
}
