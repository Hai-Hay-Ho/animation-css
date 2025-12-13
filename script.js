document.addEventListener("DOMContentLoaded", () => {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const question = document.querySelector(".question");
  const buttons = document.querySelector(".buttons");
  const successMessage = document.querySelector(".success-message");
  const body = document.body;

  // Logic for "No" button escaping
  // Logic for "No" button escaping
  const moveButton = () => {
    // Check if the button is still inside the card (or other container)
    // If so, move it to body so 'fixed' positioning works relative to the viewport
    // and isn't affected by 'backdrop-filter' or 'transform' on the card.
    if (noBtn.parentNode !== body) {
        body.appendChild(noBtn);
    }

    // Add a safe margin to prevent sticking to edges
    const margin = 50; 
    
    // Calculate available space
    const maxWidth = window.innerWidth - noBtn.offsetWidth - margin;
    const maxHeight = window.innerHeight - noBtn.offsetHeight - margin;

    // Ensure we don't get negative values if screen is too small
    const safeMaxWidth = Math.max(0, maxWidth);
    const safeMaxHeight = Math.max(0, maxHeight);

    const x = Math.random() * (safeMaxWidth - margin) + margin;
    const y = Math.random() * (safeMaxHeight - margin) + margin;

    noBtn.style.position = "fixed"; 
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    noBtn.style.zIndex = "100"; // Ensure it stays on top
  };

  noBtn.addEventListener("mouseover", moveButton);
  // Add touch start for mobile devices so it jumps before tap completes
  noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault(); // prevent click
    moveButton();
  });

  // Logic for "Yes" button
  yesBtn.addEventListener("click", () => {
    question.classList.add("hidden");
    buttons.classList.add("hidden");
    
    // Explicitly hide the "No" button since it might be outside the buttons container
    noBtn.style.display = "none";
    
    successMessage.classList.remove("hidden");
    createHearts();
  });

  // Floating hearts animation function
  function createHearts() {
    const interval = setInterval(() => {
      const heart = document.createElement("div");
      heart.classList.add("floating-heart");
      heart.innerHTML = "❤️";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = Math.random() * 2 + 3 + "s";
      body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 5000);
    }, 300);

    // Stop creating hearts after 10 seconds to save performance
    setTimeout(() => clearInterval(interval), 10000);
  }
});
