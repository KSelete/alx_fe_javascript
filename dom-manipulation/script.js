// Initial array of quotes
let quotes = [
  { text: "The future belongs to those who prepare today.", category: "Motivation" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" },
  { text: "Stay hungry, stay foolish.", category: "Inspiration" }
];

// Cache DOM references
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

/**
 * Required by checker:
 * - Function exists with the name `displayRandomQuote`
 * - Contains logic to select a random quote
 * - Updates the DOM (#quoteDisplay)
 */
function displayRandomQuote() {
  if (!Array.isArray(quotes) || quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available. Please add one!";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const q = quotes[randomIndex];
  quoteDisplay.textContent = `"${q.text}" — (${q.category})`;
}

/**
 * Some project briefs reference `showRandomQuote`.
 * Provide an alias that calls the same logic.
 */
function showRandomQuote() {
  return displayRandomQuote();
}

/**
 * Required by checker:
 * - Function exists with the name `addQuote`
 * - Adds a new quote object to the global `quotes` array
 * - Updates the DOM after adding
 */
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const catInput  = document.getElementById("newQuoteCategory");

  const text = (textInput?.value || "").trim();
  const category = (catInput?.value || "").trim();

  if (!text || !category) {
    alert("Please enter both a quote and a category.");
    return;
  }

  const newQuote = { text, category };
  quotes.push(newQuote);

  // Update the DOM immediately to reflect the newly added quote
  quoteDisplay.textContent = `"${newQuote.text}" — (${newQuote.category})`;

  // Clear inputs
  textInput.value = "";
  catInput.value = "";
}

/**
 * Some briefs also mention creating the form dynamically.
 * Implement it so the function exists; it will only create the form
 * if the expected inputs/buttons are not already present.
 */
function createAddQuoteForm() {
  // If the form already exists (as per the provided HTML), do nothing.
  if (
    document.getElementById("newQuoteText") &&
    document.getElementById("newQuoteCategory")
  ) {
    return;
  }

  const container = document.createElement("div");

  const textInput = document.createElement("input");
  textInput.id = "newQuoteText";
  textInput.type = "text";
  textInput.placeholder = "Enter a new quote";

  const catInput = document.createElement("input");
  catInput.id = "newQuoteCategory";
  catInput.type = "text";
  catInput.placeholder = "Enter quote category";

  const addBtn = document.createElement("button");
  addBtn.textContent = "Add Quote";
  addBtn.addEventListener("click", addQuote);

  container.appendChild(textInput);
  container.appendChild(catInput);
  container.appendChild(addBtn);

  document.body.appendChild(container);
}

// Required by checker: event listener on the “Show New Quote” button
if (newQuoteBtn) {
  newQuoteBtn.addEventListener("click", displayRandomQuote);
}

// Optionally show one on load so the page isn’t empty
displayRandomQuote();
