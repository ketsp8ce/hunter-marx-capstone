// Function to load a page into a container
function loadPage(url, containerId = 'content') {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(html => {
      document.getElementById(containerId).innerHTML = html;
    })
    .catch(err => {
      document.getElementById(containerId).innerHTML = `<p>Failed to load page: ${url}. Error: ${err}</p>`;
      console.error(`Failed to load ${url}:`, err);
    });
}

// Load the home content when the page loads
document.addEventListener('DOMContentLoaded', () => {
  loadPage('index-content.html');
});

// Event delegation for dynamically loaded buttons inside #content
document.getElementById('content').addEventListener('click', function(e) {
  const btn = e.target;
  
  // Check if a button with data-url was clicked
  if (btn.tagName === 'BUTTON' && btn.dataset.url) {
    // Optional: check if the button is inside a nested container
    const container = btn.dataset.container || 'content';
    loadPage(btn.dataset.url, container);
  }
});
