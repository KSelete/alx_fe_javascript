// Simulate fetching quotes from server (mock API)
async function fetchServerQuotes() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5"); // mock data
    const data = await response.json();

    // Map server data to quote format
    const serverQuotes = data.map(item => ({
      text: item.title,
      category: "server"
    }));

    return serverQuotes;
  } catch (error) {
    console.error("Error fetching server quotes:", error);
    return [];
  }
}

// Sync local quotes with server
async function syncWithServer() {
  const serverQuotes = await fetchServerQuotes();

  let updated = false;

  serverQuotes.forEach(sq => {
    // Check if quote already exists in local
    const exists = quotes.some(lq => lq.text === sq.text && lq.category === sq.category);
    if (!exists) {
      quotes.push(sq);       // Add server quote to local
      updated = true;
    }
  });

  if (updated) {
    localStorage.setItem("quotes", JSON.stringify(quotes));
    populateCategories();
    filterQuotes();

    const statusEl = document.getElementById("syncStatus");
    statusEl.textContent = "Quotes synced with server! (Server data takes precedence)";
    setTimeout(() => statusEl.textContent = "", 3000);
  }
}

// Periodically sync every 30 seconds
setInterval(syncWithServer, 30000);

// Initial sync on page load
syncWithServer();
