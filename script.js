const games = [
    { title: "Game A", category: "action", image: "game-a.jpg", description: "Action game", downloadLink: "#" },
    { title: "Game B", category: "rpg", image: "game-b.jpg", description: "RPG game", downloadLink: "#" },
    { title: "Game C", category: "strategy", image: "game-c.jpg", description: "Strategy game", downloadLink: "#" },
    // Добавьте больше игр
];

let currentPage = 1;
const gamesPerPage = 4;

const gameList = document.getElementById("game-list");
const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");
const sortSelect = document.getElementById("sort");
const loader = document.getElementById("loader");
const themeToggle = document.getElementById("theme-toggle");

function toggleTheme() {
    const theme = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", theme === "dark" ? "light" : "dark");
}

themeToggle.addEventListener("click", toggleTheme);

function displayGames(page = 1) {
    loader.style.display = "block";
    setTimeout(() => {
        loader.style.display = "none";
        const filteredGames = filterAndSortGames();
        const start = (page - 1) * gamesPerPage;
        const paginatedGames = filteredGames.slice(start, start + gamesPerPage);

        gameList.innerHTML = paginatedGames.map(game => `
            <div class="game-item">
                <img src="${game.image}" alt="${game.title}">
                <div class="game-info">
                    <h3>${game.title}</h3>
                    <p>${game.description}</p>
                    <a href="${game.downloadLink}" target="_blank">Загрузить</a>
                </div>
            </div>
        `).join("");

        updatePagination(filteredGames.length);
    }, 500);
}

function filterAndSortGames() {
    const searchValue = searchInput.value.toLowerCase();
    const categoryValue = filterSelect.value;
    const sortValue = sortSelect.value;

    let filtered = games.filter(game =>
        game.title.toLowerCase().includes(searchValue) &&
        (!categoryValue || game.category === categoryValue)
    );

    if (sortValue === "alphabetical") {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
}

function updatePagination(totalGames) {
    const pageNumbers = document.getElementById("page-numbers");
    const totalPages = Math.ceil(totalGames / gamesPerPage);
    pageNumbers.innerHTML = Array.from({ length: totalPages }, (_, i) => `
        <button ${i + 1 === currentPage ? 'class="active"' : ''}>${i + 1}</button>
    `).join("");

    pageNumbers.querySelectorAll("button").forEach((button, index) => {
        button.addEventListener("click", () => {
            currentPage = index + 1;
            displayGames(currentPage);
        });
    });
}

searchInput.addEventListener("input", () => displayGames(1));
filterSelect.addEventListener("change", () => displayGames(1));
sortSelect.addEventListener("change", () => displayGames(1));

displayGames();
