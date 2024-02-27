// Variables to keep track of quiz state
let currentIndex = 0;
let totalTime = questions.length * 15;
let timerIdentifier;

// Variables to reference DOM elements
const quizQuestionsEl = document.querySelector('#questions');
const timerDisplayEl = document.querySelector('#time');
const optionsEl = document.querySelector('#choices');
const submitButtonEl = document.querySelector('#submit');
const startButtonEl = document.querySelector('#start');
const userInitialsEl = document.querySelector('#initials');
const feedbackMessageEl = document.querySelector('#feedback');

const initiateQuiz = () => {
  // Hide start screen
  document.querySelector('#start-screen').style.display = 'none';

  // Display quiz questions
  quizQuestionsEl.style.display = 'block';

  // Start timer
  timerIdentifier = setInterval(updateTimer, 1000);

  // Show starting time
  timerDisplayEl.textContent = totalTime;

  fetchQuestion();
}

const fetchQuestion = () => {
  const currentQuestion = questions[currentIndex];

  // Update question title
  document.querySelector('#question-title').textContent = currentQuestion.title;

  // Clear old choices
  optionsEl.innerHTML = '';

  // Loop over choices
  currentQuestion.choices.forEach((choice, i) => {
    const choiceButton = document.createElement('button');
    choiceButton.classList.add('choice-button');
    choiceButton.value = choice;
    choiceButton.textContent = `${i + 1}. ${choice}`;

    // Display choice
    optionsEl.appendChild(choiceButton);
  });
}

const handleChoiceClick = event => {
  if (!event.target.matches('.choice-button')) return;

  const isCorrect = event.target.value === questions[currentIndex].answer;
  feedbackMessageEl.textContent = isCorrect ? 'Correct!' : 'Incorrect!';
  totalTime = isCorrect ? totalTime : totalTime - 15;
  if (totalTime < 0) totalTime = 0;

  timerDisplayEl.textContent = totalTime;

  feedbackMessageEl.style.display = 'block';
  setTimeout(() => feedbackMessageEl.style.display = 'none', 1000);

  currentIndex++;

  if (totalTime <= 0 || currentIndex === questions.length) {
    endQuiz();
  } else {
    fetchQuestion();
  }
}

const endQuiz = () => {
  clearInterval(timerIdentifier);

  // Show end screen
  document.querySelector('#end-screen').style.display = 'block';

  // Display final score
  document.querySelector('#final-score').textContent = totalTime;

  // Hide quiz questions
  quizQuestionsEl.style.display = 'none';
}

const updateTimer = () => {
  totalTime--;
  timerDisplayEl.textContent = totalTime;

  if (totalTime <= 0) {
    endQuiz();
  }
}

const saveScore = () => {
  const userInitials = userInitialsEl.value.trim();

  if (userInitials !== '') {
    const highScores = JSON.parse(localStorage.getItem('highscores')) || [];

    const newScore = {
      score: totalTime,
      initials: userInitials,
    };

    // Save score to local storage
    highScores.push(newScore);
    localStorage.setItem('highscores', JSON.stringify(highScores));

    // Redirect to highscores page
    window.location.href = 'highscores.html';
  }
}

const checkEnterKey = event => {
  if (event.key === 'Enter') {
    saveScore();
  }
}

// Event listeners
submitButtonEl.addEventListener('click', saveScore);
startButtonEl.addEventListener('click', initiateQuiz);
optionsEl.addEventListener('click', handleChoiceClick);
userInitialsEl.addEventListener('keyup', checkEnterKey);
