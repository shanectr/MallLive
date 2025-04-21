document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;
    let firstInvalid = null;

    // Clear previous highlights
    form
      .querySelectorAll(".error-highlight")
      .forEach((el) => el.classList.remove("error-highlight"));

    // Validate all required fields
    const requiredFields = form.querySelectorAll("[required]");
    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        field.classList.add("error-highlight");
        if (!firstInvalid) firstInvalid = field;
        isValid = false;
      }
    });

    if (!isValid && firstInvalid) {
      firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // Form is valid — show confirmation popup
    showConfirmation();
  });

  // Confirmation popup
  function showConfirmation() {
    const popup = document.createElement("div");
    popup.classList.add("confirmation-popup");
    popup.innerHTML = `
        <div class="popup-inner">
          <h2>Thank you!</h2>
          <p>Your message has been sent successfully.</p>
          <button class="close-popup">Return to Home</button>
        </div>
      `;
    document.body.appendChild(popup);

    document
      .querySelector(".close-popup")
      .addEventListener("click", () => (window.location.href = "index.html"));
  }
});

// Mobile Menu Toggle
function toggleMobileMenu() {
  const nav = document.querySelector(".nav-menu");
  nav.classList.toggle("mobile-visible");
}

// Hide home icon on homepage
const isHomepage =
  location.pathname.endsWith("index.html") || location.pathname === "/";
const homeIcon = document.querySelector(".home-icon");
if (homeIcon && isHomepage) {
  homeIcon.style.display = "none";
}
