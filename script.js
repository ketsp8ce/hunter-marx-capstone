function loadPage(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(html => {
      document.getElementById('content').innerHTML = html;
    })
    .catch(err => {
      document.getElementById('content').innerHTML = `<p>Failed to load page: ${url}. Error: ${err}</p>`;
      console.error(`Failed to load ${url}:`, err);
    });
}

// Load the home content when the page loads
document.addEventListener('DOMContentLoaded', () => {
  loadPage('index-content.html');
});
