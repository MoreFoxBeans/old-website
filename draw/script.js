window.onresize = resize;

const colors = [
  '#353742', // black
  '#60636e', // grey
  '#a5a6ad', // silver
  '#d4b49b', // tan
  '#523a26', // brown
  '#a61f31', // crimson
  '#e3773d', // orange
  '#f7e85c', // yellow
  '#56d17f', // green
  '#2b874a', // forest
  '#60d4e6', // cyan
  '#919eeb', // sky
  '#475ac9', // blue
  '#9b56c7', // purple
  '#db65ae', // magenta
  '#ebb0c6', // pink
  '#c94254', // red
];

let socket;
let canvas, ctx;
let cursorDiv;
let preview;
let drawing = false;
let cx, cy;
let px, py;
let touches = 0;
let password = '';

let clients = {};
let cursors = {};
let id = Math.floor((Date.now() - 1648076429179) * Math.random());
let last = 0;
let size = 10;
let color = colors[0];
let over = 'source';

function updatePreview() {
  preview.style.setProperty('--size', size / (canvas.height / canvas.offsetHeight) + 'px');
  preview.style.setProperty('--color', color);
}

function resize() {
  updatePreview();
}

function addColors() {
  for (let i = 0; i < colors.length; i++) {
    let el = document.createElement('div');
    el.className = 'button small-button color group-mid';
    el.style.backgroundColor = colors[i];

    el.addEventListener('click', function () {
      if (document.getElementById(color)) {
        document.getElementById(color).className = 'checkmark';
      }
      color = colors[i];
      document.getElementById(color).className = 'mdi mdi-check checkmark';
      updatePreview();
    });

    let icon = document.createElement('div');
    icon.className = (i == 0 ? 'mdi mdi-check ' : '') + 'checkmark';
    icon.id = colors[i];

    el.appendChild(icon);

    document.getElementById('footer').insertBefore(el, document.getElementById('custom'));
  }
}

function drawLine(x1, y1, x2, y2, s, c, o){
  ctx.beginPath();
  ctx.moveTo(x1 * canvas.width, y1 * canvas.height);
  ctx.lineTo(x2 * canvas.width, y2 * canvas.height);
  
  ctx.strokeStyle = c;
  ctx.lineWidth = s;
  ctx.lineCap = 'round';

  if (c == '#f0f0f0') {
    ctx.globalCompositeOperation = 'destination-out';
  } else {
    ctx.globalCompositeOperation = o + '-over';
  }

  ctx.stroke();
}

function draw(e, log = false) {
  cx = e.clientX, cy = e.clientY;

  socket.send(JSON.stringify({
    command: 'mouseMove',
    x: (e.clientX - canvas.offsetLeft) / canvas.clientWidth,
    y: (e.clientY - canvas.offsetTop) / canvas.clientHeight,
    size: size,
    color: color,
    over: over,
    id: id,
    drawing: drawing,
    log: log,
    password: password,
  }));
}

function handleMessage(event) { // message received from server
  let data = JSON.parse(event.data);
  
  if (data.message) {
    if (data.message == 'mouseMove') {
      if (clients[data.id] && cursors[data.id]) {
        if (data.drawing) {
          drawLine(clients[data.id].x, clients[data.id].y, data.x, data.y, data.size, data.color, data.over);
        }
      } else {
        clients[data.id] = {};
        cursors[data.id] = document.createElement('div');
        cursors[data.id].className = 'cursor';
    
        if (data.id == id) {
          cursors[data.id].style.zIndex = 100;
        }
    
        cursorDiv.appendChild(cursors[data.id]);
      }
      
      clients[data.id].x = data.x;
      clients[data.id].y = data.y;
    
      if (data.id != id) {
        cursors[data.id].style.left = `${data.x * canvas.offsetWidth + canvas.offsetLeft}px`;
        cursors[data.id].style.top = `${data.y * canvas.offsetHeight + canvas.offsetTop}px`;
      }
    } else if (data.message == 'userJoined') {
      draw({ clientX: cx, clientY: cy });
    } else if (data.message == 'userLeft') {
      if (cursors[data.id]) {
        cursorDiv.removeChild(cursors[data.id]);
        cursors[data.id] = null;
      }

      clients[data.id] = null;
    } else if (data.message == 'sendLog') {
      for (let i = 0; i < data.log.length; i++) {
        if (clients[data.log[i][5]]) {
          if (data.log[i][6]) {
            drawLine(clients[data.log[i][5]].x, clients[data.log[i][5]].y, data.log[i][0], data.log[i][1], data.log[i][2], data.log[i][3], data.log[i][4] == 's' ? 'source' : 'destination');
          }
        } else {
          clients[data.log[i][5]] = {};
        }
        
        clients[data.log[i][5]].x = data.log[i][0];
        clients[data.log[i][5]].y = data.log[i][1];
      }
      
      document.getElementById('connecting').className = 'fadeout';
      window.setTimeout(function () {
        document.getElementById('connecting').className = '';
        document.getElementById('connecting').style.display = 'none';
      }, 490);
    } else if (data.message == 'clearConfirm') {
      let confirm = prompt('Do you want to clear the image? (yes or no)', 'no') || 'no';

      if (confirm == 'yes') {
        socket.send(JSON.stringify({
          command: 'voteClear',
        }));
      }
    } else if (data.message == 'clearImage') {
      canvas.width = canvas.width;
    }
  }
}

function connect() {
  socket = new WebSocket('wss://draw-server.morefoxbeans.repl.co');

  socket.addEventListener('open', function () {
    draw({ clientX: 0, clientY: 0 }, true);
  });

  socket.addEventListener('message', handleMessage); // message listener

  socket.addEventListener('close', function () {
    console.log('Socket closed. Attempting to reconnect in 1 second...');
    document.getElementById('connecting').style.display = 'block';

    setTimeout(function () {
      connect();
    }, 1000); // retry connect every second
  });
}

function toggleLayer() {
  if (over == 'source') {
    over = 'destination';
    preview.style.zIndex = '-1';
    document.getElementById('drawIcon').className = 'mdi mdi-format-vertical-align-top';
  } else {
    over = 'source';
    preview.style.zIndex = null;
    document.getElementById('drawIcon').className = 'mdi mdi-format-vertical-align-bottom';
  }
}

function setup() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  cursorDiv = document.getElementById('cursors');
  preview = document.getElementById('preview');

  resize();

  canvas.addEventListener('touchstart', function (e) {
    touches = e.touches ? (e.touches.length > 1) : 0;

    if (touches > 1) { return; }

    drawing = true;
    cursors[id].style.display = 'none';
    preview.style.display = 'none';
  });

  canvas.addEventListener('pointerdown', function (e) {
    if (touches > 1) { return; }
    
    if (e.shiftKey) {
      draw({ clientX: px, clientY: py }, true);
      drawing = true;
      draw(e, true);
      px = e.clientX, py = e.clientY;
    } else {
      draw(e, true);
      drawing = true;
      draw(e, true);
      px = e.clientX, py = e.clientY;
    }
    last = Date.now();
    cursors[id].style.display = 'block';
    preview.style.display = 'block';
  });

  canvas.addEventListener('pointermove', function (e) {
    if (touches > 1) { return; }
    
    if (Date.now() - last > 10) {
      draw(e);
      last = Date.now();
    }

    preview.style.left = `${e.pageX}px`;
    preview.style.top = `${e.pageY}px`;

    cursors[id].style.left = `${e.pageX}px`;
    cursors[id].style.top = `${e.pageY}px`;
  });
  
  canvas.addEventListener('touchend', function (e) {
    if (touches > 1) { return; }

    touches = 1;
    
    draw(e, true);
    drawing = false;
    cursors[id].style.display = 'block';
    preview.style.display = 'block';
  });
  
  canvas.addEventListener('pointerup', function (e) {
    if (touches > 1) { return; }
    
    drawing = false;
    draw(e, true);
    cursors[id].style.display = 'block';
    preview.style.display = 'block';
  });

  canvas.addEventListener('pointerenter', function (e) {
    if (touches > 1) { return; }
    
    drawing = false;
    draw(e, true);
    cursors[id].style.display = 'block';
    preview.style.display = 'block';
  });
  
  canvas.addEventListener('pointerleave', function (e) {
    if (touches > 1) { return; }
    
    drawing = false;
    draw(e, true);
    cursors[id].style.display = 'none';
    preview.style.display = 'none';
  });

  document.getElementById('sizeSmall').addEventListener('click', function () {
    size = Math.round(Math.max(size / 1.3, 1));
    updatePreview();
  });

  document.getElementById('sizeBig').addEventListener('click', function () {
    size = Math.round(Math.min(size * 1.3, 80));
    updatePreview();
  });

  document.getElementById('drawToggle').addEventListener('click', function () {
    toggleLayer();
  });

  document.getElementById('eraser').addEventListener('click', function () {
    if (document.getElementById(color)) {
      document.getElementById(color).className = 'checkmark';
    }
    color = '#f0f0f0';
    updatePreview();
  });

  document.getElementById('custom').addEventListener('click', function () {
    if (document.getElementById(color)) {
      document.getElementById(color).className = 'checkmark';
    }
    color = prompt('Color?', color) || color;
    updatePreview();
  });

  document.getElementById('clear').addEventListener('click', function () {
    socket.send(JSON.stringify({
      command: 'clearImage',
    }));
  });

  window.addEventListener('keypress', function (e) {
    if (!isNaN(e.key)) {
      let value = parseInt(e.key);
    
      if (document.getElementById(color)) {
        document.getElementById(color).className = 'checkmark';
      }
      
      if (value > 0) {
        color = colors[value - 1];
      } else {
        color = "#f0f0f0";
      }
      
      if (document.getElementById(color)) {
        document.getElementById(color).className = 'mdi mdi-check checkmark';
      }
      
      updatePreview();
    } else if (e.key == '-') {
      size = Math.round(Math.max(size / 1.3, 1));
      updatePreview();
    } else if (e.key == '=') {
      size = Math.round(Math.min(size * 1.3, 80));
      updatePreview();
    } else if (e.key == 'u') {
      toggleLayer();
    }
  });

  addColors();

  connect();
}
