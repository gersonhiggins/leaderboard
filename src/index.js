import './style.css';

const submit = document.querySelector('.submit');
const userInput = document.getElementById('name-item');
const scoreInput = document.getElementById('score-item');
const refesh = document.querySelector('.refresh');
const container = document.querySelector('.recent-scores');
const scores = async () => {
  try {
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/9eP6NXZQi1faNTCWhxT6/scores/');
    const data = await response.json();
    const scores = data.result;
    container.innerHTML = '';

    scores.forEach((score) => {
      const scoreitem = document.createElement('div');
      container.appendChild(scoreitem);
      scoreitem.setAttribute('class', 'score');
      const scoreText = document.createElement('p');
      scoreText.innerText = `${score.user}: ${score.score}`;
      scoreitem.appendChild(scoreText);
    });
  } catch (error) {
    alert('Error updating scores:', error);
  }
};
refesh.addEventListener('click', scores);
submit.addEventListener('click', () => {
  fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/9eP6NXZQi1faNTCWhxT6/scores/', {
    method: 'POST',
    body: JSON.stringify({
      user: `${userInput.value}`,
      score: `${scoreInput.value}`,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
});
