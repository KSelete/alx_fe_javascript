// Old:
async function fetchServerQuotes() { ... }

// New:
async function fetchQuotesFromServer() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
    const data = await response.json();

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
