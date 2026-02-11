import "./style.css";

// Footer year
document.querySelectorAll("#year").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// Donate buttons
function goDonatePage() {
  window.location.href = "donate.html";
}

["heroDonateBtn", "donateTopBtn", "ctaDonateBtn", "getInvolvedDonateBtn"].forEach((id) => {
  document.getElementById(id)?.addEventListener("click", goDonatePage);
});

// Hero focus selection (index only)
const causeButtons = document.querySelectorAll(".cause");
const selectedNote = document.getElementById("selectedNote");

causeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    causeButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const cause = btn.dataset.cause;
    if (selectedNote) selectedNote.textContent = cause ? `Selected focus: ${cause}` : "";
  });
});

// Simple on-page search (Ctrl/Cmd + K)
const searchBtn = document.getElementById("searchBtn");
function doSearch() {
  const q = prompt("Search this page:");
  if (!q) return;
  const text = q.trim().toLowerCase();

  const target = Array.from(document.querySelectorAll("h1, h2, h3, p, a")).find((el) =>
    (el.textContent || "").toLowerCase().includes(text)
  );

  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  else alert("No matches found on this page.");
}
searchBtn?.addEventListener("click", doSearch);
window.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    doSearch();
  }
});

// Donation page logic
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
  if (message) {
    message.textContent = `Next step: redirect to secure payment for N$ ${selectedAmount} (PayToday/DPO).`;
  }
});
