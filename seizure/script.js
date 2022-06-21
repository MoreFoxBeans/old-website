let animation;
let frame = 0;
let audio = new Audio('nyan.mp3');
let canvas, ctx;
let size;
let int = 1;
let paused = false;
let past = false;

let colors = [
  '#ff0000',
  '#00ffff',
  '#00ff00',
  '#ff00ff',
  '#0000ff',
  '#ffff00',
];

audio.loop = true;

function draw() {
  ctx.fillStyle = colors[Math.floor(frame / int) % colors.length];
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let ofx = Math.random() * size - size;
  let ofy = Math.random() * size - size;

  let dfx;
  let dfy;
  
  for (let x = 0; x < Math.ceil(canvas.width / size) + 1; x++) {
    for (let y = 0; y < Math.ceil(canvas.height / size) + 1; y++) {
      if (((x + y) % 2) == 0) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(x * size + ofx, y * size + ofy, size, size);
        
        dfx = 0 - Math.sin(frame / 20 + x) * size / 2;
        dfy = Math.cos(frame / 20 + y) * size / 2;
      }
      
      if (Math.random() <= 0.4) {
        ctx.beginPath();
        ctx.fillStyle = "#ffffff";
        ctx.ellipse(x * size + dfx, y * size + dfy, size / 20, size / 20, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

function animate() {
  if (!paused) {
    draw();
    
    frame++;
  }
  
  animation = requestAnimationFrame(animate);
}

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  size = Math.floor(window.innerWidth / 20);

  if (past) {
    draw();
  }
}

function setup() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  
  document.getElementById('next').addEventListener('click', function () {
    document.getElementById('pageMain').style = 'display: none;';
    document.getElementById('pageSecondary').style = '';
  });

  document.getElementById('continue').addEventListener('click', function () {
    document.getElementById('pageSecondary').style = 'display: none;';
    animation = requestAnimationFrame(animate);
    past = true;
    
    audio.play();

    draw();
  });

  window.addEventListener('resize', resize);

  window.addEventListener('keydown', function (e) {
    if (e.code == 'Space') {
      paused = !paused;
      audio.muted = paused;
      
      e.preventDefault();
    } else if (e.code == 'KeyQ') {
      paused = false;
      audio.muted = false;

      window.setTimeout(function () {
        paused = true;
        audio.muted = true;
      }, 100);
    }
  });

  resize();
}
