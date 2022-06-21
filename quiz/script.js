const questions = getQuestions();

let index = 0;
let lives = 3;
let max = 3;
let restart_fail = false;

function check(id) {
  document.getElementById('failnum').innerText = `Your score: ${index}`;
  
  if (questions[index].answers) {
    if (questions[index].answer == id + 1) {
      index++;
    } else {
      lives--;
    }
  } else {
    if (questions[index].answer.toLowerCase() == document.getElementById('answer').value.toLowerCase()) {
      index++;
    } else {
      lives--;
    }
  }

  if (lives == 0) {
    if (restart_fail) {
      document.getElementById('retryText').innerText = 'Restart from beginning';
    } else {
      document.getElementById('retryText').innerText = 'Retry (-10 questions)';
    }
    showPage('pageFail');
  }
  
  if (index >= questions.length) {
    showPage('pageWin');
  } else {
    updateQuestion();
  }
}

function updateQuestion() {
  document.getElementById('question').innerText = questions[index].question;
  document.getElementById('answers').replaceChildren();
  document.getElementById('count').innerText = `${index + 1} / ${questions.length}`;

  if (questions[index].answers) {
    for (let i = 0; i < questions[index].answers.length; i += 2) {
      if ((questions[index].answers.length - i) >= 2) {
        let row = document.createElement('div');
        row.className = 'row';
        
        let answerL = document.createElement('div');
        answerL.className = 'button half right float-right';
        answerL.innerText = questions[index].answers[i];
        answerL.addEventListener('click', function () { check(i); });
  
        let answerR = document.createElement('div');
        answerR.className = 'button half left float-left';
        answerR.innerText = questions[index].answers[i + 1];
        answerR.addEventListener('click', function () { check(i + 1); });
  
        row.appendChild(answerL);
        row.appendChild(answerR);
        
        document.getElementById('answers').appendChild(row);
      } else {
        let answer = document.createElement('div');
        answer.className = 'button';
        answer.innerText = questions[index].answers[i];
        answer.addEventListener('click', function () { check(i); });
        
        document.getElementById('answers').appendChild(answer);
      }
    }
  } else {
    let answer = document.createElement('textarea');
    answer.id = 'answer';
    answer.className = 'textarea';
    answer.rows = '1';
    answer.cols = '1';

    answer.addEventListener('keypress', function (e) {
      if (e.which == 13){
        check();
        e.preventDefault();
      }
    });

    document.getElementById('answers').appendChild(answer);

    let submit = document.createElement('div');
    submit.className = 'button';
    submit.innerText = 'Submit';

    submit.addEventListener('click', function () {
      check();
    });

    document.getElementById('answers').appendChild(submit);
  }

  document.getElementById('lives').innerText = `${lives} lives`;
}

function setup() {
  updateQuestion();

  document.getElementById('retry').addEventListener('click', function () {
    if (restart_fail) {
      index = 0;
    } else {
      index = Math.max(index - 10, 0);
    }
    lives = max;
    updateQuestion();
    hidePage('pageFail');
  });

  document.getElementById('menuRestart').addEventListener('click', function () {
    index = 0;
    lives = 3;
    updateQuestion();
    hidePage('pageWin');
    hidePage('pageFail');
    showPage('pageStart');
  });
  
  document.getElementById('restart').addEventListener('click', function () {
    index = 0;
    lives = 3;
    max = 3;
    updateQuestion();
    hidePage('pageWin');
    showPage('pageStart');
  });

  document.getElementById('begin_easy').addEventListener('click', function () {
    index = 0;
    lives = 3;
    max = 3;
    restart_fail = false;
    updateQuestion();
    hidePage('pageStart');
  });

  document.getElementById('begin_medium').addEventListener('click', function () {
    index = 0;
    lives = 2;
    max = 2;
    restart_fail = false;
    updateQuestion();
    hidePage('pageStart');
  });

  document.getElementById('begin_impossible').addEventListener('click', function () {
    index = 0;
    lives = 1;
    max = 1;
    restart_fail = true;
    updateQuestion();
    hidePage('pageStart');
  });

  document.getElementById('qnum').innerText = `There are ${questions.length} questions`;
}
