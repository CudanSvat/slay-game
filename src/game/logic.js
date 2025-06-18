export default function initGame(canvas) {
  const ctx = canvas.getContext('2d');
  const balls = [];
  const size = 32;
  const colors = [
    '#ff4757', '#1e90ff', '#2ed573', '#ffa502', '#eccc68',
    '#ff6b81', '#5352ed', '#70a1ff', '#7bed9f', '#f1f2f6'
  ];

  for (let i = 0; i < 10; i++) {
    balls.push({
      x: Math.random() * (480 - size),
      y: Math.random() * (480 - size),
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      color: colors[i],
      alive: true
    });
  }

  function drawArena() {
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, 512, 512);

    // Draw top and bottom holes
    ctx.clearRect(192, 0, 128, 10);
    ctx.clearRect(192, 502, 128, 10);

    // Draw obstacles (bumpers)
    ctx.fillStyle = '#444';
    ctx.fillRect(160, 64, 192, 32);
    ctx.fillRect(160, 416, 192, 32);
  }

  function drawBalls() {
    for (const ball of balls) {
      if (!ball.alive) continue;
      ctx.fillStyle = ball.color;
      ctx.fillRect(ball.x, ball.y, size, size);
    }
  }

  function update() {
    for (const ball of balls) {
      if (!ball.alive) continue;

      ball.x += ball.vx;
      ball.y += ball.vy;

      // Bounce off walls
      if (ball.x <= 0 || ball.x + size >= 512) ball.vx *= -1;
      if (ball.y <= 0 || ball.y + size >= 512) ball.vy *= -1;

      // Check if ball exited through holes
      if ((ball.y <= 0 && ball.x >= 192 && ball.x <= 320) ||
          (ball.y + size >= 512 && ball.x >= 192 && ball.x <= 320)) {
        ball.alive = false;
      }
    }
  }

  function gameLoop() {
    drawArena();
    update();
    drawBalls();
    requestAnimationFrame(gameLoop);
  }

  gameLoop();
}
