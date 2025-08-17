// --- Existing code for quotes, localStorage, displayRandomQuote, addQuote, etc. remains ---

const categoryFilterEl = document.getElementById("categoryFilter");

// Populate categories dynamically from quotes array
function populateCategories() {
  // Save current selected value
  const lastSelected = localStorage.getItem("lastSelectedCategory") || "all";

  // Clear existing options except "All Categories"
  categoryFilterEl.innerHTML = '<option value="all">All Categories</option>';

  // Get unique categories
  const uniqueCategories = [...new Set(quotes.map(q => q.category))];

  uniqueCategories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categoryFilterEl.appendChild(opt);
  });

  // Restore last selected category
  categoryFilterEl.value = lastSelected;
}

// Filter quotes based on selected category
function filterQuotes() {
  const selected = categoryFilterEl.value;
  localStorage.setItem("lastSelectedCategory", selected);

  let filteredQuotes = quotes;
  if (selected !== "all") {
    filteredQuotes = quotes.filter(q => q.category === selected);
  }

  if (filteredQuotes.length === 0) {
    quoteDisplayEl.innerHTML = "No quotes available for this category.";
    return;
  }

  // Pick random from filtered
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const q = filteredQuotes[randomIndex];
  quoteDisplayEl.innerHTML = `"${q.text}" — (${q.category})`;
}

// --- Update addQuote to refresh categories ---
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
  saveQuotes();

  // Update DOM
  quoteDisplayEl.innerHTML = `"${newQuote.text}" — (${newQuote.category})`;

  // Refresh category dropdown
  populateCategories();

  // Clear inputs
  textInput.value = "";
  catInput.value = "";
}

// --- On page load ---
populateCategories();

// Show a random quote from current filter on load
filterQuotes();
