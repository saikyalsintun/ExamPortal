/*
 * Chinese Exam Portal routing
 * Keep this file in the same folder as the portal index.html.
 *
 * IMPORTANT: The folder names below must match your real folder names.
 */
const examRoutes = {
  "khaing thinzar aung": "Khaing/index.html",
  "su kabyar": "Su/index.html",
  "nyein min thu": "Nyein/index.html",
  "htun mya": "Htun%20Mya/index.html"
};

function normalizeName(name) {
  return String(name ?? "")
    .normalize("NFKC")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .trim()
    .replace(/\s+/g, " ")
    .toLocaleLowerCase("en");
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("examForm");
  const nameInput = document.getElementById("studentName");
  const message = document.getElementById("message");

  if (!form || !nameInput || !message) {
    console.error("Portal setup error: required HTML element is missing.", {
      examFormFound: Boolean(form),
      studentNameFound: Boolean(nameInput),
      messageFound: Boolean(message)
    });
    return;
  }

  // Normalize the route keys too, so key casing cannot cause a mismatch.
  const normalizedRoutes = Object.create(null);
  for (const [registeredName, destination] of Object.entries(examRoutes)) {
    normalizedRoutes[normalizeName(registeredName)] = destination;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const enteredName = normalizeName(nameInput.value);
    const destination = normalizedRoutes[enteredName];

    if (!destination) {
      message.textContent =
        "Name not recognized. Check the spelling of your registered full name and try again.";
      message.className = "message error";
      console.warn("Exam portal name mismatch.", {
        normalizedEnteredName: enteredName,
        registeredNames: Object.keys(normalizedRoutes)
      });
      nameInput.focus();
      nameInput.select();
      return;
    }

    message.textContent = "Opening your exam...";
    message.className = "message success";

    // Relative paths are resolved from the portal's current folder.
    window.location.assign(destination);
  });
});
