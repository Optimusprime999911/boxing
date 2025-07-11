document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Load theme from localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    body.classList.toggle("light", savedTheme === "light");
  }

  // Toggle theme and save preference
  toggle.addEventListener("click", () => {
    const isLight = body.classList.toggle("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });

  // Sticky header shadow on scroll
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Animate sections on scroll (fade in)
  const sections = document.querySelectorAll(".section");
  const observerOptions = {
    threshold: 0.1,
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);
  sections.forEach((sec) => observer.observe(sec));

  // Countdown Timer for Tyson Fury vs Oleksandr Usyk
  const countdownEl = document.getElementById("countdown");
  // Let's say fight is on Aug 30, 2025 20:00 UTC for demo:
  const fightDate = new Date("2025-08-30T20:00:00Z").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = fightDate - now;

    if (distance < 0) {
      countdownEl.textContent = "Fight started!";
      clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);

  // Modal Video popup logic
  const openBtn = document.getElementById("open-video");
  const modal = document.getElementById("video-modal");
  const closeBtn = document.getElementById("close-video");

  openBtn.addEventListener("click", () => {
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // prevent background scroll
  });

  closeBtn.addEventListener("click", () => {
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    // Stop the video playback by resetting iframe src
    const iframe = modal.querySelector("iframe");
    iframe.src = iframe.src;
  });

  // Close modal on outside click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeBtn.click();
    }
  });

  // Keyboard navigation for modal close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
      closeBtn.click();
    }
  });
});
