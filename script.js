let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

// Text-to-Speech Function
function speak(text) {
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.volume = 1;
  text_speak.lang = "en-GB"; // Changed from "hi-GB" to "en-GB"
  window.speechSynthesis.speak(text_speak);
}

// Wish the User Based on Time
function wishMe() {
  let hours = new Date().getHours();
  if (hours < 12) {
    speak("Good Morning Sir");
  } else if (hours < 16) {
    speak("Good Afternoon Sir");
  } else {
    speak("Good Evening Sir");
  }
}

// Speech Recognition
let speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();
recognition.continuous = false;
recognition.interimResults = false;

recognition.onresult = (event) => {
  let transcript = event.results[0][0].transcript.toLowerCase();
  content.innerText = transcript;
  takeCommand(transcript);
};

recognition.onerror = () => {
  speak("Sorry, I didn't catch that. Could you please repeat?");
};

// Start Listening When the Button is Clicked
btn.addEventListener("click", () => {
  recognition.start();
  voice.style.display = "block";
  btn.style.display = "none";
});

// Stop Listening
voice.addEventListener("click", () => {
  recognition.stop();
  voice.style.display = "none";
  btn.style.display = "flex";
});

// Command Handling
function takeCommand(message) {
  voice.style.display = "none";
  btn.style.display = "flex";

  if (message.includes("hello") || message.includes("hey")) {
    speak("Hello Sumayya Fazal, how can I help you?");
  } else if (message.includes("who are you")) {
    speak("I am your virtual assistant, my name is Saym.");
  } else if (message.includes("say thanks to my teacher")) {
    speak("Thanks to Sumayya's teachers Sir Zia, Sir Ameen Alam, & Sir Ali Jawad.");
  } else if (message.includes("who are my teachers")) {
    speak("Your teachers are Sir Zia and Sir Ameen Alam.");
  } else if (message.includes("who are my friends")) {
    speak("Your friends are Annie Shah and Ameer Hamza.");
  } else if (message.includes("open youtube")) {
    speak("Opening YouTube...");
    window.open("https://youtube.com/", "_blank");
  } else if (message.includes("open google")) {
    speak("Opening Google...");
    window.open("https://google.com/", "_blank");
  } else if (message.includes("search for")) {
    let query = message.replace("search for", "").trim();
    if (query) {
      speak(`Searching Google for ${query}...`);
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
    } else {
      speak("Please specify what you want to search for.");
    }
  } else if (message.includes("open facebook")) {
    speak("Opening Facebook...");
    window.open("https://facebook.com/", "_blank");
  } else if (message.includes("open instagram")) {
    speak("Opening Instagram...");
    window.open("https://instagram.com/", "_blank");
  } else if (message.includes("open calculator")) {
    speak("Opening Calculator...");
    window.open("Calculator://");
  } else if (message.includes("open whatsapp")) {
    speak("Opening WhatsApp...");
    window.open("https://web.whatsapp.com/", "_blank");
  } else if (message.includes("time")) {
    let time = new Date().toLocaleTimeString();
    speak(`The time is ${time}`);
  } else if (message.includes("date")) {
    let date = new Date().toLocaleDateString();
    speak(`Today's date is ${date}`);
  } else if (message.includes("play my favorite song")) {
    speak("Playing your favorite song...");
    window.open("https://www.youtube.com/watch?v=K7o9fUEP3GU", "_blank");
  } else if (message.match(/\d+\s*[\+\-\*\/]\s*\d+/)) {
    // Handle mathematical operations
    let result = eval(message.match(/\d+\s*[\+\-\*\/]\s*\d+/)[0]);
    speak(`The result is ${result}`);
  } else {
    speak("Sorry, I didn't understand that. Can you please repeat?");
  }
}

// Initial Wish
window.addEventListener("load", wishMe);
