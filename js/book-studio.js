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

    if (!isValid && firstInvalid) {
      firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // Now submit the form to backend
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // 👉 Special handling for checkboxes with multiple selections
    const equipment = [];
    form
      .querySelectorAll('input[name="equipment"]:checked')
      .forEach((checkbox) => {
        equipment.push(checkbox.value);
      });

    const support = [];
    form
      .querySelectorAll('input[name="support"]:checked')
      .forEach((checkbox) => {
        support.push(checkbox.value);
      });

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
            tier: data.tier,
            studio: data.studio,
            contentType: data.contentType,
            contentOther: data.contentOther,
            peopleCount: data.peopleCount,
            ownModel: data.ownModel,
            model: data.model,
            equipment: equipment,
            support: support,
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
