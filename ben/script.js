let answerSound = new Audio('snd/answer.wav');
let hangupSound = new Audio('snd/hangup.wav');

const answers = [
  'Yes.',
  'No.',
  'Hohoho!',
  'bleugh...',
];

const sounds = [
  new Audio('snd/yes.wav'),
  new Audio('snd/no.wav'),
  new Audio('snd/hohoho.wav'),
  new Audio('snd/bleugh.wav'),
]

const customs = {
  'whats 910': '21',
  'what is 910': '21',
  'picks up the phone': 'Bæn?',
};

// credit to https://stackoverflow.com/users/815680/bryc for this hashing function
const cyrb53 = function(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
    h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1>>>0);
};

function filter(string) {
  string = string.toLowerCase(); // not case sensitive
  string = string.trim(); // trim spaces from ends
  string = string.replace(/['!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~']/g, ''); // remove puncuation
  string = string.replace(/\s{2,}/g, ' '); // remove double spaces

  return string;
}

function ask() {
  let question = document.getElementById('question').value;

  document.getElementById('prevquestion').innerText = 'You: ' + question;

  question = filter(question);

  if ((cyrb53(question) % 14) == 0 || question == 'hang up') {
    document.getElementById('answer').innerText = '*slams the phone down*';

    hangupSound.play();

    window.setTimeout(function () { hidePage('pageCall'); }, 1000);
    
    return;
  }

  let type;
  let max = 1000;

  if (question.includes('how many') || question.includes('how much')) {
    type = 'many';
    max = 1000;
  } else if (question.includes('how old') || question.includes('how tall')) {
    type = 'many';
    max = 100;
  } else if (question.includes('why') || question.includes('where') || question.includes('how') || question.includes('what') || question.includes('which') || question.includes('who') || question.includes('when')) {
    type = 'what';
  } else if (question.includes('do') || question.includes('does') || question.includes('are') || question.includes('is')) {
    type = 'yes/no';
  } else {
    type = 'all';
  }

  let hash = cyrb53(question);

  let answer;
  let sound;

  if (type == 'yes/no') {
    answer = answers[hash % 3];
    sound = sounds[hash % 3];
  } else if (type == 'what') {
    answer = answers[(hash % 2) + 2];
    sound = sounds[(hash % 2) + 2];
  } else if (type == 'many') {
    answer = (hash % max).toString();
    sound = sounds[2];
  } else {
    answer = answers[hash % 4];
    sound = sounds[hash % 4];
  }

  if (customs[question]) {
    answer = customs[question];
  }

  sound.play();

  document.getElementById('answer').innerText = 'Ben: ' + answer;
  document.getElementById('question').value = '';
}

function setup() {
  document.getElementById('question').addEventListener('keypress', function (e) {
    if (e.which == 13) {
      if (filter(document.getElementById('question').value) != '') {
        ask();
      }
    
      e.preventDefault();
    }
  });

  document.getElementById('submit').addEventListener('click', function () {
    if (filter(document.getElementById('question').value) != '') {
      ask();
    }
  });

  document.getElementById('call').addEventListener('click', function () {
    document.getElementById('question').value = '';
    showPage('pageCall');
    answerSound.play();

    window.setTimeout(function () {
      document.getElementById('question').focus();
      document.getElementById('prevquestion').innerText = 'You: *picks up the phone*';
      document.getElementById('answer').innerText = 'Ben: Bæn?';
    }, 0);
  });
}
