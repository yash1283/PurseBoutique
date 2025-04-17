// FAQ page specific JavaScript

// When the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // FAQ search functionality
    const searchInput = document.getElementById('faq-search');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            const accordionItems = document.querySelectorAll('.accordion-item');
            
            accordionItems.forEach(item => {
                const question = item.querySelector('.accordion-button').textContent.toLowerCase();
                const answer = item.querySelector('.accordion-body').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Show message if no results
            const noResultsMsg = document.getElementById('no-results-message');
            const visibleItems = document.querySelectorAll('.accordion-item[style="display: block"]');
            
            if (noResultsMsg) {
                if (searchTerm && visibleItems.length === 0) {
                    noResultsMsg.classList.remove('d-none');
                } else {
                    noResultsMsg.classList.add('d-none');
                }
            }
        });
    }
    
    // Handle tab change in URL
    function handleHashChange() {
        const hash = window.location.hash;
        if (hash) {
            const tabId = hash.replace('#', '');
            const tab = document.getElementById(${tabId}-tab);
            
            if (tab) {
                const tabInstance = new bootstrap.Tab(tab);
                tabInstance.show();
            }
        }
    }
    
    // Check for hash on page load
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Update URL when tabs are shown
    const tabEls = document.querySelectorAll('button[data-bs-toggle="pill"]');
    
    tabEls.forEach(tabEl => {
        tabEl.addEventListener('shown.bs.tab', function(event) {
            const id = event.target.id.replace('-tab', '');
            history.replaceState(null, null, #${id});
        });
    });
});