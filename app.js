/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


let scores, roundScore, activePlayer, activeGame;
const dice = document.querySelector('.dice');

init();

document.querySelector('.btn-roll').addEventListener('click', () => {
  if (activeGame) {
    let num = Math.floor(Math.random() * 6) + 1;

    dice.style.display = 'block';
    dice.src = './assets/images/dice-' + num + '.png';

    if (num === 1)
      switchPlayers();
    else {
      roundScore += num;

      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', () => {
  if (activeGame) {
    scores[activePlayer] += roundScore;
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
      dice.style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      activeGame = false;
    } else {
      switchPlayers();
    }
  }
});

document.querySelector('.btn-new').addEventListener('click', init);

const switchPlayers = () => {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  dice.style.display = 'none';
};

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  activeGame = true;

  dice.style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');

  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('active');

  document.querySelector('.player-0-panel').classList.add('active');
}

