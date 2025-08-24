// --- Initial quotes array ---
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "Believe in yourself", category: "Motivation" },
  { text: "Never give up", category: "Motivation" },
  { text: "Stay positive", category: "Inspiration" }
];

// --- Selected category ---
let selectedCategory = localStorage.getItem("selectedCategory") || "all";

// --- Display a random quote (filtered by category) ---
function displayRandomQuote() {
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

// --- Filter quotes ---
function filterQuotes() {
  const categoryFilterEl = document.getElementById("categoryFilter");
  selectedCategory = categoryFilterEl.value;
  localStorage.setItem("selectedCategory", selectedCategory);
  displayRandomQuote();
}

// --- Populate category dropdown dynamically ---
function populateCategories() {
  const categoryFilterEl = document.getElementById("categoryFilter");
  categoryFilterEl.innerHTML = '<option value="all">All Categories</option>';

  const uniqueCategories = [...new Set(quotes.map(q => q.category))];
  uniqueCategories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categoryFilterEl.appendChild(opt);
  });

  categoryFilterEl.value = selectedCategory;
}

// --- Add a new quote ---
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

  // Update display and categories
  displayRandomQuote();
  populateCategories();

  // Clear inputs
  textInput.value = "";
  catInput.value = "";

  // Post new quote to server
  postQuoteToServer(newQuote);
}

// --- JSON import ---
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    localStorage.setItem("quotes", JSON.stringify(quotes));
    populateCategories();
    displayRandomQuote();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// --- JSON export ---
function exportToJsonFile() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// --- Fetch quotes from mock server ---
async function fetchQuotesFromServer() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
    const data = await response.json();
    return data.map(item => ({ text: item.title, category: "server" }));
  } catch (error) {
    console.error("Error fetching server quotes:", error);
    return [];
  }
}

// --- Post a new quote to mock server ---
async function postQuoteToServer(quote) {
  try {
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quote)
    });
  } catch (error) {
    console.error("Error posting quote to server:", error);
  }
}

// --- Sync with server and handle conflicts ---
async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();
  let updated = false;

  serverQuotes.forEach(sq => {
    const exists = quotes.some(lq => lq.text === sq.text && lq.category === sq.category);
    if (!exists) {
      quotes.push(sq);
      updated = true;
    }
  });

  if (updated) {
    localStorage.setItem("quotes", JSON.stringify(quotes));
    populateCategories();
    displayRandomQuote();

    const statusEl = document.getElementById("syncStatus");
    statusEl.textContent = "Quotes synced with server! (Server data takes precedence)";
    setTimeout(() => statusEl.textContent = "", 3000);
  }
}

// --- Event listener for "Show New Quote" button ---
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);

// --- Initial load ---
populateCategories();
displayRandomQuote();
syncQuotes();

// --- Periodic server sync every 30 seconds ---
setInterval(syncQuotes, 30000);
