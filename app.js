const examRoutes = {
  "khaing thinzar aung": "Khaing/index.html",
  "su kabyar": "Su/index.html",
  "nyein min thu": "Nyein/index.html",
  "Htun Mya": "Htun Mya/index.html"
};

// Normalize names consistently
function normalizeName(name) {
  return name.trim().replace(/\s+/g, " ").toLowerCase();
}

const form = document.getElementById("examForm");
const nameInput = document.getElementById("studentName");
const message = document.getElementById("message");

// Normalize all registered names before looking them up
const normalizedRoutes = {};

for (const [name, destination] of Object.entries(examRoutes)) {
  normalizedRoutes[normalizeName(name)] = destination;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const enteredName = normalizeName(nameInput.value);
  const destination = normalizedRoutes[enteredName];

  if (!destination) {
    message.textContent =
      "Name not recognized. Please check your full name and try again.";
    message.className = "message error";
    console.log("Entered name:", JSON.stringify(enteredName));
    console.log("Registered names:", Object.keys(normalizedRoutes));
    return;
  }

  message.textContent = "Opening your exam...";
  message.className = "message";

  window.location.href = destination;
});
