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
document.getElementById('save-settings').addEventListener('click', saveSettings);

function setUsername() {
  username = document.getElementById('username').value;

  if (isRestrictedUsername(username)) {
    alert('This username is restricted. Please choose a different name.');
    return;
  }

  if (!username) {
    alert('Please enter a valid username');
    return;
  }

  localStorage.setItem('username', username);
  alert('Username set: ' + username);
}

function showChatrooms() {
  const chatroomList = document.getElementById('chatroom-list');
  chatroomList.innerHTML = ''; // Clear chatroom list

  if (chatrooms.length === 0) {
    chatroomList.innerHTML = 'No chatrooms available.';
    return;
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

  // Add chatroom to localStorage and update list
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
  messagesDiv.innerHTML = ''; // Clear old messages

  currentChatroom.messages.forEach(message => {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.innerHTML = `<span style="color:${message.usernameColor};">${message.username}:</span> ${message.text}`;
    messagesDiv.appendChild(messageDiv);
  });
}

function sendMessage() {
  const messageInput = document.getElementById('message-input');
  const messageText = messageInput.value.trim();

  if (!messageText) return;

  const message = {
    username: username || 'Anonymous',
    text: messageText,
    usernameColor: localStorage.getItem('usernameColor') || '#ff00ff'
  };

  currentChatroom.messages.push(message);
  localStorage.setItem('chatrooms', JSON.stringify(chatrooms));

  messageInput.value = '';
  displayMessages();
}

function saveSettings() {
  const textColor = document.getElementById('text-color').value;
  const usernameColor = document.getElementById('username-color').value;

  // Save colors to localStorage
  localStorage.setItem('textColor', textColor);
  localStorage.setItem('usernameColor', usernameColor);

  // Update the color scheme immediately
  document.body.style.color = textColor;
  document.getElementById('username').style.color = usernameColor;

  alert('Settings saved!');
}

// Check if the username contains restricted words
function isRestrictedUsername(username) {
  const restrictedWords = ['or300', 'oreo'];
  return restrictedWords.some(word => username.toLowerCase().includes(word));
}

// Load settings on page load
window.onload = function() {
  const textColor = localStorage.getItem('textColor') || '#ffffff';
  const usernameColor = localStorage.getItem('usernameColor') || '#ff00ff';
  document.body.style.color = textColor;
  document.getElementById('username').style.color = usernameColor;
}
