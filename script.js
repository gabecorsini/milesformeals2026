// Data storage and management via Cloudflare Worker + KV
class MilesTracker {
    constructor() {
        // TODO: After deploying worker, replace YOUR-SUBDOMAIN with your actual Cloudflare subdomain
        this.API_URL = 'https://milesformeals2026.gabe-corsini.workers.dev/api/miles';
        this.data = {
            trainingMiles: 0,
            raceMiles: 0,
            additionalDonations: 0
        };
        this.isLoading = false;
    }

    async loadData() {
        this.isLoading = true;
        try {
            const response = await fetch(this.API_URL);
            if (!response.ok) throw new Error('Failed to load data');
            
            const data = await response.json();
            this.data = {
                trainingMiles: parseFloat(data.trainingMiles) || 0,
                raceMiles: parseFloat(data.raceMiles) || 0,
                additionalDonations: parseFloat(data.additionalDonations) || 0
            };
            
            this.updateDisplay();
            return true;
        } catch (error) {
            console.error('Error loading data:', error);
            // Fall back to showing zeros if API fails
            this.updateDisplay();
            return false;
        } finally {
            this.isLoading = false;
        }
    }

    async saveData(pin) {
        this.isLoading = true;
        try {
            const response = await fetch(this.API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pin: pin,
                    trainingMiles: this.data.trainingMiles,
                    raceMiles: this.data.raceMiles,
                    additionalDonations: this.data.additionalDonations
                })
            });

            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.error || 'Failed to save data');
            }

            return { success: true };
        } catch (error) {
            console.error('Error saving data:', error);
            return { success: false, error: error.message };
        } finally {
            this.isLoading = false;
        }
    }

    getTotalMiles() {
        return this.data.trainingMiles + this.data.raceMiles;
    }

    getTotalDonations() {
        const trainingDonations = this.data.trainingMiles * 1;
        const raceDonations = this.data.raceMiles * 2;
        return trainingDonations + raceDonations + this.data.additionalDonations;
    }

    setMiles(trainingMiles, raceMiles) {
        this.data.trainingMiles = parseFloat(trainingMiles) || 0;
        this.data.raceMiles = parseFloat(raceMiles) || 0;
    }

    setAdditionalDonations(amount) {
        this.data.additionalDonations = parseFloat(amount) || 0;
    }

    updateDisplay() {
        const totalMiles = this.getTotalMiles();
        const totalDonations = this.getTotalDonations();

        // Update tracker values (only if elements exist on this page)
        const totalMilesEl = document.getElementById('totalMiles');
        const trainingMilesEl = document.getElementById('trainingMiles');
        const raceMilesEl = document.getElementById('raceMiles');
        const totalDonationsEl = document.getElementById('totalDonations');
        const progressFillEl = document.getElementById('progressFill');
        const progressPercentEl = document.getElementById('progressPercent');

        if (totalMilesEl) totalMilesEl.textContent = totalMiles.toFixed(1);
        if (trainingMilesEl) trainingMilesEl.textContent = this.data.trainingMiles.toFixed(1);
        if (raceMilesEl) raceMilesEl.textContent = this.data.raceMiles.toFixed(1);
        if (totalDonationsEl) totalDonationsEl.textContent = '$' + totalDonations.toFixed(2);

        // Update progress bar
        if (progressFillEl && progressPercentEl) {
            const targetMiles = 1200;
            const progressPercent = Math.min((totalMiles / targetMiles) * 100, 100);
            progressFillEl.style.width = progressPercent + '%';
            progressPercentEl.textContent = Math.round(progressPercent) + '%';
        }
    }
}

// Initialize tracker
let tracker;

document.addEventListener('DOMContentLoaded', () => {
    tracker = new MilesTracker();
    tracker.loadData();
    setupEventListeners();
});

// Auto-refresh data every 5 minutes on the main page
if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    setInterval(() => {
        if (tracker) tracker.loadData();
    }, 5 * 60 * 1000);
}

// Setup smooth scrolling for navigation links
function setupEventListeners() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Expose tracker for console testing
window.tracker = tracker;
