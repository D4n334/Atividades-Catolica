document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded!');
  
    const canvas = document.getElementById('spaceCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    const stars = [];
    const numStars = 200;
  
    for (let i = 0; i < numStars; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 1.5;
        const speed = Math.random() * 0.15;
        const direction = Math.random() * 2 * Math.PI; // adiciona uma direção aleatória
        stars.push({ x, y, radius, speed, direction });
      }
      
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        for (let star of stars) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
          ctx.fill();
      
          // atualiza a posição da estrela com base na direção e velocidade
          star.x += Math.cos(star.direction) * star.speed;
          star.y += Math.sin(star.direction) * star.speed;
      
          if (star.x > canvas.width || star.x < 0 || star.y > canvas.height || star.y < 0) {
            star.x = Math.random() * canvas.width;
            star.y = Math.random() * canvas.height;
            star.direction = Math.random() * 2 * Math.PI; // redefine a direção aleatória
          }
        }
      
        requestAnimationFrame(animate);
      }
  
    animate();
  });