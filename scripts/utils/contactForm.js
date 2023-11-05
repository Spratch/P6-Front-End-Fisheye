// DOM
const body = document.getElementById("body");
const modal = document.getElementById("contact_modal");
const main = document.getElementById("main");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const modalOpenBtn = document.getElementById("modalOpenBtn");
const contactForm = document.getElementById("contact_form");
const first = document.getElementById("first-name");
const last = document.getElementById("last-name");
const email = document.getElementById("email");
const message = document.getElementById("message");

// Open modal
function displayModal() {
    main.setAttribute("aria-hidden", "true"); // Hide main content for Assistive Technologies
    modal.setAttribute("aria-hidden", "false"); // Show modal for AT
    body.style.overflow = "hidden"; // Prevent scrolling
    modal.style.display = "flex"; // Show modal
    modalCloseBtn.focus(); // Focus on close button
}

// Close modal
function closeModal() {
    main.setAttribute("aria-hidden", "false"); // Hide main content for Assistive Technologies
    modal.setAttribute("aria-hidden", "true"); // Show modal for AT
    body.style.overflow = "auto"; // Prevent scrolling
	modal.style.display = "none"; // Show modal
    modalOpenBtn.focus(); // Focus on close button
}

// Press Escape to close modal
document.addEventListener('keydown', e => {
    // Convert aria-hidden to boolean
    let isHidden = modal.getAttribute("aria-hidden");
    isHidden = isHidden.toLowerCase() === "true";

    if (!isHidden && (e.key === "Escape" || e.code === 27)){
      closeModal();
    }
  });

function submitForm() {
    // Color invalid inputs
    contactForm.classList.add("submitted");

    // Submit datas
    let formDatas = {
        firstName: first.value,
        lastName: last.value,
        email: email.value,
        message: message.value
    }
    console.log(formDatas);
}

contactForm.addEventListener("submit", (event) => {
    // prevent default
    event.preventDefault();
});