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

    // === Search Mapping and Input Logic ===
    const searchMap = [
        {
            keywords: ["home", "homepage", "main page"],
            action: () => window.location.href = "../html/index.html"
        },
        {
            keywords: ["who we are", "team", "staff", "about us"],
            action: () => window.location.href = "../html/about.html#whoWeAre"
        },
        {
            keywords: ["mission", "vision", "goals", "purpose"],
            action: () => window.location.href = "../html/about.html#mission"
        },
        {
            keywords: ["asset integrity", "lifting integrity"],
            action: () => window.location.href = "../html/services.html#lifting"
        },
        {
            keywords: ["crane and lifting", "crane lifting"],
            action: () => window.location.href = "../html/craneLifting.html"
        },
        {
            keywords: ["maintenance", "maintenance management"],
            action: () => window.location.href = "../html/maintenance.html"
        },
        {
            keywords: ["process integrity"],
            action: () => window.location.href = "../html/process.html"
        },
        {
            keywords: ["structural integrity"],
            action: () => window.location.href = "../html/structural.html"
        },
        {
            keywords: ["trim concept", "trim"],
            action: () => window.location.href = "../html/trim.html"
        },
        {
            keywords: ["drilling", "drilling equipment"],
            action: () => window.location.href = "../html/IServices.html#drilling-equipment"
        },
        {
            keywords: [
                "lifting appliances",
                "static pressurised equipment",
                "hull and structures",
                "storage tank",
                "pressure safety valves",
                "instrument calibration",
                "jacking systems",
                "dropped object management",
                "non-destructive testing",
                "ndt",
                "fabrication follow-up",
                "fabrication",
                "welding solutions",
                "welding",
                "coating solutions",
                "coating",
                "engineering solutions",
                "engineering & products",
                "engineering",
                "compliances"
            ],
            action: () => window.location.href = "../html/services.html#service1-details"
        },
        {
            keywords: ["contact", "contact us", "reach us"],
            action: () => window.location.href = "../html/form.html"
        },
        {
            keywords: ["about"],
            action: () => {
                const aboutSection = document.getElementById("about");
                if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: "smooth" });
                } else {
                    alert("About section not found.");
                }
            }
        },
        {
            keywords: ["services", "our services"],
            action: () => {
                const servicesSection = document.getElementById("services-section");
                if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: "smooth" });
                } else {
                    alert("Services section not found.");
                }
            }
        }
    ];

    function showAlert(message) {
        alert(message);
    }

    function handleSearch() {
        const inputElement = document.getElementById("searchInput");
        if (!inputElement) {
            console.error("Search input element not found.");
            return;
        }

        const query = inputElement.value.toLowerCase().trim();

        if (!query) {
            showAlert("Please enter a search term.");
            return;
        }

        for (const item of searchMap) {
            if (item.keywords.some(kw => query.includes(kw))) {
                item.action();
                if (searchOverlay) searchOverlay.style.display = 'none';
                return;
            }
        }

        const suggestions = ["home", "about", "services", "contact"]
            .filter(s => !query.includes(s))
            .join(", ");

        showAlert(`No results found for: "${query}". Try searching for: ${suggestions}`);
    }

    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");

    if (searchButton) {
        searchButton.addEventListener("click", function (e) {
            e.preventDefault();
            handleSearch();
        });
    }
    if (searchInput) {
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                handleSearch();
            }
        });
    }

    // ==== Header Scroller with modern scrollY ====
    const header = document.querySelector(".header");
    let lastScrollTop = 0;

    if (header) {
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
    }

    // === Image Slider Logic ===
    const slides = document.querySelectorAll('.slide');
    let current = 0;

    function showNextSlide() {
        if (slides.length === 0) return;
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }

    if (slides.length > 0) {
        setInterval(showNextSlide, 3000); // every 3 seconds
    }

    // === Dropdowns for Large Screens ===
    document.querySelectorAll('.dropdown-icon').forEach(icon => {
        icon.addEventListener('click', function (e) {
            e.stopPropagation();
            const parentItem = this.closest('.nav-item');
            if (!parentItem) return;
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
            const navItem = toggle.closest('.nav-item');
            if (!navItem) return;
            const dropdown = navItem.querySelector('.dropdown-menu');
            if (!dropdown) return;

            // Toggle dropdown display
            if (dropdown.style.display === 'block') {
                dropdown.style.display = 'none';
            } else {
                // Close others inside navMenu first
                navMenu.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.style.display = 'none';
                });
                dropdown.style.display = 'block';
            }
        });
    });

    // === Duplicate images to create infinite scroll effect ===
    const track = document.getElementById('carouselTrack');
    if (track) {
        const clones = track.innerHTML;
        track.innerHTML += clones;
    }

    // === Service Carousel Logic ===
    const carousel = document.getElementById('servicesCarousel');
    const cards = document.querySelectorAll('.service-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (carousel && cards.length && prevBtn && nextBtn) {
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
            cardWidth = cards[0].offsetWidth + 20;
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
    }

    //================Video About Us=================//
    const video = document.getElementById("aboutVideo");
    const playBtn = document.getElementById("playButton");

    if (video) {
        if (window.innerWidth <= 768) {
            video.play();
        } else if (playBtn) {
            playBtn.style.display = "block";
            playBtn.addEventListener("click", () => {
                video.play();
                playBtn.style.display = "none";
            });
        }
    }
});
