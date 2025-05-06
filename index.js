
const slides = document.querySelectorAll('.slide');
let current = 0;

function showNextSlide() {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
}

setInterval(showNextSlide, 3000); // every 3 seconds



  document.querySelectorAll('.dropdown-icon').forEach(icon => {
        icon.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent closing on inner click
            const parentItem = this.closest('.nav-item');
            parentItem.classList.toggle('open');

            // Close other open dropdowns
            document.querySelectorAll('.nav-item').forEach(item => {
                if (item !== parentItem) {
                    item.classList.remove('open');
                }
            });
        });
  });

  // Close dropdown when clicking outside
  window.addEventListener('click', () => {
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('open'));
  });


  // Toggle main nav
    const burger = document.getElementById('burger');
    const navMenu = document.getElementById('navMenu');
  burger.addEventListener('click', () => {
        navMenu.classList.toggle('show');
  });

    // Toggle dropdowns
    const toggles = document.querySelectorAll('.dropdown-toggle');
  toggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdown = toggle.parentElement.nextElementSibling;
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        });
  });


// Duplicate images to create infinite scroll effect
const track = document.getElementById('carouselTrack');
const clones = track.innerHTML;
track.innerHTML += clones;


