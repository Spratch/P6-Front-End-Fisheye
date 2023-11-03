// DOM
const body = document.getElementById("body");
const modal = document.getElementById("contact_modal");
const main = document.getElementById("main");
const modalCloseBtn = document.getElementById("contact_button");
const openCloseBtn = document.getElementById("openCloseBtn");

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
    openCloseBtn.focus(); // Focus on close button
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

// function submitForm() {
//     console.log();
// }