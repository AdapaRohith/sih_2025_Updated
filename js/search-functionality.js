class SearchManager {
    constructor() {
        this.states = {
            'andhra pradesh': 'states/New folder/andhra-pradesh.html',
            'arunachal pradesh': 'states/New folder/arunachal-pradesh.html',
            'assam': 'states/New folder/assam.html',
            'bihar': 'states/New folder/bihar.html',
            'chhattisgarh': 'states/New folder/chhattisgarh.html',
            'goa': 'states/New folder/goa.html',
            'gujarat': 'states/New folder/gujarat.html',
            'haryana': 'states/New folder/haryana.html',
            'himachal pradesh': 'states/New folder/himachal-pradesh.html',
            'jharkhand': 'states/New folder/jharkhand.html',
            'karnataka': 'states/New folder/karnataka.html',
            'kerala': 'states/New folder/kerala.html',
            'madhya pradesh': 'states/New folder/madhya-pradesh.html',
            'maharashtra': 'states/New folder/maharashtra.html',
            'manipur': 'states/New folder/manipur.html',
            'meghalaya': 'states/New folder/meghalaya.html',
            'mizoram': 'states/New folder/mizoram.html',
            'nagaland': 'states/New folder/nagaland.html',
            'odisha': 'states/New folder/odisha.html',
            'punjab': 'states/New folder/punjab.html',
            'rajasthan': 'states/New folder/Rajasthan.html',
            'sikkim': 'states/New folder/sikkim.html',
            'tamil nadu': 'states/New folder/tamil-nadu.html',
            'telangana': 'states/New folder/telangana.html',
            'tripura': 'states/New folder/tripura.html',
            'uttar pradesh': 'states/New folder/uttar-pradesh.html',
            'uttarakhand': 'states/New folder/uttarakhand.html',
            'west bengal': 'states/New folder/westbengal.html',
            'delhi': 'states/New folder/delhi.html'
        };

        this.monuments = {
            'taj mahal': 'uttar pradesh',
            'red fort': 'delhi',
            'qutub minar': 'delhi',
            'india gate': 'delhi',
            'lotus temple': 'delhi',
            'hawa mahal': 'rajasthan',
            'amber fort': 'rajasthan',
            'city palace': 'rajasthan',
            'jantar mantar': 'rajasthan',
            'mysore palace': 'karnataka',
            'hampi': 'karnataka',
            'gol gumbaz': 'karnataka',
            'charminar': 'telangana',
            'gateway of india': 'maharashtra',
            'ajanta caves': 'maharashtra',
            'ellora caves': 'maharashtra',
            'sun temple': 'odisha',
            'konark temple': 'odisha',
            'golden temple': 'punjab',
            'victoria memorial': 'west bengal',
            'howrah bridge': 'west bengal',
            'padmanabhaswamy temple': 'kerala',
            'meenakshi temple': 'tamil nadu',
            'brihadeeswarar temple': 'tamil nadu',
            'khajuraho': 'madhya pradesh',
            'sanchi stupa': 'madhya pradesh',
            'ajmer sharif': 'rajasthan',
            'vaishno devi': 'jammu and kashmir',
            'kedarnath': 'uttarakhand',
            'badrinath': 'uttarakhand',
            'rishikesh': 'uttarakhand',
            'varanasi': 'uttar pradesh',
            'ayodhya': 'uttar pradesh',
            'bodh gaya': 'bihar',
            'nalanda': 'bihar',
            'sundarbans': 'west bengal',
            'darjeeling': 'west bengal',
            'kolkata': 'west bengal',
            'mumbai': 'maharashtra',
            'pune': 'maharashtra',
            'bangalore': 'karnataka',
            'hyderabad': 'telangana',
            'chennai': 'tamil nadu',
            'kochi': 'kerala',
            'goa beaches': 'goa',
            'old goa': 'goa',
            'ahmedabad': 'gujarat',
            'vadodara': 'gujarat',
            'udaipur': 'rajasthan',
            'jodhpur': 'rajasthan',
            'jaisalmer': 'rajasthan',
            'bikaner': 'rajasthan',
            'mount abu': 'rajasthan',
            'shimla': 'himachal pradesh',
            'manali': 'himachal pradesh',
            'dharamshala': 'himachal pradesh',
            'mcleod ganj': 'himachal pradesh',
            'gangtok': 'sikkim',
            'pelling': 'sikkim',
            'guwahati': 'assam',
            'kaziranga': 'assam',
            'manas': 'assam',
            'kohima': 'nagaland',
            'aizawl': 'mizoram',
            'imphal': 'manipur',
            'shillong': 'meghalaya',
            'cherrapunji': 'meghalaya',
            'agartala': 'tripura',
            'bhubaneswar': 'odisha',
            'puri': 'odisha',
            'cuttack': 'odisha',
            'ranchi': 'jharkhand',
            'jamshedpur': 'jharkhand',
            'raipur': 'chhattisgarh',
            'bilaspur': 'chhattisgarh',
            'chandigarh': 'chandigarh',
            'panchkula': 'haryana',
            'gurgaon': 'haryana',
            'faridabad': 'haryana'
        };

        this.init();
    }

    init() {
        this.setupSearchEventListeners();
        this.setupMobileMenu();
    }

    setupSearchEventListeners() {
        const searchForms = document.querySelectorAll('form');
        searchForms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const searchInput = form.querySelector('input[type="text"], input[type="search"]');
                if (searchInput) {
                    this.performSearch(searchInput.value.trim());
                }
            });
        });

        const searchInputs = document.querySelectorAll('input[type="text"], input[type="search"]');
        searchInputs.forEach(input => {
            const isSearchInput = input.placeholder && (
                input.placeholder.toLowerCase().includes('search') || 
                input.placeholder.toLowerCase().includes('state') || 
                input.placeholder.toLowerCase().includes('place') ||
                input.placeholder.toLowerCase().includes('explore')
            ) || input.classList.contains('search-input') || input.id.includes('search');

            if (isSearchInput) {
                input.classList.add('search-input');
                
                input.addEventListener('input', (e) => {
                    const query = e.target.value.trim();
                    if (query.length >= 1) {
                        this.showSearchSuggestions(query, input);
                    } else {
                        this.hideSearchSuggestions();
                    }
                });

                input.addEventListener('focus', (e) => {
                    const query = e.target.value.trim();
                    if (query.length >= 1) {
                        this.showSearchSuggestions(query, input);
                    }
                });

                input.addEventListener('blur', () => {
                    setTimeout(() => this.hideSearchSuggestions(), 300);
                });

                input.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter') {
                        this.handleKeyboardNavigation(e);
                    }
                });
            }
        });
    }

    setupMobileMenu() {
        const mobileMenuBtns = document.querySelectorAll('.mobile-menu-toggle, .mobile-menu-btn');
        const navLinks = document.querySelectorAll('.nav-links, nav');

        mobileMenuBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                navLinks.forEach(nav => {
                    nav.classList.toggle('mobile-nav-open');
                });
            });
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && !e.target.closest('.header-container')) {
                navLinks.forEach(nav => {
                    nav.classList.remove('mobile-nav-open');
                });
            }
        });
    }

    performSearch(query) {
        if (!query) return;

        const normalizedQuery = query.toLowerCase();
        
        if (this.states[normalizedQuery]) {
            window.location.href = this.states[normalizedQuery];
            return;
        }

        if (this.monuments[normalizedQuery]) {
            const state = this.monuments[normalizedQuery];
            if (this.states[state]) {
                window.location.href = this.states[state];
                return;
            }
        }

        const stateMatch = this.findBestMatch(normalizedQuery, Object.keys(this.states));
        if (stateMatch) {
            window.location.href = this.states[stateMatch];
            return;
        }

        const monumentMatch = this.findBestMatch(normalizedQuery, Object.keys(this.monuments));
        if (monumentMatch) {
            const state = this.monuments[monumentMatch];
            if (this.states[state]) {
                window.location.href = this.states[state];
                return;
            }
        }

        this.showNoResultsMessage(query);
    }

    findBestMatch(query, options) {
        let bestMatch = null;
        let bestScore = 0;

        options.forEach(option => {
            const score = this.calculateSimilarity(query, option);
            if (score > bestScore && score > 0.6) {
                bestScore = score;
                bestMatch = option;
            }
        });

        return bestMatch;
    }

    calculateSimilarity(str1, str2) {
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;
        
        if (longer.length === 0) return 1.0;
        
        const distance = this.levenshteinDistance(longer, shorter);
        return (longer.length - distance) / longer.length;
    }

    levenshteinDistance(str1, str2) {
        const matrix = [];
        
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        
        return matrix[str2.length][str1.length];
    }

    showSearchSuggestions(query, searchInput = null) {
        this.hideSearchSuggestions();

        const suggestions = this.getSuggestions(query);
        if (suggestions.length === 0) return;

        const input = searchInput || document.activeElement;
        if (!input || !input.classList.contains('search-input')) return;

        const suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'search-suggestions';
        suggestionsContainer.innerHTML = suggestions.map(suggestion => 
            `<div class="suggestion-item" data-query="${suggestion}">${suggestion}</div>`
        ).join('');

        const rect = input.getBoundingClientRect();
        suggestionsContainer.style.position = 'absolute';
        suggestionsContainer.style.top = (rect.bottom + window.scrollY + 2) + 'px';
        suggestionsContainer.style.left = rect.left + 'px';
        suggestionsContainer.style.width = rect.width + 'px';
        suggestionsContainer.style.zIndex = '1000';
        suggestionsContainer.style.backgroundColor = 'white';
        suggestionsContainer.style.border = '1px solid #ddd';
        suggestionsContainer.style.borderRadius = '4px';
        suggestionsContainer.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        suggestionsContainer.style.maxHeight = '200px';
        suggestionsContainer.style.overflowY = 'auto';

        document.body.appendChild(suggestionsContainer);

        suggestionsContainer.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                input.value = item.dataset.query;
                this.performSearch(item.dataset.query);
                this.hideSearchSuggestions();
            });
        });

        this.currentSuggestions = suggestionsContainer;
        this.currentInput = input;
    }

    getSuggestions(query) {
        const normalizedQuery = query.toLowerCase();
        const suggestions = [];
        const seen = new Set();

        Object.keys(this.states).forEach(state => {
            const stateLower = state.toLowerCase();
            if (stateLower.startsWith(normalizedQuery) && !seen.has(state)) {
                suggestions.push({
                    text: state.charAt(0).toUpperCase() + state.slice(1),
                    type: 'State',
                    priority: 1
                });
                seen.add(state);
            }
        });

        Object.keys(this.monuments).forEach(monument => {
            const monumentLower = monument.toLowerCase();
            if (monumentLower.startsWith(normalizedQuery) && !seen.has(monument)) {
                suggestions.push({
                    text: monument.charAt(0).toUpperCase() + monument.slice(1),
                    type: 'Monument',
                    priority: 2
                });
                seen.add(monument);
            }
        });

        if (suggestions.length === 0) {
            Object.keys(this.states).forEach(state => {
                const stateLower = state.toLowerCase();
                if (stateLower.includes(normalizedQuery) && !seen.has(state)) {
                    suggestions.push({
                        text: state.charAt(0).toUpperCase() + state.slice(1),
                        type: 'State',
                        priority: 3
                    });
                    seen.add(state);
                }
            });

            Object.keys(this.monuments).forEach(monument => {
                const monumentLower = monument.toLowerCase();
                if (monumentLower.includes(normalizedQuery) && !seen.has(monument)) {
                    suggestions.push({
                        text: monument.charAt(0).toUpperCase() + monument.slice(1),
                        type: 'Monument',
                        priority: 4
                    });
                    seen.add(monument);
                }
            });
        }

        return suggestions
            .sort((a, b) => a.priority - b.priority)
            .slice(0, 6)
            .map(item => item.text);
    }

    hideSearchSuggestions() {
        const existingSuggestions = document.querySelector('.search-suggestions');
        if (existingSuggestions) {
            existingSuggestions.remove();
        }
        this.currentSuggestions = null;
        this.currentInput = null;
    }

    handleKeyboardNavigation(e) {
        if (!this.currentSuggestions) return;

        const items = this.currentSuggestions.querySelectorAll('.suggestion-item');
        const currentActive = this.currentSuggestions.querySelector('.suggestion-item.active');
        let activeIndex = -1;

        if (currentActive) {
            activeIndex = Array.from(items).indexOf(currentActive);
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                activeIndex = (activeIndex + 1) % items.length;
                this.highlightSuggestion(items, activeIndex);
                break;
            case 'ArrowUp':
                e.preventDefault();
                activeIndex = activeIndex <= 0 ? items.length - 1 : activeIndex - 1;
                this.highlightSuggestion(items, activeIndex);
                break;
            case 'Enter':
                e.preventDefault();
                if (currentActive) {
                    this.currentInput.value = currentActive.dataset.query;
                    this.performSearch(currentActive.dataset.query);
                    this.hideSearchSuggestions();
                }
                break;
        }
    }

    highlightSuggestion(items, index) {
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
    }

    showNoResultsMessage(query) {
        alert(`No results found for "${query}". Please try searching for a state name or famous monument.`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SearchManager();
});

const style = document.createElement('style');
style.textContent = `
    .search-suggestions {
        background: white;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        max-height: 200px;
        overflow-y: auto;
        font-family: inherit;
    }
    
    .suggestion-item {
        padding: 12px 15px;
        cursor: pointer;
        border-bottom: 1px solid #eee;
        transition: all 0.2s ease;
        font-size: 14px;
        color: #333;
        display: flex;
        align-items: center;
    }
    
    .suggestion-item:hover,
    .suggestion-item.active {
        background-color: #667eea;
        color: white;
    }
    
    .suggestion-item:last-child {
        border-bottom: none;
    }
    
    .suggestion-item::before {
        content: "🔍";
        margin-right: 8px;
        font-size: 12px;
    }
    
    .suggestion-item:hover::before,
    .suggestion-item.active::before {
        content: "→";
    }
    
    .mobile-nav-open {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 1000;
    }
    
    @media (max-width: 768px) {
        .nav-links {
            display: none;
        }
        
        .mobile-nav-open {
            display: flex !important;
        }
        
        .search-suggestions {
            max-height: 150px;
        }
        
        .suggestion-item {
            padding: 10px 12px;
            font-size: 13px;
        }
    }
`;
document.head.appendChild(style);
