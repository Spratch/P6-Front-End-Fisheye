/* global main, modal, body, modalCloseBtn, disableTabindexForPage, modalOpenBtn, enableTabindexForPage, contactForm, first, last, email, message */

/**
 * Displays the contact modal window and performs necessary UI adjustments like hiding the main content and disabling background scroll.
 */
function displayModal() { // eslint-disable-line no-unused-vars
	main.setAttribute("aria-hidden", "true"); // Hide main content for Assistive Technologies
	modal.setAttribute("aria-hidden", "false"); // Show modal for AT
	body.style.overflow = "hidden"; // Prevent scrolling
	modal.style.display = "flex"; // Show modal
	modalCloseBtn.tabIndex = 0;
	modalCloseBtn.focus(); // Focus on close button
	disableTabindexForPage();
}

/**
 * Closes the contact modal window and restores the UI to its original state, including enabling background scroll.
 */
function closeModal() {
	main.setAttribute("aria-hidden", "false"); // Show main content for Assistive Technologies
	modal.setAttribute("aria-hidden", "true"); // Hide modal for AT
	body.style.overflow = "auto"; // Allow scrolling
	modal.style.display = "none"; // Hide modal
	modalOpenBtn.focus(); // Focus on open button
	enableTabindexForPage();
}

// Press Escape to close modal
document.addEventListener("keydown", e => {
	// Convert aria-hidden to boolean
	let isHidden = modal.getAttribute("aria-hidden");
	isHidden = isHidden.toLowerCase() === "true";

	if (!isHidden && (e.key === "Escape" || e.code === 27)){
		closeModal();
	}
});

/**
 * Submits the form in the console.
 * Called by the HTML submit button in the contact form.
 */
function submitForm() { // eslint-disable-line no-unused-vars
	// Color invalid inputs
	contactForm.classList.add("submitted");

	if (contactForm.checkValidity()) {
		// Submit datas
		let formDatas = {
			firstName: first.value,
			lastName: last.value,
			email: email.value,
			message: message.value
		};
		console.log(formDatas);
	}
}

// Prevents page reload
contactForm.addEventListener("submit", (event) => {
	event.preventDefault();
});