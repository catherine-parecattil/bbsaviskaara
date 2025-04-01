// Carousel JavaScript for Cards
// Carousel JavaScript for Cards
const wrapper = document.getElementById("cardsWrapper");
let cards = Array.from(document.querySelectorAll(".card"));
const numCards = cards.length;
let currentIndex = 0;

// Increase arcRadius to accommodate larger cards
const arcRadius = 800; // Adjust this value based on the new card size
const arcAngle = 120; // Keep this the same or adjust as needed
const visibleCardCount = 5; // Number of cards to show at once
const cardAngleOffset = arcAngle / (visibleCardCount - 1);

// Function to position cards
function positionCards() {
  cards.forEach((card, i) => {
    let effectiveIndex = i - currentIndex;
    if (effectiveIndex > numCards / 2) {
      effectiveIndex -= numCards;
    } else if (effectiveIndex <= -numCards / 2) {
      effectiveIndex += numCards;
    }
    
    let displayIndex;
    if (effectiveIndex >= -Math.floor(visibleCardCount / 2) && effectiveIndex <= Math.floor(visibleCardCount / 2)) {
      displayIndex = effectiveIndex;
    } else {
      displayIndex = 1000; // Hide card if outside visible range
    }

    let angle = 0;
    let x = 0;
    let y = 0;
    let rotate = 0;
    let scaleFactor = 0.9; // Adjust this to control the size of adjacent cards
    let opacityFactor = 0.2; // Default opacity for adjacent cards
    let zIndex = 1;

    if (Math.abs(displayIndex) < 3) { // For the 5 visible cards
      angle = displayIndex * cardAngleOffset;
      const angleRad = angle * Math.PI / 180;
      x = arcRadius * Math.sin(angleRad);
      y = -arcRadius * Math.cos(angleRad) + arcRadius * 0.6; // Adjust Y position if needed
      rotate = angle;
      scaleFactor = 1 - Math.abs(displayIndex) * 0.1; // Adjust scaling for adjacent cards
      opacityFactor = 1 - Math.abs(displayIndex) * 0.5; // Adjust opacity for adjacent cards
      zIndex = 10 - Math.abs(displayIndex) * 2;

      card.className = 'card';
      if (displayIndex === 0 && effectiveIndex === 0) {
        card.classList.add('active');
        opacityFactor = 1; // Fully visible for the active card
      } else if (Math.abs(displayIndex) === 1 && Math.abs(effectiveIndex) <= 1) {
        card.classList.add('adjacent');
      }
    } else {
      scaleFactor = 0; // Hide card
      opacityFactor = 0; // Fully transparent
      zIndex = -1;
      card.className = 'card';
    }

    // Apply transformations
    card.style.transform = `translateX(${x}px) translateY(${y}px) rotate(${rotate}deg) scale(${scaleFactor})`;
    card.style.opacity = Math.max(0, opacityFactor);
    card.style.zIndex = zIndex;
  });
}

// Automatic movement of cards
let autoMoveInterval = setInterval(() => {
  currentIndex = (currentIndex + 1) % numCards; // Move to the next card
  positionCards();
}, 1500); // Change card every 1.5 seconds (1500 milliseconds)

// Stop automatic movement on hover
wrapper.addEventListener('mouseenter', () => {
  clearInterval(autoMoveInterval);
});

// Resume automatic movement on mouse leave
wrapper.addEventListener('mouseleave', () => {
  autoMoveInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % numCards; // Move to the next card
    positionCards();
  }, 1500); // Change card every 1.5 seconds (1500 milliseconds)
});

// Swipe functionality for touch devices
let startX = 0;
let endX = 0;

wrapper.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX; // Get the starting touch position
});

wrapper.addEventListener('touchmove', (e) => {
  endX = e.touches[0].clientX; // Get the current touch position
});

wrapper.addEventListener('touchend', () => {
  if (startX > endX + 50) {
    // Swipe left
    currentIndex = (currentIndex + 1) % numCards; // Move to the next card
  } else if (startX < endX - 50) {
    // Swipe right
    currentIndex = (currentIndex - 1 + numCards) % numCards; // Move to the previous card
  }
  positionCards();
});

// Mouse drag functionality for desktop
let isDragging = false;
let dragStartX = 0;

wrapper.addEventListener('mousedown', (e) => {
  isDragging = true;
  dragStartX = e.clientX; // Get the starting mouse position
  clearInterval(autoMoveInterval); // Stop automatic movement
});

wrapper.addEventListener('mousemove', (e) => {
  if (isDragging) {
    endX = e.clientX; // Get the current mouse position
  }
});

wrapper.addEventListener('mouseup', () => {
  if (isDragging) {
    if (dragStartX > endX + 50) {
      // Drag left
      currentIndex = (currentIndex + 1) % numCards; // Move to the next card
    } else if (dragStartX < endX - 50) {
      // Drag right
      currentIndex = (currentIndex - 1 + numCards) % numCards; // Move to the previous card
    }
    positionCards();
    isDragging = false; // Reset dragging state
  }
});

// Prevent default behavior for mouse leave
wrapper.addEventListener('mouseleave', () => {
  if (isDragging) {
    isDragging = false; // Reset dragging state
  }
});

// Initial call to positionCards to set up the carousel
positionCards();

  // Add event listeners for the arrows
document.getElementById('nextArrow').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % numCards; // Move to the next card
  positionCards();
});
  

      


function toggleFAQ(id) {
    let answer = document.getElementById(`answer-${id}`);
    let icon = document.getElementById(`icon-${id}`);

    if (answer.classList.contains("hidden")) {
        answer.classList.remove("hidden");
        icon.style.transform = "rotate(180deg)"; // Rotate icon when expanded
    } else {
        answer.classList.add("hidden");
        icon.style.transform = "rotate(0deg)"; // Reset icon rotation when collapsed
    }
}




// Toggle menu function
function toggleMenu() {
    const menu = document.getElementById('menuOverlay');
    menu.classList.toggle('active');
    menu.classList.toggle('hidden');
}

// Close menu when clicking outside
document.getElementById('menuOverlay').addEventListener('click', function(e) {
    if (e.target === this) {
        closeMenu();
    }
});

// Close menu when clicking a menu item
function closeMenu() {
    const menu = document.getElementById('menuOverlay');
    menu.classList.add('hidden');
    menu.classList.remove('active');
}

// Smooth Scroll for Menu Items
document.querySelectorAll('.menu-list a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 50,
                behavior: 'smooth'
            });
        }
        closeMenu(); // Close menu after scrolling
    });
});






document.addEventListener("DOMContentLoaded", () => {
            const quoteContainer = document.getElementById("quote-container");
            let letters = quoteContainer.innerText.split("").map(letter =>
                letter === " " ? "&nbsp;" : `<span class='quote-letter'>${letter}</span>`
            ).join('');
            quoteContainer.innerHTML = letters;

            const letterElements = document.querySelectorAll(".quote-letter");
            let lastScrollTop = 0;
            let visibleLetters = 0;
            let delay = 10;
            let fadeDelay = 10; // Changed from 0 to 10 to make fade-out smoother

            window.addEventListener("scroll", () => {
                let scrollTop = window.scrollY || document.documentElement.scrollTop;
                let scrollingDown = scrollTop > lastScrollTop;
                lastScrollTop = scrollTop;

                if (scrollingDown) {
                    if (visibleLetters < letterElements.length) {
                        let start = visibleLetters;
                        visibleLetters = Math.min(visibleLetters + 5, letterElements.length);
                        for (let i = start; i < visibleLetters; i++) {
                            setTimeout(() => {
                                letterElements[i].style.color = "rgb(255,255,255)";
                            }, (i - start) * delay);
                        }
                    }
                } else {
                    if (visibleLetters > 0) {
                        let end = visibleLetters;
                        visibleLetters = Math.max(visibleLetters - 5, 0);
                        for (let i = end - 1; i >= visibleLetters; i--) {
                            setTimeout(() => {
                                letterElements[i].style.color = "rgb(26,26,26)";
                            }, (end - 1 - i) * fadeDelay);
                        }
                    }
                }
            });
        });



        function openLink(url) {
          window.open(url, '_blank');
      }
      
      function contactUs() {
          window.location.href = 'mailto:ouremail@gmail.com';
      }
      