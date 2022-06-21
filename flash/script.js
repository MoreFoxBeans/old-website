const games = [
  {
    page: 'All',
    title: 'All Games',
    games: [],
  },
  {
    page: 'Favorites',
    title: 'My Favorites',
    games: [],
  },
  {
    page: 'Ducklife',
    title: 'Duck Life',
    games: [
      { title: 'Duck Life 1', page: 'duck_life_1', icon: 'egg', },
      { title: 'Duck Life 2', page: 'duck_life_2', icon: 'duck', },
      { title: 'Duck Life 3', page: 'duck_life_3', icon: 'food-drumstick', },
      { title: 'Duck Life 4', page: 'duck_life_4', icon: 'egg-fried', favorite: true, },
      { title: 'Duck Life 4 (Classic)*', page: 'duck_life_4_classic', icon: 'duck', },
    ],
  },
  {
    page: 'Papas',
    title: 'Papa\'s Series',
    games: [
      { title: 'Papa\'s Pizzeria*', page: 'pizzeria', icon: 'pizza', },
      { title: 'Papa\'s Burgeria', page: 'burgeria', icon: 'hamburger', favorite: true, },
      { title: 'Papa\'s Taco Mia', page: 'taco_mia', icon: 'taco', },
      { title: 'Papa\'s Freezeria*', page: 'freezeria', icon: 'beer', },
    ],
  },
  {
    page: 'Factory',
    title: 'Factory Balls',
    games: [
      { title: 'Factory Balls 1', page: 'factory_balls', icon: 'circle-slice-2', },
      { title: 'Factory Balls 2', page: 'factory_balls_2', icon: 'circle-slice-4', },
      { title: 'Factory Balls 3', page: 'factory_balls_3', icon: 'circle-slice-6', favorite: true, },
      { title: 'Factory Balls X-mas', page: 'factory_balls_xmas', icon: 'pine-tree', },
    ],
  },
  {
    page: 'Bonte',
    title: 'Bonte Bart Puzzles',
    games: [
      { title: '40xEscape', page: '40xescape', icon: 'door', favorite: true, },
      { title: 'Full Moon', page: 'full_moon', icon: 'moon-full', favorite: true, },
      { title: 'Me and the Key', page: 'me_and_the_key', icon: 'key', favorite: true, },
      { title: 'Me and the Key 2', page: 'me_and_the_key_2', icon: 'key', favorite: true, },
      { title: 'Me and the Key 3', page: 'me_and_the_key_3', icon: 'key', },
    ],
  },
  {
    page: 'Vex',
    title: 'Vex',
    games: [
      { title: 'Vex 3', page: 'vex_3', icon: 'hexagon-outline', favorite: true, },
      { title: 'Vex 4', page: 'vex_4', icon: 'hexagon-multiple-outline', favorite: true, },
      { title: 'Vex 5', page: 'vex_5', icon: 'dots-hexagon', favorite: true, },
    ],
  },
  {
    page: 'FireWater',
    title: 'Fireboy and Watergirl',
    games: [
      { title: '#1: Forest Temple', page: 'fb_and_wg_1', icon: 'forest', favorite: true, },
      { title: '#2: Light Temple', page: 'fb_and_wg_2', icon: 'weather-sunny', },
      { title: '#3: Ice Temple', page: 'fb_and_wg_3', icon: 'weather-snowy-heavy', },
      { title: '#4: Crystal Temple', page: 'fb_and_wg_4', icon: 'diamond-stone', },
      { title: '#5: Elements', page: 'fb_and_wg_5', icon: 'earth', },
    ],
  },
  {
    page: 'Bloons',
    title: 'Bloons Tower Defense',
    games: [
      { title: 'Bloons Tower Defense', page: 'bloons_td', icon: 'balloon', },
      { title: 'Bloons Tower Defense 2', page: 'bloons_td_2', icon: 'airballoon-outline', },
      { title: 'Bloons Tower Defense 4', page: 'bloons_td_4', icon: 'arrow-projectile', favorite: true, },
    ],
  },
  {
    page: 'Quiz',
    title: 'The Impossible Quiz',
    games: [
      { title: 'The Impossible Quiz', page: 'impossible_quiz', icon: 'numeric-1-box-multiple-outline', favorite: true, },
      { title: 'The Impossible Quiz 2', page: 'impossible_quiz_2', icon: 'numeric-2-box-multiple-outline', },
      { title: 'The Impossible Quiz Book', page: 'iq_book', icon: 'book-outline', },
      { title: 'The Impossible Quiz Book 2', page: 'iq_book_2', icon: 'book-open-outline', },
      { title: 'The Impossible Quiz Book 3', page: 'iq_book_3', icon: 'book-open-page-variant-outline', },
    ],
  },
  {
    page: 'WHG',
    title: 'The World\'s Hardest Game',
    games: [
      { title: 'The World\'s Hardest Game', page: 'worlds_hardest_game', icon: 'star-half', favorite: true, },
      { title: 'The World\'s Hardest Game 2', page: 'worlds_hardest_game_2', icon: 'star', },
    ],
  },
  {
    page: 'Other',
    title: 'Others',
    games: [
      { title: 'Run 3', page: 'run_3', icon: 'run-fast', favorite: true, },
      { title: 'Syobon Action/Cat Mario', page: 'open_syobon_action', icon: 'paw', favorite: true, },
      { title: 'Slope', page: 'slope', icon: 'soccer', favorite: true, },
      { title: 'Tunnel Rush', page: 'tunnel_rush', icon: 'fan', favorite: true, },
      { title: 'Super Mario 63', page: 'super_mario_63', icon: 'mushroom-outline', favorite: true, },
      { title: 'Interactive Buddy', page: 'interactive_buddy', icon: 'bomb', favorite: true, },
      { title: 'Basketball Legends', page: 'basketball_legends', icon: 'basketball', },
      { title: 'Moto X3M', page: 'moto_x3m', icon: 'motorbike', favorite: true, },
      { title: 'BLOXORZ', page: 'bloxorz', icon: 'rectangle-outline', },
      { title: 'Getting Over It (Scratch)', page: 'getting_over_it', icon: 'pickaxe', favorite: true, },
    ],
  },
];

let before, main;
let curPage = 'Main';

function process() {
  for (let i = 0; i < games.length; i++) {
    for (let j = 0; j < games[i].games.length; j++) {
      let cur = games[i].games[j];

      games[0].games.push(cur);

      if (cur.favorite) {
        games[1].games.push(cur);
      }
    }
  }
}

function createButtons() {
  for (let i = 0; i < games.length; i++) {
    let button = document.createElement('div');
    button.className = 'button';

    let icon = document.createElement('div');
    icon.className = 'mdi mdi-arrow-right button-icon';
    button.appendChild(icon);

    let text = document.createTextNode(`${games[i].title} (${games[i].games.length})`);
    button.appendChild(text);
    
    button.addEventListener('click', function () {
      history.pushState(null, '', '');
      showPage('page' + games[i].page);
      curPage = games[i].page;
    });

    main.appendChild(button);

    if (i == 1) {
      let sep = document.createElement('div');
      sep.className = 'seperator';
      main.appendChild(sep);
    }
  }
}

function createPages() {
  for (let i = 0; i < games.length; i++) {
    let page = document.createElement('div');
    page.id = 'page' + games[i].page;
    page.className = 'page';
    page.style = 'display: none;';

    let heading = document.createElement('div');
    heading.className = 'heading';
    heading.innerText = `${games[i].title} (* = Broken)`;
    page.appendChild(heading);

    for (let j = 0; j < games[i].games.length; j++) {
      let cur = games[i].games[j];
      
      let button = document.createElement('a');
      button.className = 'button';
      button.href = cur.page + '.html';

      let icon = document.createElement('div');
      icon.className = `mdi mdi-${cur.icon} button-icon`;
      button.appendChild(icon);

      let text = document.createTextNode(cur.title);
      button.appendChild(text);

      page.appendChild(button);
    }

    let sep = document.createElement('div');
    sep.className = 'seperator';
    page.appendChild(sep);
  
    let back = document.createElement('div');
    back.className = 'button';
  
    let icon = document.createElement('div');
    icon.className = 'mdi mdi-arrow-left button-icon';
    back.appendChild(icon);
  
    let text = document.createTextNode('Back');
    back.appendChild(text);

    back.addEventListener('click', function () {
      history.back();
    });
  
    page.appendChild(back);
    
    document.body.insertBefore(page, before);
  }
}

function createLayout() {
  process();
  
  main = document.createElement('div');
  main.id = 'pageMain';
  main.className = 'page';

  let heading = document.createElement('div');
  heading.className = 'heading';
  heading.innerText = `Unblocked Games (* = Broken)`;
  main.appendChild(heading);

  createButtons();
  
  let sep = document.createElement('div');
  sep.className = 'seperator';
  main.appendChild(sep);

  if (true) {
    let random = document.createElement('a');
    random.className = 'button';

    let icon = document.createElement('div');
    icon.className = 'mdi mdi-shuffle button-icon';
    random.appendChild(icon);
  
    let text = document.createTextNode('Surprise Me!');
    random.appendChild(text);

    random.addEventListener('click', () => { window.location.href = '/flash/' + games[0].games[Math.floor(Math.random() * games[0].games.length)].page + '.html' });
  
    main.appendChild(random);
  }

  if (true) {
    let home = document.createElement('a');
    home.className = 'button';
    home.href = '/';
  
    let icon = document.createElement('div');
    icon.className = 'mdi mdi-home button-icon';
    home.appendChild(icon);
  
    let text = document.createTextNode('Home');
    home.appendChild(text);
  
    main.appendChild(home);
  }

  let footer = document.createElement('div');
  footer.className = 'heading';
  footer.innerText = `DISCLAIMER: I did not make any of\nthe games listed on this page.`;

  main.appendChild(footer);

  document.body.insertBefore(main, before);

  createPages();
}

function setup() {
  before = document.getElementById('before');

  createLayout();

  window.addEventListener('popstate', function (e) {
    if (curPage !== 'Main') {
      hidePage('page' + curPage);
      curPage = 'Main';
    }
  });
}
