const predefinedResponses = {
    "1": "Please provide the date and time for your appointment.",
    "2": "Please state your doubt so the professor can assist you.",
    "3": "Please provide the date and time of the appointment you wish to cancel.",
    "success": "Your request has been successfully processed. Would you like to start a new chat? (yes/no)",
    "yes": "Starting a new chat. Here are your options again:",
    "no": "Thank you for using ProfsAssist! Goodbye.",
    "default": "Sorry, I don't understand that. Please choose an option using the buttons."
};

let currentFlow = null;

// Function to append a new message to the chat
function appendMessage(message, className) {
    const chatBody = document.getElementById("chatBody");
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message", className);
    messageElement.innerText = message;
    chatBody.appendChild(messageElement);
    chatBody.scrollTop = chatBody.scrollHeight; // Auto scroll to the bottom
}

// Function to show buttons
function showButtons() {
    const chatFooter = document.getElementById("chatFooter");
    chatFooter.innerHTML = `
        <div class="chat-buttons">
            <button class="chat-button" onclick="handleOption(1)">Book Appointment</button>
            <button class="chat-button" onclick="handleOption(2)">Solve a Doubt</button>
            <button class="chat-button" onclick="handleOption(3)">Cancel Appointment</button>
        </div>
    `;
}

// Handle button click
function handleOption(option) {
    const userMessage = option.toString();
    appendMessage(userMessage, "user-message"); // Corrected the parameter

    currentFlow = userMessage;
    let botResponse = predefinedResponses[userMessage] || predefinedResponses["default"];

    setTimeout(() => {
        appendMessage(botResponse, "bot-message");

        // If success, show option to start new chat
        if (botResponse === predefinedResponses["success"]) {
            setTimeout(showButtons, 1000);
        }
    }, 500);
}

// Function to handle sending a message
function sendMessage() {
    const chatInput = document.getElementById("chatInput");
    const userMessage = chatInput.value.trim().toLowerCase();

    if (userMessage) {
        // Append user's message
        appendMessage(userMessage, "user-message");

        // Handle flow logic
        let botResponse = predefinedResponses["default"];
        if (currentFlow !== null) {
            botResponse = predefinedResponses["success"];
            currentFlow = null;
        }

        setTimeout(() => {
            appendMessage(botResponse, "bot-message");

            // Reset chat options
            if (botResponse === predefinedResponses["success"]) {
                showButtons();
            }
        }, 500);

        chatInput.value = ""; // Clear input
    }
}

// Start chat with intro and options
window.onload = () => {
    appendMessage("Hello, I am Ana, your ProfsAssist chatbot. How can I help you today?", "bot-message");
    showButtons(); // Show the buttons for options
};
