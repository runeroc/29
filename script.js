// Клас для гри
class Game {
  constructor(title, description, imageUrl) {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  render() {
    return `
      <div class="game">
        <h3>${this.title}</h3>
        <p>${this.description}</p>
        <img src="${this.imageUrl}" alt="${this.title}">
      </div>
    `;
  }
}

// Функція для збереження ігор у LocalStorage
function saveGames(games) {
  localStorage.setItem('games', JSON.stringify(games));
}

// Функція для завантаження ігор з LocalStorage
function loadGames() {
  const games = JSON.parse(localStorage.getItem('games')) || [];
  const gamesContainer = document.getElementById('games-container');
  gamesContainer.innerHTML = '';
  games.forEach(game => {
    const gameElement = new Game(game.title, game.description, game.imageUrl);
    gamesContainer.innerHTML += gameElement.render();
  });
}

// Додавання нової гри
document.getElementById('add-game-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('game-title').value;
  const description = document.getElementById('game-description').value;
  const imageUrl = document.getElementById('game-image').value;

  const newGame = new Game(title, description, imageUrl);

  // Отримуємо існуючі ігри з LocalStorage
  const existingGames = JSON.parse(localStorage.getItem('games')) || [];
  existingGames.push({ title, description, imageUrl });

  // Зберігаємо нові ігри
  saveGames(existingGames);

  // Оновлюємо відображення
  loadGames();

  // Очищаємо форму після додавання
  document.getElementById('add-game-form').reset();
});

// Завантажуємо ігри при завантаженні сторінки
document.addEventListener('DOMContentLoaded', loadGames);
