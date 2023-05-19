// Background Animation JavaScript

// Create the animation canvas
const canvas = document.getElementById('animation-canvas');
const ctx = canvas.getContext('2d');

// Function to refresh the animation
function refreshAnimation() {
  // Set the canvas size to match the window
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Generate random particles
  const particles = [];
  const particleCount = 100;
  const particleSize = 15; // Adjust this value to change the particle size

  for (let i = 0; i < particleCount; i++) {
    const particle = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * particleSize + 1, // Use particleSize variable
      speedX: Math.random() * 3 - 1.5,
      speedY: Math.random() * 3 - 1.5,
      shape: '',
    };

    // Randomly assign a shape to the particle
    const shapeNum = Math.random();
    if (shapeNum < 0.33) {
      particle.shape = 'square';
    } else if (shapeNum < 0.67) {
      particle.shape = 'triangle';
    } else {
      particle.shape = 'circle';
    }

    particles.push(particle);
  }

  // Animation loop
  function animate() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the particles
    particles.forEach((particle) => {
      // Set the desired shape color
      ctx.fillStyle = '#77a6b4';

      if (particle.shape === 'square') {
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
      } else if (particle.shape === 'triangle') {
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(particle.x + particle.size, particle.y);
        ctx.lineTo(particle.x + particle.size / 2, particle.y + particle.size);
        ctx.closePath();
        ctx.fill();
      } else if (particle.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      // Move the particles
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Bounce off the walls
      if (particle.x + particle.size > canvas.width || particle.x - particle.size < 0) {
        particle.speedX *= -1;
      }

      if (particle.y + particle.size > canvas.height || particle.y - particle.size < 0) {
        particle.speedY *= -1;
      }
    });

    // Call the next frame
    requestAnimationFrame(animate);
  }

  // Start the animation
  animate();
}

// Call the refreshAnimation function to initialize the animation
refreshAnimation();

// Event listener for window resize
window.addEventListener('resize', refreshAnimation);
