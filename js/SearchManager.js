class SearchManager {
    constructor() {
        this.searchInput = document.getElementById('tool-search');
        this.toolButtons = document.querySelectorAll('.tool-button');
        this.placeholder = document.getElementById('add-tool-placeholder');
    }

    init() {
        if (!this.searchInput) return;

        this.searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            this.filter(query);
        });
    }

    filter(query) {
        this.toolButtons.forEach(btn => {
            const searchTerms = btn.getAttribute('data-name') || '';
            if (searchTerms.includes(query)) {
                btn.classList.remove('hidden-tool');
            } else {
                btn.classList.add('hidden-tool');
            }
        });

        if (this.placeholder) {
            if (query.length > 0) {
                this.placeholder.classList.add('hidden-tool');
            } else {
                this.placeholder.classList.remove('hidden-tool');
            }
        }
    }
}