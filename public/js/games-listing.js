const updateGamesListing = () => {
    retrieveGames()
        .then(games => {
            let gameListingHtml = ''
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
})