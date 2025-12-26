// Data storage and management
class MilesTracker {
    constructor() {
        this.dataKey = 'milesForMealsData';
        this.initializeData();
        this.updateDisplay();
    }

    initializeData() {
        const existingData = localStorage.getItem(this.dataKey);
        if (!existingData) {
            this.data = {
                trainingMiles: 0,
                raceMiles: 0,
                lastUpdated: new Date().toISOString(),
                additionalDonations: 0
            };
            this.saveData();
        } else {
            this.data = JSON.parse(existingData);
        }
    }

    saveData() {
        this.data.lastUpdated = new Date().toISOString();
        localStorage.setItem(this.dataKey, JSON.stringify(this.data));
    }

    getTotalMiles() {
        return this.data.trainingMiles + this.data.raceMiles;
    }

    getTotalDonations() {
        const trainingDonations = this.data.trainingMiles * 1;
        const raceDonations = this.data.raceMiles * 2;
        return trainingDonations + raceDonations + this.data.additionalDonations;
    }

    addTrainingMiles(miles) {
        this.data.trainingMiles += miles;
        this.saveData();
        this.updateDisplay();
    }

    addRaceMiles(miles) {
        this.data.raceMiles += miles;
        this.saveData();
        this.updateDisplay();
    }

    addAdditionalDonation(amount) {
        this.data.additionalDonations += amount;
        this.saveData();
        this.updateDisplay();
    }

    setMiles(trainingMiles, raceMiles) {
        this.data.trainingMiles = trainingMiles;
        this.data.raceMiles = raceMiles;
        this.saveData();
        this.updateDisplay();
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
    setupEventListeners();
});

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

// Example: Add sample data for testing
function addSampleData() {
    tracker.setMiles(150, 25);
    tracker.addAdditionalDonation(100);
}

// Expose functions for easy testing in console
window.tracker = tracker;
window.addSampleData = addSampleData;
