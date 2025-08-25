// Main JavaScript for Aggregaatkopen.com

// Global variables
let quizData = null;
let currentQuestion = 0;
let userAnswers = {};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupMobileMenu();
    setupFAQ();
    setupSmoothScrolling();
    
    // Initialize quiz if on quiz page
    if (document.getElementById('quiz-container')) {
        initializeQuiz();
    }
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
}

// FAQ Functionality
function setupFAQ() {
    const faqButtons = document.querySelectorAll('.faq-button');
    
    faqButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.parentElement.nextElementSibling;
            const icon = this.querySelector('.faq-icon');
            
            // Close all other FAQ items
            faqButtons.forEach(otherButton => {
                if (otherButton !== this) {
                    const otherContent = otherButton.parentElement.nextElementSibling;
                    const otherIcon = otherButton.querySelector('.faq-icon');
                    otherContent.classList.add('hidden');
                    otherIcon.classList.remove('rotate');
                }
            });
            
            // Toggle current FAQ item
            content.classList.toggle('hidden');
            icon.classList.toggle('rotate');
        });
    });
}

// Smooth Scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Quiz Functionality
async function initializeQuiz() {
    try {
        showLoading();
        const response = await fetch('/api/quiz/questions');
        quizData = await response.json();
        hideLoading();
        showQuestion(0);
    } catch (error) {
        console.error('Error loading quiz:', error);
        showError('Er is een fout opgetreden bij het laden van de keuzehulp. Probeer het opnieuw.');
    }
}

function showLoading() {
    const container = document.getElementById('quiz-container');
    container.innerHTML = `
        <div class="text-center py-8" id="quiz-loading">
            <div class="spinner mx-auto mb-4"></div>
            <p class="text-gray-600">Keuzehulp wordt geladen...</p>
        </div>
    `;
}

function hideLoading() {
    const loading = document.getElementById('quiz-loading');
    if (loading) {
        loading.remove();
    }
}

function showQuestion(questionIndex) {
    if (!quizData || questionIndex >= quizData.length) {
        showResults();
        return;
    }
    
    currentQuestion = questionIndex;
    const question = quizData[questionIndex];
    const container = document.getElementById('quiz-container');
    
    // Update progress
    updateProgress(questionIndex + 1, quizData.length);
    
    container.innerHTML = `
        <div class="mb-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">
                ${question.question}
            </h2>
            <p class="text-gray-600">Kies de optie die het beste bij jou past:</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            ${question.options.map(option => `
                <div class="quiz-option" data-value="${option.value}" onclick="selectQuizOption('${option.value}')">
                    <div class="icon">
                        <i class="${option.icon}"></i>
                    </div>
                    <h3 class="text-lg font-semibold mb-2">${option.label}</h3>
                </div>
            `).join('')}
        </div>
        
        <div class="flex justify-between">
            <button onclick="previousQuestion()" 
                    class="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition ${questionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}"
                    ${questionIndex === 0 ? 'disabled' : ''}>
                <i class="fas fa-arrow-left mr-2"></i>
                Vorige
            </button>
            
            <button id="next-btn" onclick="nextQuestion()" 
                    class="bg-aggregaat-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition opacity-50 cursor-not-allowed" 
                    disabled>
                ${questionIndex === quizData.length - 1 ? 'Resultaten Tonen' : 'Volgende'}
                <i class="fas fa-arrow-right ml-2"></i>
            </button>
        </div>
    `;
}

function selectQuizOption(value) {
    // Remove previous selection
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selection to clicked option
    document.querySelector(`[data-value="${value}"]`).classList.add('selected');
    
    // Store answer
    userAnswers[quizData[currentQuestion].id] = value;
    
    // Enable next button
    const nextBtn = document.getElementById('next-btn');
    nextBtn.disabled = false;
    nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
}

function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        showQuestion(currentQuestion + 1);
    } else {
        showResults();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        showQuestion(currentQuestion - 1);
    }
}

function updateProgress(current, total) {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    const percentage = (current / total) * 100;
    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `Vraag ${current} van ${total}`;
}

async function showResults() {
    try {
        // Update progress to 100%
        updateProgress(quizData.length, quizData.length);
        
        // Show loading
        document.getElementById('quiz-container').innerHTML = `
            <div class="text-center py-8">
                <div class="spinner mx-auto mb-4"></div>
                <p class="text-gray-600">We zoeken de beste aggregaten voor jou...</p>
            </div>
        `;
        
        // Get recommendations
        const response = await fetch('/api/quiz/recommendations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userAnswers)
        });
        
        const data = await response.json();
        
        // Hide quiz container and show results
        document.getElementById('quiz-container').style.display = 'none';
        showRecommendations(data.recommendations, data.message);
        
    } catch (error) {
        console.error('Error getting recommendations:', error);
        showError('Er is een fout opgetreden bij het ophalen van aanbevelingen. Probeer het opnieuw.');
    }
}

function showRecommendations(recommendations, message) {
    const resultsContainer = document.getElementById('results-container');
    const messageEl = document.getElementById('results-message');
    const listEl = document.getElementById('recommendations-list');
    
    messageEl.textContent = message;
    
    listEl.innerHTML = recommendations.map((rec, index) => {
        const product = rec.product;
        const badge = index === 0 ? 'BESTE KEUZE' : `#${index + 1} AANBEVELING`;
        const badgeColor = index === 0 ? 'bg-yellow-400 text-yellow-900' : 'bg-blue-100 text-blue-800';
        
        return `
            <div class="product-card border rounded-lg p-6 ${index === 0 ? 'ring-2 ring-yellow-400 bg-yellow-50' : ''}">
                <div class="flex flex-col lg:flex-row gap-6">
                    <div class="flex-1">
                        <div class="flex items-center gap-3 mb-3">
                            <span class="px-3 py-1 text-xs font-bold rounded-full ${badgeColor}">
                                ${badge}
                            </span>
                            <span class="text-2xl font-bold text-green-600">${rec.percentage}% Match</span>
                        </div>
                        
                        <h3 class="text-xl font-bold mb-2">${product.name}</h3>
                        <p class="text-gray-600 mb-4">${product.brand} | ${product.type} | ${product.power}W</p>
                        
                        <div class="mb-4">
                            <h4 class="font-semibold text-sm text-gray-700 mb-2">Waarom dit aggregaat bij je past:</h4>
                            <ul class="text-sm text-gray-600 space-y-1">
                                ${rec.matches.map(match => `<li><i class="fas fa-check text-green-500 mr-2"></i>${match}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                                <span class="text-gray-500">Vermogen:</span>
                                <div class="font-semibold">${product.power}W</div>
                            </div>
                            <div>
                                <span class="text-gray-500">Geluid:</span>
                                <div class="font-semibold">${product.noise} dB</div>
                            </div>
                            <div>
                                <span class="text-gray-500">Runtime:</span>
                                <div class="font-semibold">${product.runtime}u</div>
                            </div>
                            <div>
                                <span class="text-gray-500">Gewicht:</span>
                                <div class="font-semibold">${product.weight}kg</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="text-center lg:text-right">
                        <div class="text-3xl font-bold text-green-600 mb-4">€${product.price.toLocaleString()}</div>
                        <div class="space-y-2">
                            <a href="/aggregaat/${product.id}" class="block bg-aggregaat-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                                Volledige Review
                            </a>
                            <button onclick="findBestPrice('${product.id}')" class="block w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
                                <i class="fas fa-external-link-alt mr-1"></i>
                                Beste Prijs Vinden
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    resultsContainer.classList.remove('hidden');
    
    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
}

function restartQuiz() {
    currentQuestion = 0;
    userAnswers = {};
    document.getElementById('results-container').classList.add('hidden');
    document.getElementById('quiz-container').style.display = 'block';
    showQuestion(0);
}

function findBestPrice(productId) {
    // In een echte implementatie zou dit naar affiliate links leiden
    showNotification('Je wordt doorgeleid naar de beste prijzen...', 'info');
    
    // Simuleer doorverwijzing naar affiliate partner
    setTimeout(() => {
        window.open('#', '_blank');
    }, 1000);
}

// Utility Functions
function showError(message) {
    const container = document.getElementById('quiz-container');
    container.innerHTML = `
        <div class="text-center py-8">
            <div class="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-exclamation-triangle text-2xl"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Oeps, er ging iets mis</h3>
            <p class="text-gray-600 mb-4">${message}</p>
            <button onclick="location.reload()" class="bg-aggregaat-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                Probeer Opnieuw
            </button>
        </div>
    `;
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'} mr-2"></i>
                <span>${message}</span>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Search functionality
function performSearch(query) {
    if (!query.trim()) return;
    
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            console.log('Search results:', data.products);
            // Implement search results display
        })
        .catch(error => {
            console.error('Search error:', error);
        });
}

// Product comparison
let compareList = JSON.parse(localStorage.getItem('compareList') || '[]');

function addToCompare(productId) {
    if (!compareList.includes(productId)) {
        compareList.push(productId);
        localStorage.setItem('compareList', JSON.stringify(compareList));
        updateCompareButton(productId, true);
        showNotification('Product toegevoegd aan vergelijking', 'success');
    }
    
    if (compareList.length >= 3) {
        showCompareModal();
    }
}

function removeFromCompare(productId) {
    compareList = compareList.filter(id => id !== productId);
    localStorage.setItem('compareList', JSON.stringify(compareList));
    updateCompareButton(productId, false);
    showNotification('Product verwijderd uit vergelijking', 'info');
}

function updateCompareButton(productId, inCompare) {
    const buttons = document.querySelectorAll(`[data-product-id="${productId}"]`);
    buttons.forEach(button => {
        if (inCompare) {
            button.innerHTML = '<i class="fas fa-check mr-1"></i>In Vergelijking';
            button.classList.add('bg-green-600');
            button.onclick = () => removeFromCompare(productId);
        } else {
            button.innerHTML = '<i class="fas fa-plus mr-1"></i>Vergelijken';
            button.classList.remove('bg-green-600');
            button.onclick = () => addToCompare(productId);
        }
    });
}

function showCompareModal() {
    // Implement comparison modal
    console.log('Show compare modal for:', compareList);
}

// Newsletter signup
function subscribeNewsletter(email) {
    if (!email || !email.includes('@')) {
        showNotification('Voer een geldig e-mailadres in', 'error');
        return;
    }
    
    // Simulate API call
    showNotification('Bedankt voor je aanmelding!', 'success');
}

// Analytics tracking (placeholder)
function trackEvent(category, action, label) {
    // Implement Google Analytics or other tracking
    console.log('Track event:', category, action, label);
}

// Initialize comparison list from localStorage
document.addEventListener('DOMContentLoaded', function() {
    compareList.forEach(productId => {
        updateCompareButton(productId, true);
    });
});