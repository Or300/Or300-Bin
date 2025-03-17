// Firebase config (replace with your values)
const firebaseConfig = {
  apiKey: "YOUR-API-KEY",
  authDomain: "YOUR-AUTH-DOMAIN",
  projectId: "YOUR-PROJECT-ID",
  storageBucket: "YOUR-STORAGE-BUCKET",
  messagingSenderId: "YOUR-MESSAGING-SENDER-ID",
  appId: "YOUR-APP-ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

let currentRoom = null;

// Sign Up
function signUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      alert("Account created!");
    })
    .catch(error => alert(error.message));
}

// Login
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      showUI();
    })
    .catch(error => alert(error.message));
}

// Logout
function logout() {
  auth.signOut().then(() => {
    hideUI();
  });
}

// Show UI after login
function showUI() {
  document.getElementById("auth").style.display = "none";
  document.getElementById("userInfo").style.display = "block";
  document.getElementById("chatroomForm").style.display = "block";
  document.getElementById("displayName").innerText = `Logged in as: ${auth.currentUser.email}`;
  document.querySelector("button[onclick='logout()']").style.display = "block";
}

// Hide UI after logout
function hideUI() {
  document.getElementById("auth").style.display = "block";
  document.getElementById("userInfo").style.display = "none";
  document.getElementById("chatroomForm").style.display = "none";
  document.querySelector("button[onclick='logout()']").style.display = "none";
}

// Firebase Auth State Listener
auth.onAuthStateChanged(user => {
  if (user) {
    showUI();
  } else {
    hideUI();
  }
});

// Create or Join Room
function createRoom() {
  currentRoom = document.getElementById('roomName').value;
  if (currentRoom) {
    document.getElementById('chatroom').style.display = 'block';
    displayMessages();
  }
}

// Send Message
function sendMessage() {
  const inputText = document.getElementById('inputText').value;
  if (!inputText || !currentRoom) return;

  db.collection('chatrooms')
    .doc(currentRoom)
    .collection('messages')
    .add({
      text: inputText,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      user: auth.currentUser.email
    });

  document.getElementById('inputText').value = '';
}

// Display Messages
function displayMessages() {
  const messagesDiv = document.getElementById('messages');
  messagesDiv.innerHTML = '';

  db.collection('chatrooms')
    .doc(currentRoom)
    .collection('messages')
    .orderBy('createdAt')
    .onSnapshot(snapshot => {
      messagesDiv.innerHTML = '';
      snapshot.forEach(doc => {
        const data = doc.data();
        const message = `
          <div class="message">
            <strong>${data.user}:</strong> ${data.text}
          </div>`;
        messagesDiv.innerHTML += message;
      });
    });
}
