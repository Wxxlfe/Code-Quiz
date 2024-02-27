const displayHighscores = () => {
  // Retrieve scores from local storage or initialize as an empty array
  let highscores = JSON.parse(localStorage.getItem('highscores')) || [];

  // Sort highscores by score property in descending order
  highscores.sort((a, b) => b.score - a.score);

  // Get the highscores list element
  const highscoresList = document.querySelector('#highscores');

  // Clear the list
  highscoresList.innerHTML = '';

  // Display highscores on the page
  highscores.forEach(score => {
    let listItem = document.createElement('li');
    listItem.textContent = `${score.initials} - ${score.score}`;
    highscoresList.appendChild(listItem);
  });
}

const clearHighscores = () => {
  // Remove highscores from local storage
  localStorage.removeItem('highscores');

  // Clear the highscores list
  document.querySelector('#highscores').innerHTML = '';
}

// Attach clearHighscores function to clear button onclick event
document.querySelector('#clear').addEventListener('click', clearHighscores);

// Call displayHighscores function when the page loads
displayHighscores();
  