// Check if the user is logged in
if (localStorage.getItem("username")) {
    showChatForm();
  } else {
    showLoginForm();
  }
  
  // Show login form
  function showLoginForm() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("chatForm").style.display = "none";
  }
  
  // Show chat form
  function showChatForm() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("chatForm").style.display = "block";
    document.getElementById("message").focus();
  }
  
  // Get username from login form and store it in local storage
  document.querySelector("#loginForm form").addEventListener("submit", function(e) {
    e.preventDefault();
    var username = document.getElementById("username").value;
    localStorage.setItem("username", username);
    showChatForm();
  });
  
  // Send message
  document.querySelector("#chatForm form").addEventListener("submit", function(e) {
    e.preventDefault();
    var message = document.getElementById("message").value;
    var username = localStorage.getItem("username");
    storeMessage(username, message);
    document.getElementById("message").value = "";
  });
  
  // Store message in the file with sender's username
  function storeMessage(username, message) {
    var chatMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    chatMessages.push({ username: username, message: message });
    localStorage.setItem("chatMessages", JSON.stringify(chatMessages));
    displayChatMessage(username, message);
  }
  
  // Display chat message with sender's username
  function displayChatMessage(username, message) {
    var chatMessages = document.getElementById("chatMessages");
    var messageDiv = document.createElement("div");
    messageDiv.innerText = username + ": " + message;
    chatMessages.appendChild(messageDiv);
  }
  
  // Read and display existing chat messages from local storage
  function displayExistingChatMessages() {
    var chatMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    for (var i = 0; i < chatMessages.length; i++) {
      displayChatMessage(chatMessages[i].username, chatMessages[i].message);
    }
  }
  
  displayExistingChatMessages();
  