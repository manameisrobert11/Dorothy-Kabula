import "./style.css";

// Year in footer
document.querySelectorAll("#year").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// Nav/Hero donate buttons => go to donate page
const heroDonateBtn = document.getElementById("heroDonateBtn");
const donateTopBtn = document.getElementById("donateTopBtn");

function goDonatePage() {
  window.location.href = "donate.html";
}

heroDonateBtn?.addEventListener("click", goDonatePage);
donateTopBtn?.addEventListener("click", goDonatePage);

// Hero cause circle selection (only exists on index)
const causeButtons = document.querySelectorAll(".cause");
const selectedNote = document.getElementById("selectedNote");

causeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    causeButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const cause = btn.dataset.cause;
    if (selectedNote) selectedNote.textContent = cause ? `Selected cause: ${cause}` : "";
  });
});

// Donation page logic (only runs if elements exist)
const buttons = document.querySelectorAll(".amount-btn");
const customAmount = document.getElementById("customAmount");
const donateBtn = document.getElementById("donateBtn");
const message = document.getElementById("message");

let selectedAmount = null;

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    selectedAmount = Number(btn.dataset.amount);
    if (customAmount) customAmount.value = "";
    if (message) message.textContent = `Selected amount: N$ ${selectedAmount}`;
  });
});

customAmount?.addEventListener("input", () => {
  buttons.forEach((b) => b.classList.remove("active"));
  selectedAmount = Number(customAmount.value);
  if (message) message.textContent = selectedAmount > 0 ? `Custom amount: N$ ${selectedAmount}` : "";
});

donateBtn?.addEventListener("click", () => {
  if (!selectedAmount || selectedAmount <= 0) {
    if (message) message.textContent = "Please select an amount (or enter a custom amount).";
    return;
  }

  // Next step: connect a backend endpoint for PayToday/DPO
  if (message) message.textContent = `Next step: redirect to secure payment for N$ ${selectedAmount} (PayToday/DPO).`;
});
