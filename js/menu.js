function openMenu() { // display menu
  let overlay = document.getElementById('overlay');
  
  overlay.style.display = 'block';
}

function closeMenu() { // hide menu
  document.getElementById('menu').className = 'slide-out';
  document.getElementById('background').className = 'fade-out';

  window.setTimeout(function () { // hide menu after animation
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('menu').className = '';
    document.getElementById('background').className = '';
  }, 490);
}

function menu() {
  // open/close menu
  document.getElementById('menuButton').addEventListener('click', openMenu);
  document.getElementById('closeButton').addEventListener('click', closeMenu);
  document.getElementById('background').addEventListener('click', closeMenu);
}
