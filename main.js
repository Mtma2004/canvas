let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let circleArray = [];
let hue = 0;
window.addEventListener("resize", function () {
  canvas.width = this.window.innerWidth;
  canvas.height = this.window.innerHeight;
});
// make the cordenate of mouse global
let mouse = {
  x: undefined,
  y: undefined,
};

canvas.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
  for (let i = 0; i < 50; i++) {
    // circleArray.push(new Circle());
    circleArray[i].x = mouse.x;
    circleArray[i].y = mouse.y;
  }
});
canvas.addEventListener("click", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
  for (let i = 0; i < 50; i++) {
    // circleArray.push(new Circle());
    circleArray[i].x = mouse.x;
    circleArray[i].y = mouse.y;
  }
});

class Circle {
  constructor() {
    // (this.x = mouse.x),
    //   (this.y = mouse.y),
    (this.x = Math.random() * canvas.width),
      (this.y = Math.random() * canvas.height),
      (this.size = Math.random() * 15 + 1),
      (this.speedX = Math.random() * 3 - 1.5),
      (this.speedY = Math.random() * 3 - 1.5),
      (this.color = `hsl(${hue} , 100% , 50%)`);
  }
  update() {
    //make the circle move randomly
    this.x += this.speedX;
    this.y += this.speedY;

    // make the circle shrinke
    if (this.size > 0.3) {
      this.size -= 0.1;
    }
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

function handleCircle() {
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
    circleArray[i].draw();

    //lines between circles
    for (let j = i; j < circleArray.length; j++) {
      let dx = circleArray[i].x - circleArray[j].x;
      let dy = circleArray[i].y - circleArray[j].y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = circleArray[i].color;
        ctx.lineWidth = circleArray[i].size / 10;
        ctx.moveTo(circleArray[i].x, circleArray[i].y);
        ctx.lineTo(circleArray[j].x, circleArray[j].y);
        ctx.stroke();
      }
    }
    // remove the very small circle from array
    if (circleArray[i].size <= 0.5) {
      circleArray.splice(i, 1);
      i--;
    }
  }
}
function init() {
  for (let i = 0; i < 3; i++) {
    circleArray.push(new Circle());
  }
  requestAnimationFrame(init);
}
init();

function animation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.fillStyle = "rgb(0 ,0 ,0 , 0.1)";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  hue += 3;
  handleCircle();
  requestAnimationFrame(animation);
}
requestAnimationFrame(animation);
