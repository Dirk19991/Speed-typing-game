const word = document.querySelector('#word');
const text = document.querySelector('#text');
const scoreEl = document.querySelector('#score');
const timeEl = document.querySelector('#time');
const endgameEl = document.querySelector('#end-game-container');
const settingsBtn = document.querySelector('#settings-btn');
const settings = document.querySelector('#settings');
const settingsForm = document.querySelector('#settings-form');
const difficultySelect = document.querySelector('#difficulty');

const words = [
  'склероз',
  'синоним',
  'выкос',
  'молния',
  'тальк',
  'богатырь',
  'массажист',
  'олово',
  'бахрома',
  'антибиотик',
  'рубашка',
  'насекомое',
  'индейка',
  'лапка',
  'шмель',
  'авиастроитель',
  'континент',
  'веко',
  'киль',
  'локомотив',
  'морковь',
  'петелька',
  'кадет',
  'ансамбль',
  'ласточка',
  'температура',
  'клюква',
  'фосфор',
  'богема',
  'купюра',
  'бушлат',
];

let randomWord;

let score = 0;

let time = 10;

let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'easy';

difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'easy';

text.focus();

const timeInterval = setInterval(updateTime, 1000);

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

function updateTime() {
  time--;
  timeEl.innerHTML = time + 'с';

  if (time === 0) {
    clearInterval(timeInterval);

    gameOver();
  }
}

function gameOver() {
  endgameEl.innerHTML = `
    <h1>Время вышло</h1>
    <p>Ваш счет: ${score}</p>
    <button onclick='location.reload()'>Начать заново</button>
    `;

  endgameEl.style.display = 'flex';
}

function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

addWordToDOM();

text.addEventListener('input', (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    e.target.value = '';

    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

settingsForm.addEventListener('change', (e) => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
  location.reload();
});
