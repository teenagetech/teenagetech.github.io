const canvas = document.getElementById('animation-canvas');
const ctx = canvas.getContext('2d');

function refreshAnimation() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const particles = [];
  const particleCount = 100;
  const particleSize = 20;

  for (let i = 0; i < particleCount; i++) {
    const particle = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * particleSize + 1,
      speedX: Math.random() * 3 - 1.5,
      speedY: Math.random() * 3 - 1.5,
      shape: '',
    };

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

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      ctx.fillStyle = '#77a6b4';

      if (particle.shape === 'square') {
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
      } else if (particle.shape === 'triangle') {
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(particle.x + particle.size / 2, particle.y + particle.size);
        ctx.lineTo(particle.x + particle.size, particle.y);
        ctx.closePath();
        ctx.fill();
      } else if (particle.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      particle.x += particle.speedX;
      particle.y += particle.speedY;

      if (particle.x + particle.size > canvas.width || particle.x - particle.size < 0) {
        particle.speedX *= -1;
      }

      if (particle.y + particle.size > canvas.height || particle.y - particle.size < 0) {
        particle.speedY *= -1;
      }
    });
    requestAnimationFrame(animate);
  }
  animate();
}

refreshAnimation();

window.addEventListener('resize', refreshAnimation);
