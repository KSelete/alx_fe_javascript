// --- Global variable for selected category ---
let selectedCategory = localStorage.getItem("selectedCategory") || "all";

// Populate categories dynamically
function populateCategories() {
  const categoryFilterEl = document.getElementById("categoryFilter");

  // Clear existing options except "All Categories"
  categoryFilterEl.innerHTML = '<option value="all">All Categories</option>';

  const uniqueCategories = [...new Set(quotes.map(q => q.category))];

  uniqueCategories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categoryFilterEl.appendChild(opt);
  });

  // Restore last selected category
  categoryFilterEl.value = selectedCategory;
}

// Filter quotes based on selected category
function filterQuotes() {
  const categoryFilterEl = document.getElementById("categoryFilter");
  selectedCategory = categoryFilterEl.value;        // Use global variable
  localStorage.setItem("selectedCategory", selectedCategory);

  let filteredQuotes = quotes;
  if (selectedCategory !== "all") {
    filteredQuotes = quotes.filter(q => q.category === selectedCategory);
  }

  if (filteredQuotes.length === 0) {
    document.getElementById("quoteDisplay").innerHTML = "No quotes available for this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const q = filteredQuotes[randomIndex];
  document.getElementById("quoteDisplay").innerHTML = `"${q.text}" — (${q.category})`;
}

// Update addQuote to refresh categories after adding a new quote
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const catInput = document.getElementById("newQuoteCategory");

  const text = (textInput.value || "").trim();
  const category = (catInput.value || "").trim();

  if (!text || !category) {
    alert("Please enter both a quote and a category.");
    return;
  }

  const newQuote = { text, category };
  quotes.push(newQuote);
  localStorage.setItem("quotes", JSON.stringify(quotes));

  // Update DOM
  document.getElementById("quoteDisplay").innerHTML = `"${newQuote.text}" — (${newQuote.category})`;

  // Refresh categories
  populateCategories();

  // Clear inputs
  textInput.value = "";
  catInput.value = "";
}

// On page load
populateCategories();
filterQuotes();
