document.getElementById('modeSwitch').addEventListener('click', function () {
  const body = document.body;
  const modeSwitch = document.getElementById('modeSwitch');

  // Toggle between light and dark modes
  body.classList.toggle('light-mode');

  // Update button text based on mode
  if (body.classList.contains('light-mode')) {
      modeSwitch.textContent = 'Dark Mode';
  } else {
      modeSwitch.textContent = 'Light Mode';
  }
});


let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;

    if (index >= totalSlides) {
        currentIndex = 0; // Loop back to the first slide
    } else if (index < 0) {
        currentIndex = totalSlides - 1; // Loop back to the last slide
    } else {
        currentIndex = index;
    }

    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update active indicator
    document.querySelectorAll('.indicator').forEach((indicator, i) => {
        indicator.classList.toggle('active', i === currentIndex);
    });
}

// Automatically change slides every few seconds
setInterval(() => {
    showSlide(currentIndex + 1);
}, 3000);

// Set initial slide
showSlide(currentIndex);

let words = document.querySelectorAll(".word");

words.forEach(word => {
  let letters = word.textContent.split("");
  word.textContent = "";
  letters.forEach(letter => {
    let span = document.createElement("span");
    span.textContent = letter;
    span.className = "letter";
    word.append(span);
  });
});

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;

// Set the initial word's opacity to 1
words[currentWordIndex].style.opacity = "1";

let rotateText = () => {
  let currentWord = words[currentWordIndex];
  let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];
  
  // Rotate out letters of the current word
  Array.from(currentWord.children).forEach((letter, i) => {
    setTimeout(() => {
      letter.className = "letter out";
    }, i * 80);
  });

  // Reveal and rotate in letters of the next word
  nextWord.style.opacity = "1";
  Array.from(nextWord.children).forEach((letter, i) => {
    letter.className = "letter behind";
    setTimeout(() => {
      letter.className = "letter in";
    }, 340 + i * 80);
  });

  // Update currentWordIndex for the next iteration
  currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

rotateText();
setInterval(rotateText, 4000);

document.querySelectorAll('.show-btn').forEach(button => {
  button.addEventListener('click', function() {
      const detailsId = this.getAttribute('data-id');
      const detailsElement = document.getElementById(`details-${detailsId}`);
      
      if (detailsElement.style.display === "none" || detailsElement.style.display === "") {
          detailsElement.style.display = "block";
          this.textContent = "Hide Details";
      } else {
          detailsElement.style.display = "none";
          this.textContent = "Show Details";
      }
  });
});


function applyGlowInTextEffect(selector) {
  
  let glowInTexts = document.querySelectorAll(selector);
  
  glowInTexts.forEach(glowInText => {
   
      let letters = glowInText.textContent.split("");
      glowInText.textContent = ""; // Clear the original text

   
      letters.forEach((letter, i) => {
          let span = document.createElement("span");
          span.textContent = letter; 
          span.style.animationDelay = `${i * 0.05}s`; 
          glowInText.append(span); 
      });
  });
}

// Call the function on page load or when needed
document.addEventListener("DOMContentLoaded", () => {
  applyGlowInTextEffect(".glowIn");
});
