// scripts/script.js

document.addEventListener("DOMContentLoaded", function () {
  const allCards = document.querySelectorAll(".studio-grid .studio-card");
  const featuredArea = document.querySelector("#featured-card");

  allCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Remove "active" class from all cards
      allCards.forEach((c) => c.classList.remove("active"));
      card.classList.add("active");

      // Get the inner elements
      const title = card.querySelector("h3")?.textContent || "";
      const imgEl = card.querySelector("img");
      const imageSrc = imgEl?.getAttribute("src") || "";
      const imageAlt = imgEl?.getAttribute("alt") || "";
      const detailsHTML = card.querySelector("ul")?.innerHTML || "";
      const linkHref =
        card.querySelector(".book-studio-btn")?.getAttribute("href") || "#";

      // Get the color class (red, blue, gold, green)
      const colorClass =
        ["red", "blue", "gold", "green"].find((c) =>
          card.classList.contains(c)
        ) || "";

      // Replace featured card content
      featuredArea.innerHTML = `
        <div class="studio-card ${colorClass}">
          <h3>${title}</h3>
          <img src="${imageSrc}" alt="${imageAlt}" class="studio-img" />
          <ul>${detailsHTML}</ul>
          <a href="${linkHref}" class="book-studio-btn">
            Book This Studio
            <svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path d="M5 3l5 5-5 5" stroke="currentColor" stroke-width="2" fill="none" />
            </svg>
          </a>
        </div>
      `;

      // Smooth scroll to featured area
      featuredArea.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Set initial featured card without scrolling
  if (allCards.length > 0) {
    const firstCard = allCards[0];

    const title = firstCard.querySelector("h3")?.textContent || "";
    const imgEl = firstCard.querySelector("img");
    const imageSrc = imgEl?.getAttribute("src") || "";
    const imageAlt = imgEl?.getAttribute("alt") || "";
    const detailsHTML = firstCard.querySelector("ul")?.innerHTML || "";
    const linkHref =
      firstCard.querySelector(".book-studio-btn")?.getAttribute("href") || "#";

    const colorClass =
      ["red", "blue", "gold", "green"].find((c) =>
        firstCard.classList.contains(c)
      ) || "";

    featuredArea.innerHTML = `
      <div class="studio-card ${colorClass}">
        <h3>${title}</h3>
        <img src="${imageSrc}" alt="${imageAlt}" class="studio-img" />
        <ul>${detailsHTML}</ul>
        <a href="${linkHref}" class="book-studio-btn">
          Book This Studio
          <svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M5 3l5 5-5 5" stroke="currentColor" stroke-width="2" fill="none" />
          </svg>
        </a>
      </div>
    `;

    firstCard.classList.add("active");
  }
});

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
