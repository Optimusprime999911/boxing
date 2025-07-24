document.addEventListener("DOMContentLoaded", () => {
  // Theme toggle
  const themeToggle = document.getElementById("theme-toggle");
  if (localStorage.getItem("theme") === "light") document.body.classList.add("light");
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));

  // Sticky header shadow
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 50));

  // Fade‑in sections on scroll
  document.querySelectorAll(".section").forEach(sec => sec.classList.add("hidden"));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
  }, { threshold: 0.1 });
  document.querySelectorAll(".section").forEach(sec => observer.observe(sec));

  // Countdown timer
  const countdownEl = document.getElementById("countdown");
  const fightDate = new Date("2025-08-30T20:00:00Z").getTime();
  function updateCountdown() {
    const d = fightDate - Date.now();
    if (d < 0) { countdownEl.textContent = "Fight started!"; return; }
    const days = Math.floor(d/(1000*60*60*24));
    const hours = Math.floor((d%(1000*60*60*24))/(1000*60*60));
    const mins = Math.floor((d%(1000*60*60))/(1000*60));
    const secs = Math.floor((d%(1000*60))/1000);
    countdownEl.textContent = `${days}d ${hours}h ${mins}m ${secs}s`;
  }
  updateCountdown(); setInterval(updateCountdown, 1000);

  // Video modal
  const openBtn = document.getElementById("open-video");
  const modal = document.getElementById("video-modal");
  const closeBtn = document.getElementById("close-video");
  openBtn?.addEventListener("click", () => {
    modal.style.display = "flex"; document.body.style.overflow = "hidden";
  });
  closeBtn?.addEventListener("click", () => {
    modal.style.display = "none"; document.body.style.overflow = "";
    const iframe = modal.querySelector("iframe"); iframe.src = iframe.src;
  });
  modal?.addEventListener("click", e => { if (e.target === modal) closeBtn.click(); });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.style.display === "flex") closeBtn.click();
  });
});
