class Game {
  constructor(title, description, imageUrl) {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  render() {
    const gameElement = document.createElement('div');
    gameElement.classList.add('game');
    
    const titleElement = document.createElement('h3');
    titleElement.textContent = this.title;
    gameElement.appendChild(titleElement);
    
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = this.description;
    gameElement.appendChild(descriptionElement);
    
    const imageElement = document.createElement('img');
    imageElement.src = this.imageUrl;
    imageElement.alt = this.title;
    gameElement.appendChild(imageElement);
    
    return gameElement;
  }
}

class GameStorage {
  static getGames() {
    return JSON.parse(localStorage.getItem('games')) || [];
  }

  static saveGames(games) {
    localStorage.setItem('games', JSON.stringify(games));
  }
}

function loadGames() {
  const gamesContainer = document.getElementById('games-container');
  gamesContainer.innerHTML = ''; // Очистка контейнера

  const games = GameStorage.getGames();
  games.forEach(gameData => {
    const game = new Game(gameData.title, gameData.description, gameData.imageUrl);
    gamesContainer.appendChild(game.render());
  });
}

document.getElementById('add-game-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('game-title').value;
  const description = document.getElementById('game-description').value;
  const imageUrl = document.getElementById('game-image').value;

  // Перевірка на порожні значення
  if (!title || !description || !imageUrl) {
    alert("Будь ласка, заповніть усі поля!");
    return;
  }

  // Перевірка на дублікати
  const existingGames = GameStorage.getGames();
  if (existingGames.some(game => game.title === title)) {
    alert("Ця гра вже є в каталозі!");
    return;
  }

  // Додавання нової гри
  const newGame = new Game(title, description, imageUrl);
  existingGames.push({ title, description, imageUrl });
  GameStorage.saveGames(existingGames);

  // Оновлення відображення
  loadGames();

  // Очищення форми
  document.getElementById('add-game-form').reset();
});

// Завантаження ігор при завантаженні сторінки
document.addEventListener('DOMContentLoaded', loadGames);
