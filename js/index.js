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

    // ==== Header Scroller with modern scrollY ====
    const header = document.querySelector(".header");
    let lastScrollTop = 0;

    window.addEventListener("scroll", function () {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scrolling down
            header.style.top = "-100px";
        } else {
            // Scrolling up
            header.style.top = "0";
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
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

    let cardWidth = cards[0].offsetWidth + 20;
    let visibleCards = getVisibleCards();
    let maxScrollIndex = cards.length - visibleCards;
    let currentIndex = 0;

    function getVisibleCards() {
        const screenWidth = window.innerWidth;
        if (screenWidth < 600) return 1;
        if (screenWidth < 900) return 2;
        return 3;
    }

    function updateCarousel() {
        cardWidth = cards[0].offsetWidth + 20; // recalculate in case layout changed
        const offset = currentIndex * cardWidth;
        carousel.style.transform = `translateX(-${offset}px)`;
    }

    function handleResize() {
        visibleCards = getVisibleCards();
        maxScrollIndex = cards.length - visibleCards;
        currentIndex = Math.min(currentIndex, maxScrollIndex);
        updateCarousel();
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

    window.addEventListener('resize', handleResize);

    // Initialize
    handleResize();
    updateCarousel();


    //================Video About Us=================//
    const video = document.getElementById("aboutVideo");
    const playBtn = document.getElementById("playButton");

    if (window.innerWidth <= 768) {
        video.play();
    } else {
        playBtn.style.display = "block";
        playBtn.addEventListener("click", () => {
            video.play();
            playBtn.style.display = "none";
        });
    }

});
