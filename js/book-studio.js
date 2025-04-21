document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("studio-booking-form");

  // Prefill studio from URL
  const urlParams = new URLSearchParams(window.location.search);
  const prefilledStudio = urlParams.get("studio");
  if (prefilledStudio) {
    const studioRadios = document.querySelectorAll('input[name="studio"]');
    studioRadios.forEach((radio) => {
      if (radio.value === prefilledStudio) {
        radio.checked = true;
      }
    });
  }

  // Helper: Check if group has an answer (radio/checkbox group)
  function isGroupAnswered(name) {
    const inputs = form.querySelectorAll(`input[name="${name}"]`);
    return Array.from(inputs).some((input) => input.checked);
  }

  // Helper: Get legend associated with an input group
  function getLegendForInput(input) {
    let fieldset = input.closest("fieldset");
    return fieldset ? fieldset.querySelector("legend") : null;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;
    let firstInvalid = null;

    // Clear previous error styles
    form.querySelectorAll(".error-highlight").forEach((el) => {
      el.classList.remove("error-highlight");
    });
    form.querySelectorAll(".error-legend").forEach((el) => {
      el.classList.remove("error-legend");
    });

    // Validate required individual fields
    const requiredFields = form.querySelectorAll("[required]");
    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        field.classList.add("error-highlight");
        if (!firstInvalid) firstInvalid = field;
        isValid = false;
      }
    });

    // Validate grouped fields (radio/checkbox sections)
    const groupFields = ["tier", "studio", "contentType", "ownModel", "model"];
    groupFields.forEach((groupName) => {
      const input = form.querySelector(`input[name="${groupName}"]`);
      const legend = getLegendForInput(input);
      if (!isGroupAnswered(groupName) && legend) {
        legend.classList.add("error-legend");
        if (!firstInvalid) firstInvalid = legend;
        isValid = false;
      }
    });

    // Scroll to first invalid field if any
    if (!isValid && firstInvalid) {
      firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // Submit the form (you can replace this with real API logic)
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Example: show confirmation popup
    showConfirmation();
  });

  // Confirmation popup display
  function showConfirmation() {
    const popup = document.createElement("div");
    popup.classList.add("confirmation-popup");
    popup.innerHTML = `
      <div class="popup-inner">
        <h2>Thank you!</h2>
        <p>Your booking request has been submitted successfully.</p>
        <button class="close-popup">Return to Home</button>
      </div>
    `;
    document.body.appendChild(popup);
    document.querySelector(".close-popup").addEventListener("click", () => {
      window.location.href = "index.html";
    });
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
