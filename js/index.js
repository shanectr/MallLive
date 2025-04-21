function toggleMobileMenu() {
  const nav = document.querySelector(".nav-menu");
  nav.classList.toggle("mobile-visible");
}

// Only show the home icon if we're not on the homepage
const isHomepage =
  location.pathname.endsWith("index.html") || location.pathname === "/";
const homeIcon = document.querySelector(".home-icon");
if (homeIcon && isHomepage) {
  homeIcon.style.display = "none";
}
