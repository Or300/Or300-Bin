// Mock data (In a real implementation, this would be a database)
let chatrooms = JSON.parse(localStorage.getItem('chatrooms')) || [];
let username = '';
let currentChatroom = null;

function setUsername() {
  username = document.getElementById('username').value;
  alert(`Username set to: ${username}`);
}

function createChatroom() {
  const chatroomName = document.getElementById('chatroom-name').value;
  
  if (!chatroomName) {
    alert('Please enter a chatroom name.');
    return;
  }

  const newChatroom = {
    name: chatroomName,
    members: [username],
    messages: []
  };

  chatrooms.push(newChatroom);
  localStorage.setItem('chatrooms', JSON.stringify(chatrooms));
  alert(`Chatroom ${chatroomName} created!`);

  displayChatrooms();
}

function searchChatrooms() {
  const searchQuery = document.getElementById('search-chatroom').value.toLowerCase();
  const filteredChatrooms = chatrooms.filter((room) => room.name.toLowerCase().includes(searchQuery));

  displayChatrooms(filteredChatrooms);
}

function displayChatrooms(rooms = chatrooms) {
  const chatroomsList = document.getElementById('chatrooms-list');
  chatroomsList.innerHTML = '';

  rooms.forEach((room, index) => {
    const chatroomElement = document.createElement('div');
    chatroomElement.classList.add('chatroom');
    chatroomElement.innerHTML = `
      <h3>${room.name}</h3>
      <button onclick="joinChatroom(${index})">Join Chatroom</button>
    `;
    chatroomsList.appendChild(chatroomElement);
  });
}

function joinChatroom(index) {
  currentChatroom = chatrooms[index];
  document.getElementById('chatroom-name-display').innerText = `Chatroom: ${currentChatroom.name}`;
  document.getElementById('chatrooms-list').style.display = 'none'; // Hide chatrooms list
  document.getElementById('chatroom-interface').style.display = 'block'; // Show chatroom interface

  displayMessages();
}

function displayMessages() {
  const messagesDisplay = document.getElementById('messages-display');
  messagesDisplay.innerHTML = ''; // Clear previous messages

  if (currentChatroom && currentChatroom.messages) {
    currentChatroom.messages.forEach((message) => {
      const messageElement = document.createElement('p');
      messageElement.innerText = `${message.username}: ${message.content}`;
      messagesDisplay.appendChild(messageElement);
    });
  }
}

function handleChatInput(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}

function sendMessage() {
  const messageInput = document.getElementById('chat-input');
  const messageContent = messageInput.value;

  if (messageContent) {
    const newMessage = {
      username: username,
      content: messageContent
    };

    // Add message to the current chatroom
    currentChatroom.messages.push(newMessage);
    localStorage.setItem('chatrooms', JSON.stringify(chatrooms));

    // Display the new message in the chat interface
    displayMessages();

    // Clear the input field
    messageInput.value = '';
  }
}
