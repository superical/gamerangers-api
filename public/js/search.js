const updateGamesListing = () => {
    const queryParams = new URLSearchParams(window.location.search)
    const gameTitle = queryParams.get('title')
    const gameDeveloper = queryParams.get('developer')
    const searchGameTitle = document.querySelector('#searchGameTitle')
    searchGameTitle.innerHTML = gameTitle.trim()
    if(gameTitle.trim() === '' && gameDeveloper.trim() === '')
        return alert('Search query has nothing defined for searching.')
    searchGames(gameTitle, gameDeveloper)
        .then(games => {
            let gameListingHtml = ''
            if(games.length === 0) {
                gameListingHtml = `<div>No results found for '<strong>${gameTitle}</strong>' by developer '<strong>${gameDeveloper}</strong>'</div>`
            }
            games.forEach(gameData => {
                gameListingHtml += `
                <div class="row">
                    <div class="col-sm-6">
                    <div class="game-display">
                        <a href="game.html?id=${gameData.game_id}">
                        <img src="${gameData.main_image}" alt="${gameData.title}" class="img-thumbnail">
                        </a>
                        <h6>${gameData.title}</h6>
                    </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="game-display">
                            <a href="game.html?id=${gameData.game_id}">
                                <h1>${gameData.title}</h1>
                            </a>
                            <div>
                            <p>${gameData.description}</p>
                        </div>
                        </div>
                    </div>
                </div>
                `
            })
            const gamesListingContainer = document.querySelector('#gamesListingContainer')
            gamesListingContainer.innerHTML = gameListingHtml
        })
}

window.addEventListener('load', function(e) {
    updateGamesListing()
    const searchBox = document.querySelector('#searchBox')
    const queryParams = new URLSearchParams(window.location.search)
    const gameTitle = queryParams.get('title')
    if(gameTitle.trim() !== '') {
        searchBox.value = gameTitle
    }
})