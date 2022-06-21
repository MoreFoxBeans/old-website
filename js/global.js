window.onerror = function (msg, url, lineNo, columnNo, error) {
  var string = msg.toLowerCase();
  var substring = 'script error';
  if (string.indexOf(substring) > -1){
    alert('Script Error: See Browser Console for Detail');
  } else {
    var message = [
      'Message: ' + msg,
      'URL: ' + url,
      'Line: ' + lineNo,
      'Column: ' + columnNo,
      'Error object: ' + JSON.stringify(error)
    ].join(' - ');

    alert(message);
  }

  return false;
};

if (typeof caches !== 'undefined') {
  caches.delete('offline');
}

function showPage(page) {
  document.getElementById('pageMain').style = '';
  document.getElementById('pageMain').className = 'page slide-out-left';
  document.getElementById(page).style = '';
  document.getElementById(page).className = 'page slide-in-left';

  window.setTimeout(function () {
    document.getElementById('pageMain').style = 'display: none;';
    document.getElementById('pageMain').className = 'page';
    document.getElementById(page).className = 'page';
  }, 490);
}

function hidePage(page) {
  document.getElementById(page).style = '';
  document.getElementById(page).className = 'page slide-out-right';
  document.getElementById('pageMain').style = '';
  document.getElementById('pageMain').className = 'page slide-in-right';

  window.setTimeout(function () {
    document.getElementById(page).style = 'display: none;';
    document.getElementById(page).className = 'page';
    document.getElementById('pageMain').className = 'page';
  }, 490);
}

function global() {
  let theme = localStorage.getItem('theme') || 'light'; // current theme
  document.documentElement.className = theme;
  localStorage.setItem('theme', theme);
}
