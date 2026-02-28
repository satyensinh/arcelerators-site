(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Theme
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") {
    root.setAttribute("data-theme", saved);
  } else {
    root.setAttribute("data-theme", "dark");
  }

  themeToggle?.addEventListener("click", () => {
    const cur = root.getAttribute("data-theme") || "dark";
    const next = cur === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  // Mobile nav
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  navToggle?.addEventListener("click", () => {
    const open = navLinks?.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // Close mobile menu when clicking a link
  navLinks?.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });

  // Contact form -> mailto draft
  const contactForm = document.getElementById("contactForm");
  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const fullName = document.getElementById("fullName")?.value?.trim();
    const companyEmail = document.getElementById("companyEmail")?.value?.trim();
    const projectType = document.getElementById("projectType")?.value?.trim();
    const budgetRange = document.getElementById("budgetRange")?.value?.trim();
    const timeline = document.getElementById("timeline")?.value?.trim();
    const projectDetails = document.getElementById("projectDetails")?.value?.trim();
    const consent = document.getElementById("consent")?.checked;

    if (!fullName || !companyEmail || !projectType || !budgetRange || !timeline || !projectDetails) {
      alert("Please complete all required fields.");
      return;
    }

    if (!consent) {
      alert("Please provide consent to be contacted by Arcelerators.");
      return;
    }

    const subject = encodeURIComponent(`Project Inquiry: ${projectType}`);
    const body = encodeURIComponent(
      [
        "New project inquiry",
        "",
        `Full Name: ${fullName}`,
        `Company Email: ${companyEmail}`,
        `Project Type: ${projectType}`,
        `Budget Range (USD): ${budgetRange}`,
        `Timeline: ${timeline}`,
        "",
        "Project Details:",
        projectDetails,
        "",
        "Consent:",
        "I consent to be contacted by Arcelerators",
      ].join("\n")
    );

    window.location.href = `mailto:arcelerators@gmail.com?subject=${subject}&body=${body}`;
  });
})();
