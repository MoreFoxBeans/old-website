let themes = [
  {
    name: 'Light',
    theme: 'light',
  },
  {
    name: 'Dark',
    theme: 'dark',
  },
  {
    name: 'Matcha',
    theme: 'tea',
  },
  {
    name: 'Taro',
    theme: 'taro',
  },
  {
    name: 'Red Bean',
    theme: 'redbean',
  },
  {
    name: 'Blood',
    theme: 'blood',
  },
  {
    name: 'Blue Stars',
    theme: 'stars',
  },
  {
    name: 'Purple Stars',
    theme: 'starspurple',
  },
  {
    name: 'Neon',
    theme: 'neon',
  },
  {
    name: 'asus',
    theme: 'sus',
  },
  {
    name: 'Rainbow 1',
    theme: 'rainbow1',
  },
  {
    name: 'Rainbow 2',
    theme: 'rainbow2',
  },
  {
    name: 'Chaos',
    theme: 'chaos',
  },
  {
    name: 'Rainbow',
    theme: 'rainbow',
  },
  {
    name: 'High Contrast',
    theme: 'contrast',
  },
  {
    name: 'Ugly',
    theme: 'ugly',
  },
  {
    name: 'LAST CHRISTMAS I GAVE YOU MY HEART BUT THE VERY NEXT DAY YOU GAVE IT AWAY THIS YEAR TO SAVE ME FROM TEARS ILL GIVE IT TO SOMEONE SPECIAL',
    theme: 'lsd',
  },
];

function setTheme(theme) {
  document.documentElement.className = theme;
  localStorage.setItem('theme', theme);
}

let buffer = "";

function setup() {
  for (let i = 0; i < themes.length; i += 2) {
    if ((themes.length - i) >= 2) {
      let row = document.createElement('div');
      row.className = 'row';
      
      let buttonL = document.createElement('div');
      buttonL.className = 'button half theme ' + themes[i].theme;
      buttonL.innerText = themes[i].name;
      buttonL.addEventListener('click', function () { setTheme(themes[i].theme); });

      let buttonR = document.createElement('div');
      buttonR.className = 'button half theme ' + themes[i + 1].theme;
      buttonR.innerText = themes[i + 1].name;
      buttonR.addEventListener('click', function () { setTheme(themes[i + 1].theme); });

      row.appendChild(buttonL);
      row.appendChild(buttonR);
  
      document.getElementById('themes').appendChild(row);
    } else {
      let button = document.createElement('div');
      button.className = 'button theme ' + themes[i].theme;
      button.innerText = themes[i].name;
  
      button.addEventListener('click', function () { setTheme(themes[i].theme); });
  
      document.getElementById('themes').appendChild(button);
    }
  }

  window.addEventListener('keypress', function (e) {
    buffer = buffer + e.key;

    if (buffer == 'dream') {
      window.location.href = '/dream/';
    }
  });
}
