// Global variables
let activitiesData = [];
let filteredActivities = [];

// DOM elements
const activitiesGrid = document.getElementById('activities-grid');
const loadingContainer = document.getElementById('loading');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('activity-modal');
const modalClose = document.querySelector('.modal-close');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    loadActivities();
    setupModalEvents();
    setupFilterEvents();
    initializeScrollAnimations();
    initializeStatCounters();
});

// Navigation functionality
function initializeNavigation() {
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 30px rgba(44, 95, 141, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(44, 95, 141, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
}

// Load activities from JSON
async function loadActivities() {
    try {
        showLoading(true);
        
        // Simulate network delay for smooth loading animation
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Try to fetch from JSON file first
        let data;
        try {
            const response = await fetch('activities.json');
            if (!response.ok) {
                throw new Error('Failed to fetch activities');
            }
            data = await response.json();
        } catch (fetchError) {
            console.warn('Could not fetch activities.json, using fallback data:', fetchError);
            // Fallback data embedded directly in JavaScript
            data = {
                "activities": [
                    {
                        "id": 1,
                        "title": "Dupatta of Blessings",
                        "shortDescription": "Repurposing temple dupattas into wedding veils for underprivileged brides.",
                        "fullDescription": "Our Dupatta of Blessings initiative transforms discarded temple dupattas into beautiful wedding veils for underprivileged brides. This sustainable practice not only reduces textile waste but also brings dignity and joy to special moments in people's lives.",
                        "purpose": "Reduces textile waste while spreading love and dignity through sustainable giving.",
                        "impact": "Encourages responsible reuse and inspires compassionate, waste-free celebrations.",
                        "category": "Textile Upcycling",
                        "image": "assets/Logo.jpg",
                        "gallery": ["assets/Logo.jpg", "assets/Logo.jpg", "assets/Logo.jpg"],
                        "materials": ["Temple dupattas", "Sewing materials", "Decorative elements"],
                        "difficulty": "Medium",
                        "duration": "2-3 hours",
                        "participants": "5-10 people",
                        "link": "#dupatta-blessings"
                    },
                    {
                        "id": 2,
                        "title": "Flower Dhoops",
                        "shortDescription": "Turning discarded temple flowers into fragrant incense sticks.",
                        "fullDescription": "The Flower Dhoops project converts temple flower waste into aromatic incense sticks, preventing pollution of water bodies while creating useful products that enhance spiritual experiences in an eco-friendly manner.",
                        "purpose": "Prevents flower waste from polluting rivers and encourages mindful reuse of natural materials.",
                        "impact": "Reduces water pollution and supports sustainable livelihoods.",
                        "category": "Waste Management",
                        "image": "assets/Logo.jpg",
                        "gallery": ["assets/Logo.jpg", "assets/Logo.jpg", "assets/Logo.jpg"],
                        "materials": ["Temple flowers", "Natural binding agents", "Bamboo sticks"],
                        "difficulty": "Easy",
                        "duration": "1-2 hours",
                        "participants": "3-8 people",
                        "link": "#flower-dhoops"
                    },
                    {
                        "id": 3,
                        "title": "DIY Candles",
                        "shortDescription": "Creating candles using leftover wax, coconut husks, and nut shells.",
                        "fullDescription": "Our DIY Candles workshop teaches participants to create beautiful, functional candles using waste materials like leftover wax, coconut husks, and nut shells, promoting creativity while reducing landfill waste.",
                        "purpose": "Promotes creativity and teaches how to recycle waste into something beautiful and useful.",
                        "impact": "Cuts down landfill waste and inspires everyday sustainable habits.",
                        "category": "Creative Upcycling",
                        "image": "assets/Logo.jpg",
                        "gallery": ["assets/Logo.jpg", "assets/Logo.jpg", "assets/Logo.jpg"],
                        "materials": ["Leftover wax", "Coconut husks", "Nut shells", "Wicks", "Essential oils"],
                        "difficulty": "Easy",
                        "duration": "1.5-2 hours",
                        "participants": "4-12 people",
                        "link": "#diy-candles"
                    },
                    {
                        "id": 4,
                        "title": "Cloth to Toys",
                        "shortDescription": "Turning old fabrics into soft toys for children in need.",
                        "fullDescription": "The Cloth to Toys initiative transforms old fabric scraps into delightful soft toys for children in need, combining sustainability with social impact by bringing joy to underprivileged children while reducing textile waste.",
                        "purpose": "Blends sustainability with kindness — reducing waste while bringing joy.",
                        "impact": "Encourages textile reuse and spreads awareness about giving back to the community.",
                        "category": "Social Impact",
                        "image": "assets/Logo.jpg",
                        "gallery": ["assets/Logo.jpg", "assets/Logo.jpg", "assets/Logo.jpg"],
                        "materials": ["Old fabric", "Stuffing material", "Sewing supplies", "Decorative items"],
                        "difficulty": "Medium",
                        "duration": "2-4 hours",
                        "participants": "6-15 people",
                        "link": "#cloth-toys"
                    },
                    {
                        "id": 5,
                        "title": "Celebration Kits",
                        "shortDescription": "Eco-friendly kits with reusable décor, seed confetti, and cloth banners.",
                        "fullDescription": "Our Celebration Kits provide ready-to-use eco-friendly alternatives for festivities, including reusable decorations, biodegradable seed confetti, and cloth banners that make celebrations sustainable and guilt-free.",
                        "purpose": "Offers easy, ready-to-use alternatives for green celebrations.",
                        "impact": "Helps people make conscious choices and reduces single-use plastic waste.",
                        "category": "Sustainable Products",
                        "image": "assets/Logo.jpg",
                        "gallery": ["assets/Logo.jpg", "assets/Logo.jpg", "assets/Logo.jpg"],
                        "materials": ["Reusable décor items", "Seeds for confetti", "Cloth banners", "Natural dyes"],
                        "difficulty": "Medium",
                        "duration": "3-4 hours",
                        "participants": "8-20 people",
                        "link": "#celebration-kits"
                    },
                    {
                        "id": 6,
                        "title": "Upcycling Workshop",
                        "shortDescription": "Fun, interactive sessions on turning waste into décor and craft items.",
                        "fullDescription": "Our comprehensive Upcycling Workshops provide hands-on training in converting various waste materials into beautiful décor and functional craft items, empowering participants with skills for sustainable living.",
                        "purpose": "Builds awareness and hands-on skills to live more sustainably.",
                        "impact": "Sparks creativity and inspires long-term changes in how we view and handle waste.",
                        "category": "Education & Training",
                        "image": "assets/Logo.jpg",
                        "gallery": ["assets/Logo.jpg", "assets/Logo.jpg", "assets/Logo.jpg"],
                        "materials": ["Various waste materials", "Craft supplies", "Tools", "Instructional guides"],
                        "difficulty": "Beginner to Advanced",
                        "duration": "2-6 hours",
                        "participants": "10-30 people",
                        "link": "#upcycling-workshop"
                    },
                    {
                        "id": 7,
                        "title": "Community Garden Project",
                        "shortDescription": "Creating sustainable community gardens using composted organic waste.",
                        "fullDescription": "The Community Garden Project establishes green spaces in urban areas using composted organic waste, fostering community engagement while promoting sustainable food production and environmental awareness.",
                        "purpose": "Promotes urban sustainability and community building through gardening.",
                        "impact": "Reduces organic waste, improves air quality, and strengthens community bonds.",
                        "category": "Environmental Action",
                        "image": "assets/Logo.jpg",
                        "gallery": ["assets/Logo.jpg", "assets/Logo.jpg", "assets/Logo.jpg"],
                        "materials": ["Organic waste", "Gardening tools", "Seeds", "Compost bins"],
                        "difficulty": "Medium",
                        "duration": "Ongoing project",
                        "participants": "15-50 people",
                        "link": "#community-garden"
                    },
                    {
                        "id": 8,
                        "title": "Eco-Friendly Art Workshop",
                        "shortDescription": "Creating artwork using natural and recycled materials.",
                        "fullDescription": "Our Eco-Friendly Art Workshop encourages artistic expression using only natural and recycled materials, demonstrating that creativity and environmental consciousness can beautifully coexist.",
                        "purpose": "Combines artistic creativity with environmental consciousness.",
                        "impact": "Inspires sustainable art practices and environmental awareness through creativity.",
                        "category": "Arts & Crafts",
                        "image": "assets/Logo.jpg",
                        "gallery": ["assets/Logo.jpg", "assets/Logo.jpg", "assets/Logo.jpg"],
                        "materials": ["Natural pigments", "Recycled paper", "Organic materials", "Eco-friendly brushes"],
                        "difficulty": "Easy to Medium",
                        "duration": "2-3 hours",
                        "participants": "5-20 people",
                        "link": "#eco-art"
                    }
                ]
            };
        }
        
        activitiesData = data.activities;
        filteredActivities = [...activitiesData];
        
        renderActivities();
        showLoading(false);
        
    } catch (error) {
        console.error('Error loading activities:', error);
        showError();
    }
}

// Show/hide loading animation
function showLoading(show) {
    if (show) {
        loadingContainer.style.display = 'flex';
        loadingContainer.style.opacity = '1';
    } else {
        loadingContainer.style.opacity = '0';
        setTimeout(() => {
            loadingContainer.style.display = 'none';
        }, 300);
    }
}

// Show error message
function showError() {
    showLoading(false);
    activitiesGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-light);">
            <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 20px; color: var(--warning-orange);"></i>
            <h3 style="margin-bottom: 15px;">Unable to load activities</h3>
            <p>Please check your connection and try again.</p>
            <button onclick="loadActivities()" style="margin-top: 20px; padding: 12px 24px; background: var(--light-blue); color: white; border: none; border-radius: 25px; cursor: pointer;">
                Try Again
            </button>
        </div>
    `;
}

// Render activities in the grid
function renderActivities() {
    activitiesGrid.innerHTML = '';
    
    if (filteredActivities.length === 0) {
        activitiesGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 20px; color: var(--light-blue);"></i>
                <h3 style="margin-bottom: 15px; color: var(--primary-blue);">No activities found</h3>
                <p style="color: var(--text-light);">Try selecting a different category or view all activities.</p>
            </div>
        `;
        return;
    }

    filteredActivities.forEach((activity, index) => {
        const activityCard = createActivityCard(activity, index);
        activitiesGrid.appendChild(activityCard);
    });

    // Animate cards
    setTimeout(() => {
        const cards = document.querySelectorAll('.activity-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate');
            }, index * 100);
        });
    }, 100);
}

// Create individual activity card
function createActivityCard(activity, index) {
    const card = document.createElement('div');
    card.className = 'activity-card reveal';
    card.setAttribute('data-category', activity.category);
    
    const difficultyClass = `difficulty-${activity.difficulty.toLowerCase().replace(' to ', '-').replace(' ', '-')}`;
    
    card.innerHTML = `
        <div class="activity-image-container">
            <img src="${activity.image}" alt="${activity.title}" class="activity-image" loading="lazy">
            <div class="activity-badge">${activity.category}</div>
            <div class="difficulty-badge ${difficultyClass}">${activity.difficulty}</div>
        </div>
        <div class="activity-content">
            <h3 class="activity-title">${activity.title}</h3>
            <p class="activity-description">${activity.shortDescription}</p>
            <div class="activity-meta">
                <span><i class="fas fa-clock"></i> ${activity.duration}</span>
                <span><i class="fas fa-users"></i> ${activity.participants}</span>
            </div>
            <div class="activity-actions">
                <button class="btn btn-primary" onclick="openModal(${activity.id})">
                    <i class="fas fa-eye"></i> View Details
                </button>
                <a href="${activity.link}" class="btn btn-outline">
                    <i class="fas fa-external-link-alt"></i> Learn More
                </a>
            </div>
        </div>
    `;
    
    // Add click event to card for opening modal
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.activity-actions')) {
            openModal(activity.id);
        }
    });
    
    return card;
}

// Filter functionality
function setupFilterEvents() {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter activities
            if (category === 'all') {
                filteredActivities = [...activitiesData];
            } else {
                filteredActivities = activitiesData.filter(activity => 
                    activity.category === category
                );
            }
            
            // Re-render with animation
            fadeOutAndRender();
        });
    });
}

// Fade out and re-render activities
function fadeOutAndRender() {
    const cards = document.querySelectorAll('.activity-card');
    
    // Fade out existing cards
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
        }, index * 50);
    });
    
    // Render new cards after fade out
    setTimeout(() => {
        renderActivities();
    }, cards.length * 50 + 200);
}

// Modal functionality
function setupModalEvents() {
    // Close modal events
    modalClose.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

// Open modal with activity details
function openModal(activityId) {
    const activity = activitiesData.find(a => a.id === activityId);
    if (!activity) return;
    
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = createModalContent(activity);
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Initialize modal gallery if present
    initializeModalGallery();
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Create modal content
function createModalContent(activity) {
    return `
        <div class="modal-header" style="position: relative; margin-bottom: 30px;">
            <img src="${activity.image}" alt="${activity.title}" 
                 style="width: 100%; height: 300px; object-fit: cover; border-radius: 15px;">
            <div style="position: absolute; bottom: 20px; left: 20px; background: rgba(0,0,0,0.7); padding: 15px 20px; border-radius: 10px; color: white;">
                <h2 style="margin: 0; font-size: 2rem;">${activity.title}</h2>
                <p style="margin: 5px 0 0; opacity: 0.9;">${activity.category}</p>
            </div>
        </div>
        
        <div class="modal-content-body">
            <div class="activity-details-grid" style="display: grid; grid-template-columns: 2fr 1fr; gap: 40px; margin-bottom: 30px;">
                <div class="activity-main-content">
                    <h3 style="color: var(--primary-blue); margin-bottom: 15px; font-size: 1.4rem;">About This Activity</h3>
                    <p style="line-height: 1.8; margin-bottom: 25px; color: var(--text-dark);">${activity.fullDescription}</p>
                    
                    <div style="margin-bottom: 25px;">
                        <h4 style="color: var(--primary-blue); margin-bottom: 10px;">Purpose</h4>
                        <p style="color: var(--text-light); line-height: 1.6;">${activity.purpose}</p>
                    </div>
                    
                    <div>
                        <h4 style="color: var(--primary-blue); margin-bottom: 10px;">Impact</h4>
                        <p style="color: var(--text-light); line-height: 1.6;">${activity.impact}</p>
                    </div>
                </div>
                
                <div class="activity-meta-sidebar">
                    <div class="meta-card" style="background: var(--lighter-blue); padding: 20px; border-radius: 15px; margin-bottom: 20px;">
                        <h4 style="color: var(--primary-blue); margin-bottom: 15px;">Activity Details</h4>
                        <div class="meta-item" style="margin-bottom: 12px; display: flex; justify-content: space-between;">
                            <span><i class="fas fa-signal"></i> Difficulty:</span>
                            <strong>${activity.difficulty}</strong>
                        </div>
                        <div class="meta-item" style="margin-bottom: 12px; display: flex; justify-content: space-between;">
                            <span><i class="fas fa-clock"></i> Duration:</span>
                            <strong>${activity.duration}</strong>
                        </div>
                        <div class="meta-item" style="margin-bottom: 12px; display: flex; justify-content: space-between;">
                            <span><i class="fas fa-users"></i> Participants:</span>
                            <strong>${activity.participants}</strong>
                        </div>
                        <div class="meta-item" style="display: flex; justify-content: space-between;">
                            <span><i class="fas fa-tag"></i> Category:</span>
                            <strong>${activity.category}</strong>
                        </div>
                    </div>
                    
                    <div class="materials-card" style="background: var(--light-gray); padding: 20px; border-radius: 15px;">
                        <h4 style="color: var(--primary-blue); margin-bottom: 15px;">Materials Needed</h4>
                        <ul style="list-style: none; padding: 0;">
                            ${activity.materials.map(material => 
                                `<li style="margin-bottom: 8px; color: var(--text-dark);"><i class="fas fa-check" style="color: var(--success-green); margin-right: 8px;"></i>${material}</li>`
                            ).join('')}
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="activity-gallery" style="margin-top: 40px;">
                <h3 style="color: var(--primary-blue); margin-bottom: 20px;">Gallery</h3>
                <div class="gallery-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                    ${activity.gallery.map((image, index) => 
                        `<img src="${image}" alt="Gallery ${index + 1}" 
                              style="width: 100%; height: 150px; object-fit: cover; border-radius: 10px; cursor: pointer;"
                              onclick="openImageViewer('${image}')">`
                    ).join('')}
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 2px solid var(--border-gray);">
                <h3 style="color: var(--primary-blue); margin-bottom: 15px;">Ready to Get Started?</h3>
                <p style="margin-bottom: 20px; color: var(--text-light);">Join us in making a positive impact through sustainable practices!</p>
                <a href="index.html#contact" class="btn btn-primary" style="display: inline-block;">Contact Us</a>
            </div>
        </div>
    `;
}

// Initialize scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Initialize statistics counters
function initializeStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                setTimeout(() => {
                    animateCounter(entry.target);
                }, 500);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Image viewer for gallery
function openImageViewer(imageSrc) {
    const viewer = document.createElement('div');
    viewer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 20000;
        cursor: pointer;
    `;
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 10px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    `;
    
    viewer.appendChild(img);
    document.body.appendChild(viewer);
    
    viewer.addEventListener('click', () => {
        document.body.removeChild(viewer);
    });
}

// Smooth scroll for internal links
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

// Add loading states to buttons
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn-primary')) {
        const btn = e.target;
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 1500);
    }
});

// Performance optimization: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add search functionality (bonus feature)
function addSearchFunctionality() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search activities...';
    searchInput.style.cssText = `
        padding: 12px 20px;
        border: 2px solid var(--border-gray);
        border-radius: 25px;
        font-size: 1rem;
        width: 300px;
        margin: 20px auto;
        display: block;
        transition: all 0.3s ease;
    `;
    
    searchInput.addEventListener('focus', () => {
        searchInput.style.borderColor = 'var(--light-blue)';
        searchInput.style.boxShadow = '0 0 0 3px rgba(74, 144, 194, 0.1)';
    });
    
    searchInput.addEventListener('blur', () => {
        searchInput.style.borderColor = 'var(--border-gray)';
        searchInput.style.boxShadow = 'none';
    });
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const activeCategory = document.querySelector('.filter-btn.active').getAttribute('data-category');
        
        let searchResults = activitiesData;
        
        if (activeCategory !== 'all') {
            searchResults = activitiesData.filter(activity => activity.category === activeCategory);
        }
        
        if (searchTerm) {
            searchResults = searchResults.filter(activity =>
                activity.title.toLowerCase().includes(searchTerm) ||
                activity.shortDescription.toLowerCase().includes(searchTerm) ||
                activity.category.toLowerCase().includes(searchTerm)
            );
        }
        
        filteredActivities = searchResults;
        fadeOutAndRender();
    });
    
    // Insert search input after filter buttons
    const filterSection = document.querySelector('.filter-section .container');
    filterSection.appendChild(searchInput);
}

// Add search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(addSearchFunctionality, 1000);
});