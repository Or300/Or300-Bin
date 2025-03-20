let username = '';
let currentChatroom = '';
const chatroomList = document.getElementById('chatroom-list');
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const chatWindow = document.getElementById('chat-window');
const chatroomTitle = document.getElementById('chatroom-title');
const createChatroomDiv = document.getElementById('create-chatroom');

// Mock chatrooms (this would be dynamic in a real app)
let chatrooms = ['General', 'Games', 'Music'];

// Set the username
function setUsername() {
  username = document.getElementById('username').value;
  if (username) {
    alert(`Username set to: ${username}`);
    loadChatrooms();
  } else {
    alert('Please enter a username.');
  }
}

// Show the chatrooms
function loadChatrooms() {
  chatroomList.innerHTML = '';
  chatrooms.forEach(room => {
    const li = document.createElement('li');
    li.textContent = room;
    li.onclick = () => joinChatroom(room);
    chatroomList.appendChild(li);
  });
}

// Show the create chatroom form
function showCreateChatroom() {
  createChatroomDiv.classList.remove('hidden');
}

// Create a new chatroom
function createChatroom() {
  const newRoomName = document.getElementById('new-chatroom-name').value;
  if (newRoomName) {
    chatrooms.push(newRoomName);
    alert(`Chatroom '${newRoomName}' created!`);
    loadChatrooms();
    createChatroomDiv.classList.add('hidden');
  } else {
    alert('Please enter a chatroom name.');
  }
}

// Join a selected chatroom
function joinChatroom(room) {
  currentChatroom = room;
  chatroomTitle.textContent = `Chatroom: ${room}`;
  chatWindow.classList.remove('hidden');
  loadMessages(room);
}

// Load chat messages (this would be dynamic in a real app)
function loadMessages(room) {
  messagesDiv.innerHTML = '';
  for (let i = 0; i < 10; i++) {
    const msg = document.createElement('p');
    msg.textContent = `Message ${i + 1} in ${room}...`;
    messagesDiv.appendChild(msg);
  }
}

// Send a message
function sendMessage() {
  const message = messageInput.value;
  if (message) {
    const msg = document.createElement('p');
    msg.textContent = `${username}: ${message}`;
    messagesDiv.appendChild(msg);
    messageInput.value = ''; // Clear the input
  }
}
