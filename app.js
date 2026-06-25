const chatBox = document.getElementById("chatBox");
const input = document.getElementById("input");

document.getElementById("aiBtn").addEventListener("click", () => {
  chatBox.innerHTML = "AI mode activated 🔥";
});

document.getElementById("projectBtn").addEventListener("click", () => {
  chatBox.innerHTML = "Projects: AI Chatbot, Portfolio Website, Node API";
});

document.getElementById("sendBtn").addEventListener("click", async () => {
  const message = input.value;

  chatBox.innerHTML += `<p><b>You:</b> ${message}</p>`;

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  const data = await res.json();

  chatBox.innerHTML += `<p><b>AI:</b> ${data.reply}</p>`;
  input.value = "";
});
// safe navigation helper
function go(page) {
  window.location.href = "./" + page;
}

// dashboard widget fix (removes "Loading..." issue)
window.onload = () => {
  const widget = document.getElementById("widget");
  if (widget) {
    widget.innerHTML = "Dashboard Loaded Successfully 🚀";
  }
};