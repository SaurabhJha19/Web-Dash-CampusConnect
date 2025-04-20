const auth = firebase.auth();
const db = firebase.firestore();

let currentUser = null;
let currentChatId = null;
let currentChatPartner = null;

document.addEventListener("DOMContentLoaded", () => {
  auth.onAuthStateChanged(user => {
    if (!user) {
      window.location.href = "login.html";
    } else {
      currentUser = user;
      loadChatList();
    }
  });
});

// Load all chats where the user is a participant
function loadChatList() {
  db.collection("chats").where("users", "array-contains", currentUser.uid)
    .onSnapshot(snapshot => {
      const chatList = document.getElementById("chatList");
      chatList.innerHTML = "";

      snapshot.forEach(doc => {
        const chatId = doc.id;
        const users = doc.data().users;
        const partnerId = users.find(id => id !== currentUser.uid);

        const chatItem = document.createElement("div");
        chatItem.textContent = `Chat with ${partnerId}`;
        chatItem.onclick = () => openChat(chatId, partnerId);
        chatList.appendChild(chatItem);
      });
    });
}

// Start a new chat or open existing one
async function startChat() {
  const input = document.getElementById("startChatInput");
  let receiver = input.value.trim();
  input.value = "";

  if (!receiver || receiver === currentUser.uid) {
    alert("Enter a valid user UID or email (not your own).");
    return;
  }

  // If it's an email, fetch UID
  if (receiver.includes("@")) {
    const snapshot = await db.collection("users").where("email", "==", receiver).get();
    if (snapshot.empty) {
      alert("No user found with this email.");
      return;
    }
    receiver = snapshot.docs[0].id;
  }

  const ids = [currentUser.uid, receiver].sort();
  const chatId = ids.join("_");

  const chatRef = db.collection("chats").doc(chatId);
  const chatDoc = await chatRef.get();
  if (!chatDoc.exists) {
    await chatRef.set({ users: ids });
  }

  openChat(chatId, receiver);
}

// Load messages for selected chat
function openChat(chatId, partnerId) {
  currentChatId = chatId;
  currentChatPartner = partnerId;
  document.getElementById("chatWindow").style.display = "flex";
  document.getElementById("chatHeader").textContent = `Chat with ${partnerId}`;
  const messagesContainer = document.getElementById("messages");
  messagesContainer.innerHTML = "";

  db.collection("chats").doc(chatId).collection("messages")
    .orderBy("timestamp")
    .onSnapshot(snapshot => {
      messagesContainer.innerHTML = "";
      snapshot.forEach(doc => {
        const msg = doc.data();
        const msgDiv = document.createElement("div");
        msgDiv.className = "message";
        msgDiv.textContent = msg.text;
        if (msg.senderId === currentUser.uid) msgDiv.classList.add("self");
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      });
    });
}

// Send a message
function sendMessage() {
  const input = document.getElementById("messageInput");
  const text = input.value.trim();
  if (!text || !currentChatId) return;

  db.collection("chats").doc(currentChatId).collection("messages").add({
    senderId: currentUser.uid,
    text: text,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });

  input.value = "";
}
