// Mock data (In a real implementation, this would be a database)
let chatrooms = JSON.parse(localStorage.getItem('chatrooms')) || [];

let username = '';

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
  alert(`Joining ${chatrooms[index].name}...`);
}
