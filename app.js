const examRoutes = {
  "khaing thinzar aung": "Khaing/index.html",
  "su kabyar": "Su/index.html",
  "nyein min thu": "Nyein/index.html",
  "Htun Mya":"Htun Mya/index.html"
};

const form = document.getElementById("examForm");
const nameInput = document.getElementById("studentName");
const message = document.getElementById("message");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const enteredName = nameInput.value.trim().replace(/\s+/g, " ").toLowerCase();
  const destination = examRoutes[enteredName];

  if (!destination) {
    message.textContent = "Name not recognized. Please check your full name and try again.";
    message.className = "message error";
    return;
  }

  // Navigate to the student's exam folder relative to this homepage.
  window.location.href = destination;
});
