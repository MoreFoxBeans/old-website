let score = 0;
let first = 0;
let second = 0;
let op = 0;
let str = [ '+', '-', '*', '/' ];

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function submit() {
  let v = document.getElementById('answer').value;
  
  if (op == 0) {
    if (first + second != v) { return; }
  } else if (op == 1) {
    if (first - second != v) { return; }
  } else if (op == 2) {
    if (first * second != v) { return; }
  } else if (op == 3) {
    if (first / second != v) { return; }
  }
  
  score++;

  generate();
  update();
}

function generate() {
  if (score >= 20) {
    op = randInt(0, 3);
  } else if (score >= 10) {
    op = randInt(0, 2);
  } else if (score >= 5) {
    op = randInt(0, 1);
  } else {
    op = 0;
  }

  if (op == 0) {
    first = randInt((score + 1) * 2, (score + 1) * 3);
    second = randInt(score + 1, (score + 1) * 2);
  } else if (op == 1) {
    first = randInt((score + 1) * 2, (score + 1) * 3);
    second = randInt(score + 1, (score + 1) * 2);
  } else if (op == 2) {
    first = randInt(score + 1, (score + 1) * 2);
    second = randInt(1, score + 1);
  } else if (op == 3) {
    second = randInt(1, score + 1);
    first = second * (randInt(2, 8) / 2);
  }
}

function update() {
  document.getElementById('question').innerText = `${first} ${str[op]} ${second} = ?`;
  document.getElementById('answer').value = '';
}

function setup() {
  generate();
  update();
  
  document.getElementById('submit').addEventListener('click', submit);

  document.getElementById('answer').addEventListener('keypress', function (e) {
    if (e.which == 13) {
      submit();
    
      e.preventDefault();
    }
  });
}
