document.addEventListener('DOMContentLoaded', function () {
    // === Search Overlay Logic ===
    const searchToggleDesktop = document.querySelector('.topNavItems .search-visible');
    const searchToggleBurger = document.querySelector('.topNavItemsBurger .search-visible');
    const searchOverlay = document.getElementById('searchOverlay');
    const closeSearch = document.getElementById('closeSearch');

    function showSearchOverlay(e) {
        e.preventDefault();
        if (searchOverlay) searchOverlay.style.display = 'flex';
    }

    function hideSearchOverlay() {
        if (searchOverlay) searchOverlay.style.display = 'none';
    }

    if (searchToggleDesktop) searchToggleDesktop.addEventListener('click', showSearchOverlay);
    if (searchToggleBurger) searchToggleBurger.addEventListener('click', showSearchOverlay);
    if (closeSearch) closeSearch.addEventListener('click', hideSearchOverlay);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') hideSearchOverlay();
    });

    // === Image Slider Logic ===
    const slides = document.querySelectorAll('.slide');
    let current = 0;

    function showNextSlide() {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }

    setInterval(showNextSlide, 3000); // every 3 seconds


    // === Dropdowns for Large Screens ===
    document.querySelectorAll('.dropdown-icon').forEach(icon => {
        icon.addEventListener('click', function (e) {
            e.stopPropagation();
            const parentItem = this.closest('.nav-item');
            parentItem.classList.toggle('open');

            document.querySelectorAll('.nav-item').forEach(item => {
                if (item !== parentItem) {
                    item.classList.remove('open');
                }
            });
        });
    });

    window.addEventListener('click', () => {
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('open'));
    });

    // === Burger Menu Toggle ===
    const burger = document.getElementById('burger');
    const navMenu = document.getElementById('navMenu');

    if (burger && navMenu) {
        burger.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }

    // === Dropdown Toggle for Burger Menu ===
    const toggles = document.querySelectorAll('.dropdown-toggle');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdown = toggle.closest('.nav-item')?.querySelector('.dropdown-menu');
            if (dropdown) {
                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
            }
        });
    });

    // === Search Button Logic ===
    const searchButton = document.getElementById("searchButton");
    if (searchButton) {
        searchButton.addEventListener("click", function (e) {
            e.preventDefault();
            const queryInput = document.getElementById("searchInput");
            const query = queryInput?.value.trim();

            if (query) {
                console.log("Searching for:", query); // Replace with real logic
                queryInput.value = "";
            } else {
                alert("Please enter a search query.");
            }
        });
    }


    // Duplicate images to create infinite scroll effect
    const track = document.getElementById('carouselTrack');
    const clones = track.innerHTML;
    track.innerHTML += clones;

    // === Service Carousel Logic ===
    const carousel = document.getElementById('servicesCarousel');
    const cards = document.querySelectorAll('.service-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    const cardWidth = cards[0].offsetWidth + 20; // width + gap
    const visibleCards = 3;
    const maxScrollIndex = cards.length - visibleCards;

    let currentIndex = 0;

    function updateCarousel() {
        const offset = currentIndex * cardWidth;
        carousel.style.transform = `translateX(-${offset}px)`;
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < maxScrollIndex) {
            currentIndex++;
            updateCarousel();
        }
    });

    updateCarousel();



});
