document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("studio-booking-form");

  // Prefill studio from URL (if needed again later)
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

  // Helper: Get legend associated with an input group
  function getLegendForInput(input) {
    let fieldset = input.closest("fieldset");
    return fieldset ? fieldset.querySelector("legend") : null;
  }

  form.addEventListener("submit", async function (e) {
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

    // Validate required fields
    const requiredFields = form.querySelectorAll("[required]");
    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        field.classList.add("error-highlight");
        if (!firstInvalid) firstInvalid = field;
        isValid = false;
      }
    });

    // Grouped radio questions
    const radioGroups = ["sellOnTikTok", "liveExperience"];
    radioGroups.forEach((groupName) => {
      const group = form.querySelectorAll(`input[name="${groupName}"]`);
      const legend = getLegendForInput(group[0]);
      const isChecked = Array.from(group).some((input) => input.checked);
      if (!isChecked && legend) {
        legend.classList.add("error-legend");
        if (!firstInvalid) firstInvalid = legend;
        isValid = false;
      }
    });

    if (!isValid && firstInvalid) {
      firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(
        "https://malllive-backend.vercel.app/api/book-studio",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            brandName: data.brandName,
            productDescription: data.productDescription,
            sellOnTikTok: data.sellOnTikTok,
            liveExperience: data.liveExperience,
            notes: data.notes,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      showConfirmation();
    } catch (error) {
      console.error(error);
      alert("There was a problem submitting the form. Please try again.");
    }
  });

  // Confirmation popup
  function showConfirmation() {
    const popup = document.createElement("div");
    popup.classList.add("confirmation-popup");
    popup.innerHTML = `
      <div class="popup-inner">
        <h2>Thank you!</h2>
        <p>Your interest form has been submitted successfully. You will recieve a confirmation email shortly.</p>
        <button class="close-popup">Return to Home</button>
      </div>
    `;
    document.body.appendChild(popup);
    document.querySelector(".close-popup").addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
});

// Mobile nav
function toggleMobileMenu() {
  const nav = document.querySelector(".nav-menu");
  nav.classList.toggle("mobile-visible");
}

const isHomepage =
  location.pathname.endsWith("index.html") || location.pathname === "/";
const homeIcon = document.querySelector(".home-icon");
if (homeIcon && isHomepage) {
  homeIcon.style.display = "none";
}
