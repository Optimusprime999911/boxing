document.addEventListener("DOMContentLoaded", () => {
  // Theme toggle
  const themeToggle = document.getElementById("theme-toggle");
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
  }
  themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  // Sticky header shadow
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
  });

  // Countdown Timer
  const countdownEl = document.getElementById("countdown");
  const fightDate = new Date("2025-08-30T20:00:00Z").getTime();
  function updateCountdown() {
    const now = Date.now();
    const distance = fightDate - now;
    if (distance < 0) {
      countdownEl.textContent = "Fight started!";
      return;
    }
    const days = Math.floor(distance / (1000*60*60*24));
    const hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
    const mins = Math.floor((distance % (1000*60*60)) / (1000*60));
    const secs = Math.floor((distance % (1000*60)) / 1000);
    countdownEl.textContent = `${days}d ${hours}h ${mins}m ${secs}s`;
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Video Modal Logic
  const openBtn = document.getElementById("open-video");
  const modal = document.getElementById("video-modal");
  const closeBtn = document.getElementById("close-video");

  if (openBtn && modal && closeBtn) {
    openBtn.addEventListener("click", () => {
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
    closeBtn.addEventListener("click", () => {
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      const iframe = modal.querySelector("iframe");
      iframe.src = iframe.src;
    });
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeBtn.click();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
        closeBtn.click();
      }
    });
  }
});
