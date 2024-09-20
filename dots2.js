var canvas = document.getElementById("dots"),
    ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.scrollHeight;
}

var stars = [],
    FPS = 60,
    x = 100,
    mouse = {
      x: 0,
      y: 0
    };

function createStars() {
  stars = [];
  for (var i = 0; i < x; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1 + 1,
      vx: Math.floor(Math.random() * 30) - 25,
      vy: Math.floor(Math.random() * 30) - 25
    });
  }
}

resizeCanvas();
createStars();

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.globalCompositeOperation = "lighter";

  for (var i = 0, x = stars.length; i < x; i++) {
    var s = stars[i];

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.stroke();
  }

  ctx.beginPath();
  for (var i = 0, x = stars.length; i < x; i++) {
    var starI = stars[i];
    ctx.moveTo(starI.x, starI.y);
    if (distance(mouse, starI) < 150) ctx.lineTo(mouse.x, mouse.y);
    for (var j = 0, x = stars.length; j < x; j++) {
      var starII = stars[j];
      if (distance(starI, starII) < 150) {
        ctx.lineTo(starII.x, starII.y);
      }
    }
  }
  ctx.lineWidth = 0.2;
  ctx.strokeStyle = '#7e94ab';
  ctx.stroke();
}

function distance(point1, point2) {
  var xs = point2.x - point1.x;
  var ys = point2.y - point1.y;

  return Math.sqrt(xs * xs + ys * ys);
}

function update() {
  for (var i = 0, x = stars.length; i < x; i++) {
    var s = stars[i];

    s.x += s.vx / FPS;
    s.y += s.vy / FPS;

    if (s.x < 0 || s.x > canvas.width) s.vx = -s.vx;
    if (s.y < 0 || s.y > canvas.height) s.vy = -s.vy;
  }
}

canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener('resize', function() {
  resizeCanvas();
  createStars();
});

function tick() {
  draw();
  update();
  requestAnimationFrame(tick);
}

tick();
