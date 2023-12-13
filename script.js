let canvas = document.getElementById('myCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext('2d');

let balls = [];

class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocityY = 0;
    this.gravity = 0.5;
    this.bounceFactor = 0.6;

    this.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    };

    this.update = function () {
      this.velocityY += this.gravity;
      this.y += this.velocityY;

      if (this.y + this.radius > canvas.height) {
        this.y = canvas.height - this.radius;
        this.velocityY *= -this.bounceFactor;
      }

      if (Math.abs(this.velocityY) < 0.1) {
        this.velocityY = 0;
      } else {
        this.velocityY *= 0.99;
      }

      this.draw();
    };
  }
}

canvas.addEventListener('click', function (event) {
  if (balls.length < 15) {
    var newCircle = new Circle(
      event.clientX,
      event.clientY,
      30,
      'red'
    );

    balls.push(newCircle);
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  balls.forEach(function (circle) {
    circle.update();
  });

  requestAnimationFrame(animate);
}

animate();