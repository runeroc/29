class Game {
  constructor(title, description, imageUrl, id, rating = 0, category = 'general') {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.id = id;
    this.rating = rating;
    this.category = category;
  }

  render() {
    const gameElement = document.createElement('div');
    gameElement.classList.add('game');
    gameElement.dataset.id = this.id;
    gameElement.dataset.category = this.category;

    gameElement.appendChild(this.createTitle());
    gameElement.appendChild(this.createDescription());
    gameElement.appendChild(this.createCategory());
    gameElement.appendChild(this.createImage());
    gameElement.appendChild(this.createRating());
    gameElement.appendChild(this.createDeleteButton());
    gameElement.appendChild(this.createDetailsButton());

    return gameElement;
  }

  createTitle() {
    const titleElement = document.createElement('h3');
    titleElement.textContent = this.title;
    return titleElement;
  }

  createDescription() {
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = this.description;
    return descriptionElement;
  }

  createCategory() {
    const categoryElement = document.createElement('span');
    categoryElement.classList.add('category');
    categoryElement.textContent = this.category;
    return categoryElement;
  }

  createImage() {
    const imageElement = document.createElement('img');
    imageElement.src = this.imageUrl;
    imageElement.alt = this.title;
    return imageElement;
  }

  createRating() {
    const ratingElement = document.createElement('span');
    ratingElement.classList.add('rating');
    ratingElement.textContent = `Рейтинг: ${this.rating}`;
    return ratingElement;
  }

  createDeleteButton() {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Видалити';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', () => this.deleteGame());
    return deleteButton;
  }

  createDetailsButton() {
    const detailsButton = document.createElement('button');
    detailsButton.textContent = 'Детальніше';
    detailsButton.classList.add('details-btn');
    detailsButton.addEventListener('click', () => this.showDetails());
    return detailsButton;
  }

  showDetails() {
    const modal = document.getElementById('game-details-modal');
    modal.style.display = 'block';

    document.getElementById('game-detail-title').textContent = this.title;
    document.getElementById('game-detail-image').src = this.imageUrl;
    document.getElementById('game-detail-description').textContent = this.description;
    document.getElementById('game-detail-category').textContent = `Категорія: ${this.category}`;
    document.getElementById('game-detail-rating').textContent = `Рейтинг: ${this.rating}`;

    const closeModalButton = document.getElementById('close-modal-btn');
    closeModalButton.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  deleteGame() {
    const games = JSON.parse(localStorage.getItem('games')) || [];
    const updatedGames = games.filter(game => game.id !== this.id);
    localStorage.setItem('games', JSON.stringify(updatedGames));
    loadGames();
  }
}

function saveGames(games) {
  localStorage.setItem('games', JSON.stringify(games));
}

function loadGames() {
  const gamesContainer = document.getElementById('games-container');
  gamesContainer.innerHTML = '';
  const games = JSON.parse(localStorage.getItem('games')) || [];
  games.forEach(gameData => {
    const game = new Game(gameData.title, gameData.description, gameData.imageUrl, gameData.id, gameData.rating, gameData.category);
    gamesContainer.appendChild(game.render());
  });
}

document.getElementById('add-game-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('game-title').value;
  const description = document.getElementById('game-description').value;
  const imageUrl = document.getElementById('game-image').value;
  const category = document.getElementById('game-category').value;

  const newGame = new Game(title, description, imageUrl, Date.now(), 0, category);

  const existingGames = JSON.parse(localStorage.getItem('games')) || [];
  existingGames.push(newGame);
  saveGames(existingGames);
  loadGames();
  document.getElementById('add-game-form').reset();
});

document.getElementById('category-filter').addEventListener('change', (e) => {
  filterGames(e.target.value);
});

document.getElementById('search-input').addEventListener('input', (e) => {
  searchGames(e.target.value);
});

function filterGames(category) {
  const games = document.querySelectorAll('.game');
  games.forEach(game => {
    if (category === 'all' || game.dataset.category === category) {
      game.style.display = 'block';
    } else {
      game.style.display = 'none';
    }
  });
}

function searchGames(query) {
  const games = document.querySelectorAll('.game');
  games.forEach(game => {
    const title = game.querySelector('h3').textContent.toLowerCase();
    if (title.includes(query.toLowerCase())) {
      game.style.display = 'block';
    } else {
      game.style.display = 'none';
    }
  });
}

document.addEventListener('DOMContentLoaded', loadGames);
