// Function to load a page into a container
function loadPage(url, containerId = 'content') {
  const container = document.getElementById(containerId);
  if (!container) return; // stop if container doesn't exist

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.text();
    })
    .then(html => {
      container.innerHTML = html;
    })
    .catch(err => {
      container.innerHTML = `<p>Failed to load page: ${url}. Error: ${err}</p>`;
      console.error(`Failed to load ${url}:`, err);
    });
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

  // --- Load home content if #content exists ---
  const mainContent = document.getElementById('content');
  if (mainContent) {
    loadPage('index-content.html');
  }

  // --- Sidebar journal buttons ---
  const journalsList = document.getElementById('journals-list');
  if (journalsList) {
    journalsList.addEventListener('click', function(e) {
      const btn = e.target;
      if (btn.tagName === 'BUTTON' && btn.dataset.url) {
        const container = btn.dataset.container || 'journal-content';
        loadPage(btn.dataset.url, container);
      }
    });
  }

  // --- Back to Journals links ---
  const backLinks = document.querySelectorAll('.back-to-journals');
  backLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      // Assuming your general journals page is 'journals.html'
      window.location.href = 'journals.html';
    });
  });

});

