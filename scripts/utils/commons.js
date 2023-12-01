// DOM elements creation with type of tag, table of attributes, and textContent
function createDOMElement(tag, attributes = {}, textContent) {
    // Tag
    const element = document.createElement(tag);

    // Attributes
    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }

    // Text
    if (textContent) {
        element.textContent = textContent;
    }

    return element;
}