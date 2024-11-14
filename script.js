const games = [
    // Список ігор (залишився без змін)
];

let currentPage = 1;
const gamesPerPage = 4;

const gameList = document.getElementById('game-list');
const searchInput = document.getElementById('search');
const filterSelect = document.getElementById('filter');

function displayGames(page = 1) {
    const filteredGames = filterGames();
    const start = (page - 1) * gamesPerPage;
    const paginatedGames = filteredGames.slice(start, start + gamesPerPage);

    gameList.innerHTML = paginatedGames.map(game => `
        <div class="game-item">
            <img src="${game.image}" alt="${game.title}">
            <div class="game-info">
                <h3>${game.title}</h3>
                <p>${game.description}</p>
                <a href="${game.downloadLink}" target="_blank" rel="noopener noreferrer">Завантажити</a>
            </div>
        </div>
    `).join('');

    updatePagination(filteredGames.length);
}

function updatePagination(totalGames) {
    const pageNumbers = document.getElementById('page-numbers');
    const totalPages = Math.ceil(totalGames / gamesPerPage);
    pageNumbers.innerHTML = Array.from({ length: totalPages }, (_, i) => `
        <button ${i + 1 === currentPage ? 'class="active"' : ''}>
            ${i + 1}
        </button>
    `).join('');

    pageNumbers.querySelectorAll('button').forEach((button, index) => {
        button.addEventListener('click', () => {
            currentPage = index + 1;
            displayGames(currentPage);
        });
    });
}

function filterGames() {
    const searchValue = searchInput.value.toLowerCase();
    const categoryValue = filterSelect.value.toLowerCase();
    return games.filter(game =>
        game.title.toLowerCase().includes(searchValue) &&
        (!categoryValue || game.category === categoryValue)
    );
}

searchInput.addEventListener('input', () => displayGames(1));
filterSelect.addEventListener('change', () => displayGames(1));

displayGames();
