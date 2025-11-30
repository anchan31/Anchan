const EMOJIS = ['🎂', '🎁', '🎈', '🥳', '🎉', '🍰', '🍭', '🕯️'];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;

const board = document.getElementById('memory-board');
const messageBox = document.getElementById('game-message');
const continueBtn = document.getElementById('continue-btn');
const supportsVibrate = typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';

// Prepare duplicate and shuffle
function shuffle(array) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function initGame() {
  let pairs = [...EMOJIS, ...EMOJIS];
  cards = shuffle(pairs);
  matchedPairs = 0;
  flippedCards = [];
  board.innerHTML = '';
  cards.forEach((emoji, idx) => {
    let card = document.createElement('div');
    card.className = 'memory-card';
    card.setAttribute('data-emoji', emoji);
    card.setAttribute('data-idx', idx);
    card.innerHTML = '<span style="opacity:0;">' + emoji + '</span>';
    card.addEventListener('pointerdown', flipCard, { passive: true });
    board.appendChild(card);
  });
}

function flipCard(e) {
  let card = e.currentTarget;
  if (card.classList.contains('flipped') || card.classList.contains('matched') || flippedCards.length === 2) return;
  card.classList.add('flipped');
  card.innerHTML = card.getAttribute('data-emoji');
  flippedCards.push(card);
  if (supportsVibrate) { try { navigator.vibrate(20); } catch (_) { } }

  if (flippedCards.length === 2) {
    let [card1, card2] = flippedCards;
    if (card1.getAttribute('data-emoji') === card2.getAttribute('data-emoji')) {
      card1.classList.add('matched');
      card2.classList.add('matched');
      matchedPairs++;
      flippedCards = [];
      if (matchedPairs === EMOJIS.length) {
        setTimeout(showWin, 700);
      }
    } else {
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.innerHTML = '<span style="opacity:0;">' + card1.getAttribute('data-emoji') + '</span>';
        card2.innerHTML = '<span style="opacity:0;">' + card2.getAttribute('data-emoji') + '</span>';
        flippedCards = [];
      }, 880);
    }
  }
}

function showWin() {
  messageBox.style.display = 'block';
  if (supportsVibrate) { try { navigator.vibrate([30, 40, 30]); } catch (_) { } }
}

continueBtn.addEventListener('click', () => {
  window.location.href = "../Scene4/somephotos.html";
});

window.onload = initGame;
