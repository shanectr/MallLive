document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", async function (e) {
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

    // Collect form data
    const formData = new FormData(form);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      questions: formData.get("questions"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send form");
      }

      showConfirmation();
    } catch (error) {
      console.error(error);
      alert("There was a problem submitting your message. Please try again.");
    }
  });

  // Confirmation popup
  function showConfirmation() {
    const popup = document.createElement("div");
    popup.classList.add("confirmation-popup");
    popup.innerHTML = `
        <div class="popup-inner">
          <h2>Thank you!</h2>
          <p>Our team will get back to you shortly.</p>
          <button class="close-popup">Return to Home</button>
        </div>
      `;
    document.body.appendChild(popup);

    document
      .querySelector(".close-popup")
      .addEventListener("click", () => (window.location.href = "index.html"));
  }
});

// Mobile menu toggle
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
