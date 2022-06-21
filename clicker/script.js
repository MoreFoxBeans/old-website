let multipliers = [];

let socket;
let users = {};
let text = [];

let delta = 0; // clicks since last update
let clicks = 0; // total clicks
let yourclicks = localStorage.getItem('yourclicks') || 0; // your clicks

function commaNumber(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function convertLong(n) {
  if (n < 1e6) return commaNumber(n);
  if (n >= 1e6 && n < 1e9)   return +(n /  1e6).toFixed(3) + ' million'; // Million
  if (n >= 1e9 && n < 1e12)  return +(n /  1e9).toFixed(3) + ' billion'; // Billion
  if (n >= 1e12 && n < 1e15) return +(n / 1e12).toFixed(3) + ' trillion'; // Trillion
  if (n >= 1e15 && n < 1e18) return +(n / 1e15).toFixed(3) + ' quadrillion'; // Quadrillion
  if (n >= 1e18 && n < 1e21) return +(n / 1e18).toFixed(3) + ' quintillion'; // Quintillion
  if (n >= 1e21 && n < 1e24) return +(n / 1e21).toFixed(3) + ' sextillion'; // Sextillion
  if (n >= 1e24)             return +(n / 1e24).toFixed(3) + ' septillion'; // Septillion
};

function singleClick(e) { // left-click
  delta += getMultiplier();
  yourclicks++;
  updateText();

  e.preventDefault();
}

function oneClick(e) { // right-click
  delta++;
  yourclicks++;
  updateText();
  
  e.preventDefault();
}

function updateText() { // update click text
  document.getElementById('bigButton').innerText = `${convertLong(clicks + delta)} x${getMultiplier()}`;
  document.getElementById('yourclicks').innerText = `${convertLong(yourclicks)} clicks on this device.`;
}

function sendDelta() { // update clicks on server
  if (delta > 0) {
    socket.send(JSON.stringify({ command: 'addClicks', clicks: delta }));
    delta = 0;
  }
}

function formatTime(time) {
  let date = new Date(time);
  
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  
  return hours + ':' + minutes + ' ' + ampm;
}

function updateChat() {
  let o = '';
  
  for (let i = 0; i < text.length; i++) {
    o = o + formatTime(text[i].time);
    o = o + ' - ';
    if (text[i].uuid) {
      o = o + users[text[i].uuid];
      o = o + ': ';
    }
    if (text[i].repl) {
      o = o + (text[i].text).replace('$1', users[text[i].repl]);
    } else {
      o = o + text[i].text;
    }
    o = o + '\n';
  }
  
  document.getElementById('chat').innerText = o;
  document.getElementById('chat').scrollTop = document.getElementById('chat').scrollHeight;
}

function handleMessage(event) { // message received from server
  let data = JSON.parse(event.data);
  
  if (data.message) {
    if (data.message == 'numberChanged') { // clicks changed
      clicks = data.clicks;
      
      updateText();

      for (let i = 0; i < multipliers.length; i++) {
        let button = document.getElementById('multipliers').children[i];

        if (button.className == 'button disabled' && clicks >= getPrice(i)) {
          button.className = 'button';
        }
      }
    } else if (data.message == 'usersChanged') { // num users changed
      users = data.users;
      
      if (data.number == 1) {
        document.getElementById('users').innerText = `There is ${data.number} user online.`;
      } else {
        document.getElementById('users').innerText = `There are ${data.number} users online.`;
      }

      updateChat();
    } else if (data.message == 'multiplierChanged') { // click multiply bought
      multipliers = data.multipliers;
      updateShop();
      updateText();
    } else if (data.message == 'messageSent') { // public text changed
      text = data.text;
      updateChat();
    } else if (data.message == 'refresh') { // remote refresh triggered
      window.location.href = window.location.href;
    }
  }
}

function connect() {
  socket = new WebSocket('wss://clicker-server.morefoxbeans.repl.co');

  socket.addEventListener('message', handleMessage); // message listener

  socket.addEventListener('close', function () {
    document.getElementById('bigButton').innerText = 'Connecting...'
    console.log('Socket closed. Attempting to reconnect in 1 second...');

    setTimeout(function () {
      connect();
    }, 1000); // retry connect every second
  });
}

function keyDown() { // press down button
  document.getElementById('bigButton').className = 'button button-press';
}

function keyUp(e) { // release button
  document.getElementById('bigButton').className = 'button';

  if (e.code == 'Space') {
    singleClick();
  }
}

function saveClicks() {
  localStorage.setItem('yourclicks', yourclicks);
}

function getPrice(i) {
  return multipliers[i].price * Math.pow(1.5, multipliers[i].num);
}

function buyMultiplier(i) {
  if (clicks >= getPrice(i)) {
    socket.send(JSON.stringify({ command: 'buyMultiplier', id: i }));
  }
}

function getMultiplier() {
  let o = 1;
  
  for (let i = 0; i < multipliers.length; i++) {
    o += multipliers[i].multiply * multipliers[i].num;
  }

  return o;
}

function updateShop() {
  document.getElementById('multipliers').replaceChildren();

  let row;
  
  for (let i = 0; i < multipliers.length; i++) {
    let side = ' float-left left';
    
    if (i % 2 == 0) {
      row = document.createElement('div');
      row.className = 'row';
      side = ' float-right right';
    }
    
    let button = document.createElement('div');
    button.className = 'button half' + ((clicks >= getPrice(i)) ? '' : ' disabled') + side;

    let name = document.createElement('div');
    name.className = 'name';
    name.innerText = `${multipliers[i].multiply}x Multiplier (${multipliers[i].num})`;

    let price = document.createElement('div');
    price.className = 'price';
    price.innerText = convertLong(getPrice(i)) + ' clicks';

    button.appendChild(name);
    button.appendChild(price);

    button.addEventListener('click', function () { buyMultiplier(i); });

    row.appendChild(button);

    if (i % 2 == 1) {
      document.getElementById('multipliers').appendChild(row);
    }
  }
}

function sendText() {
  let text = document.getElementById('text').value;

  if (text.length > 0 && text.length <= 100) {
    socket.send(JSON.stringify({ command: 'updateText', text: text }));
    document.getElementById('text').value = '';
  }
}

function setup() {
  // button mouse clicks
  document.getElementById('bigButton').addEventListener('click', singleClick);
  document.getElementById('bigButton').addEventListener('contextmenu', singleClick);
  document.getElementById('bigButton').addEventListener('auxclick', oneClick);

  // click w/ keypress
  document.body.addEventListener('keydown', keyDown);
  document.body.addEventListener('keyup', keyUp);

  document.getElementById('update').addEventListener('click', sendText);

  document.getElementById('text').addEventListener('keypress', function (e) {
    if (e.which == 13) {
      sendText();
    
      e.preventDefault();
    }

    if (document.getElementById('text').value.length >= 100) {
      e.preventDefault();
    }
  });

  updateShop();
  connect();
  
  window.setInterval(sendDelta, 1000); // send clicks every second
  window.setInterval(saveClicks, 1000); // save your clicks every second
}
