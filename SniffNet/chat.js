

const friends = {
    Lamy: {
      name: "Lamy",
      avatar: "assets/friends/Lamy.jpg",
      online: true,
      reply: "I'm eating my Gulu sauce right now! I'll get back to you later!"
    },
  
    Pico: {
      name: "Pico",
      avatar: "assets/friends/Pico.jpg",
      online: true,
      reply: "I'll get back to you as soon as I'm done playing with my little mouse toy!"
    },
  
    McDull: {
      name: "McDull",
      avatar: "assets/friends/McDull.jpg",
      online: false,
      reply: "Sleeping right now. Maybe I'll reply when I wake up... if I feel like it."
    },
  
    Ocean: {
      name: "Ocean",
      avatar: "assets/friends/Ocean.jpg",
      online: false,
      reply: "Just five more hours of sleep..."
    }
  };

  const params = new URLSearchParams(window.location.search);
  const requestedFriend = params.get("friend");
  
  const friendKey = Object.keys(friends).find(
    name => name.toLowerCase() ===
      (requestedFriend || "").toLowerCase()
  );
  
  const friend = friends[friendKey] || null;

  const friendAvatar = document.getElementById("friend-avatar");
  const friendName = document.getElementById("friend-name");
  const friendStatus = document.getElementById("friend-status");
  const friendStatusDot = document.getElementById("friend-status-dot");
  
  const chatMessages = document.getElementById("chat-messages");
  const chatForm = document.getElementById("chat-form");
  const messageInput = document.getElementById("message-input");

  const storageKey = `sniffnet-chat-${friendKey || "unknown"}`;
  
  function loadMessages() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
  
      return Array.isArray(saved) ? saved : [];
    } catch (error) {
      return [];
    }
  }
  
  let messages = loadMessages();
  
  function saveMessages() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    } catch (error) {
      console.warn("Chat history could not be saved.", error);
    }
  }

  function createMessageElement(message) {
    const row = document.createElement("div");
  
    const isMine = message.sender === "me";
  
    row.className = `message-row ${isMine ? "mine" : "theirs"}`;
  
    const bubble = document.createElement("div");
    bubble.className = "message-bubble";
    bubble.textContent = message.text;
  
    const meta = document.createElement("div");
    meta.className = "message-meta";
  
    if (isMine) {
        meta.textContent = "Sent";
      } else {
        meta.textContent = "Auto-reply";
      }
  
    row.append(bubble, meta);
  
    return row;
  }
  
  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  function renderMessages() {
    chatMessages.innerHTML = "";
  
    if (messages.length === 0) {
      const empty = document.createElement("div");
      empty.className = "empty-chat";
      empty.innerHTML = "<span>✉</span>Let's chat!";
      chatMessages.append(empty);
      return;
    }
  
    messages.forEach(message => {
      chatMessages.append(createMessageElement(message));
    });
  
    scrollToBottom();
  }
  
  function appendMessage(sender, text) {
    const message = {
      sender,
      text,
      timestamp: Date.now()
    };
  
    messages.push(message);
    saveMessages();
  
    const empty = chatMessages.querySelector(".empty-chat");
    if (empty) empty.remove();
  
    chatMessages.append(createMessageElement(message));
    scrollToBottom();
  }

  if (!friend) {
    document.title = "Messages | SniffNet";
  
    friendName.textContent = "Choose a friend";
    friendStatus.textContent = "No conversation selected";
    friendAvatar.style.display = "none";
    friendStatusDot.style.display = "none";
  
    chatMessages.innerHTML = "";
  
    const notice = document.createElement("div");
    notice.className = "empty-chat";
    notice.textContent = "Please choose a friend from your Friends page.";
  
    chatMessages.append(notice);
  
    messageInput.disabled = true;
    chatForm.querySelector("button").disabled = true;
  
  } else {
    document.title = `${friend.name} | SniffNet Messages`;
  
    friendAvatar.src = friend.avatar;
    friendAvatar.alt = friend.name;
  
    friendName.textContent = friend.name;
    friendStatus.textContent = friend.online ? "Online" : "Offline";
  
    friendStatusDot.classList.add(
      friend.online ? "online" : "offline"
    );
  
    renderMessages();
  }

  chatForm.addEventListener("submit", event => {
    event.preventDefault();
  
    if (!friend) return;
  
    const text = messageInput.value.trim();
  
    if (!text) return;
  
    appendMessage("me", text);
  
    messageInput.value = "";
    messageInput.focus();
  
    setTimeout(() => {
        appendMessage("friend", friend.reply);
    }, 1000);
  });
  