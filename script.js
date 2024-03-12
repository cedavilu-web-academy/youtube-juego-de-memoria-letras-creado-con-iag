const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let cards = [];
let flippedCards = [];
let lockedBoard = false;
let moves = 0;

function startGame() {
  resetGame();
  generateCards();
  shuffleCards();
  renderCards();
  setTimeout(() => {
    document.getElementById('card-container').classList.remove('hidden');
  }, 1000);
}

function resetGame() {
  cards = [];
  flippedCards = [];
  lockedBoard = false;
  moves = 0;
  document.getElementById('message').textContent = '';
}

function generateCards() {
  for (let i = 0; i < 2; i++) {
    for (let letter of alphabet) {
      cards.push(letter);
    }
  }
}

function shuffleCards() {
  cards.sort(() => Math.random() - 0.5);
}

function renderCards() {
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';

  for (let letter of cards) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.letter = letter;

    const front = document.createElement('div');
    front.classList.add('front');
    front.textContent = letter;

    const back = document.createElement('div');
    back.classList.add('back');

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', flipCard);
    cardContainer.appendChild(card);
  }
}

function flipCard() {
  if (lockedBoard) return;
  if (this === flippedCards[0]) return;

  this.classList.add('flip');
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkMatch();
    incrementMoves();
  }
}

function checkMatch() {
  const [firstCard, secondCard] = flippedCards;
  const isMatch = firstCard.dataset.letter === secondCard.dataset.letter;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  flippedCards.forEach(card => {
    card.removeEventListener('click', flipCard);
  });

  flippedCards = [];

  if (document.querySelectorAll('.card:not(.flip)').length === 0) {
    showMessage('¡Felicidades! Has completado el juego.');
  }
}

function unflipCards() {
  lockedBoard = true;

  setTimeout(() => {
    flippedCards.forEach(card => {
      card.classList.remove('flip');
    });

    flippedCards = [];
    lockedBoard = false;
  }, 2000);
}

function incrementMoves() {
  moves++;
  if (moves > 1) {
    showMessage(`Movimientos: ${moves}`);
  }
}

function showMessage(message) {
  document.getElementById('message').textContent = message;
}

// Initial setup
startGame();
