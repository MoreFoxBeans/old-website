let color = window.location.search.substring(1);
let hex = window.location.hash;

function submit() {
  let inCol = document.getElementById('color').value;
  document.body.style.background = inCol;
  window.document.title = inCol + ' screen.';
  window.history.replaceState({}, '', `${location.pathname}?${inCol}`);
}

function enter(e) {
  if (e.which == 13){
    submit();
    e.preventDefault();
  }
}

function setup() {
  window.addEventListener('hashchange', function (event) {
    window.location.reload(true);
  });

  if (hex != '') {
    document.body.style.background = hex;
    document.getElementById('color').value = hex;
    window.document.title = hex + ' screen.';
  } else {
    document.body.style.background = color;
    document.getElementById('color').value = color;
    window.document.title = color + ' screen.';
  }

  document.getElementById('color').addEventListener('keypress', enter);
  document.getElementById('update').addEventListener('click', submit);
}
