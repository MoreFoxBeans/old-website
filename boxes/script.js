let boxes;
let num = 0;
let back = 0;
let total = 0;

function removeBox(e) {
  e.target.className = 'button fade'

  window.setTimeout(function () {
    boxes.removeChild(e.target);
    num += 1;
    document.getElementById('count').innerText = back + ' + ' + num + ' / ' + total;

    if (boxes.children.length == 0) {
      back += num;
      addBoxes();
    }
  }, 200);

  e.preventDefault();
}

function addBox(b = 0) {
  let button = document.createElement('div');
  button.className = 'button';
  button.style = `left: ${Math.random() * 100 - 15}%;
                  top: ${Math.random() * 100 - 10}%;
                  --brightness: ${b};`;

  button.addEventListener('click', removeBox);
  button.addEventListener('contextmenu', removeBox);

  boxes.insertBefore(button, boxes.firstChild);
}

function addBoxes() {
  num = 0;
  boxes.replaceChildren();
  total = Math.floor(Math.random() * 100 + 100);
  
  for (let i = 0; i < total; i++) {
    addBox(i / (total - 1));
  }
  
  document.getElementById('count').innerText = back + ' + ' + num + ' / ' + total;
}

function setup() {
  boxes = document.getElementById('boxes');

  document.body.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  
  addBoxes();
}
