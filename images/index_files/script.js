const cvs = document.querySelector("canvas");
            const c = cvs.getContext("2d");

cvs.width = window.innerWidth;
cvs.height = window.innerHeight;

window.addEventListener("resize", function() {
  cvs.width = window.innerWidth;
  cvs.height = window.innerHeight;
});


class Scratch {
  constructor(x, y, dx, dy, width) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.width = width;
    this.minWidth = width;
    this.maxWidth = width * 3;

    let colorArray = ["#764AF1", "#F2F2F2", "#F32424", "#FFCD38", "#FF8D29", "#36AE7C"];

    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  }

  draw = () => {
    c.beginPath();
    c.moveTo(this.x, this.y);
    c.arc(this.x, this.y, Math.random() / 4, 0, 2 * Math.PI, true);
  
    c.fillStyle = this.color;
    c.fill();

    this.update();
  };

  update = () => {
    if (
      this.x + this.width / 2 >= window.innerWidth ||
      this.x - this.width / 2 <= 0
    ) {
      this.dx = -this.dx;
    }

    if (
      this.y + this.width / 2 >= window.innerHeight ||
      this.y - this.width / 2 <= 0
    ) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    // interactivity
    if (
      this.x < 0 &&
      this.x > 0 &&
      this.y < 0 &&
      this.width < this.maxWidth
    ) {
      this.x -= Math.sin(this.x) * this.maxWidth;
      this.y -= Math.sin(this.y) * this.maxWidth;
    } else if (this.width > this.minWidth) {
      this.width -= 1;
      this.x += 1;
      this.y += 1;
    }
  };
}

let scratchArray = [];

for (let i = 0; i < 1000; i++) {
  let width = Math.random() * Math.PI + 4;
  let x = Math.random() * window.innerWidth;
  let dx = (Math.random() - 0.5) * 1;
  let y = Math.random() * window.innerHeight;
  let dy = (Math.random() - .5) * 1;
  scratchArray.push(new Scratch(x, y, dx, dy, width));
}

function animate() {
  requestAnimationFrame(animate);

  scratchArray.forEach(scratch => {
    scratch.draw();
  });
}

animate();
