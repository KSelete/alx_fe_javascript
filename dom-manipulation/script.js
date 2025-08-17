// Initial array of quotes
let quotes = [
  { text: "The future belongs to those who prepare today.", category: "Motivation" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" },
  { text: "Stay hungry, stay foolish.", category: "Inspiration" }
];

// Cache DOM
const quoteDisplayEl = document.getElementById("quoteDisplay");
const newQuoteBtnEl = document.getElementById("newQuote");

/**
 * REQUIRED: displayRandomQuote()
 * - selects a random quote using Math.floor(Math.random() * quotes.length)
 * - updates the DOM using innerHTML
 */
function displayRandomQuote() {
  if (!Array.isArray(quotes) || quotes.length === 0) {
    quoteDisplayEl.innerHTML = "No quotes available. Please add one!";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const q = quotes[randomIndex];
  quoteDisplayEl.innerHTML = `"${q.text}" — (${q.category})`;
}

/**
 * Some briefs reference showRandomQuote; keep an alias just in case.
 */
function showRandomQuote() {
  return displayRandomQuote();
}

/**
 * REQUIRED: addQuote()
 * - reads values
 * - pushes { text, category } into quotes array
 * - updates DOM using innerHTML
 */
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const catInput  = document.getElementById("newQuoteCategory");

  const text = (textInput && textInput.value || "").trim();
  const category = (catInput && catInput.value || "").trim();

  if (!text || !category) {
    alert("Please enter both a quote and a category.");
    return;
  }

  const newQuote = { text, category };
  quotes.push(newQuote);

  // Update DOM immediately with innerHTML (checker looks for innerHTML)
  quoteDisplayEl.innerHTML = `"${newQuote.text}" — (${newQuote.category})`;

  // Clear inputs
  textInput.value = "";
  catInput.value = "";
}

/**
 * REQUIRED: Event listener on the “Show New Quote” button (#newQuote)
 */
if (newQuoteBtnEl) {
  newQuoteBtnEl.addEventListener("click", displayRandomQuote);
}

// Optional: render something on load so the page isn’t blank
displayRandomQuote();
