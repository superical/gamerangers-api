function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const updateRandomGames = limit => {
    retrieveGames()
        .then(games => {
            const randomGamesArrIdx = []
            if(limit >= games.length) limit = games.length
            for(let i=0; i<limit; i++) {
                let randId = getRandomInt(0, games.length-1)
                while(randomGamesArrIdx.indexOf(randId) !== -1) {
                    randId = getRandomInt(0, games.length-1)
                }
                randomGamesArrIdx.push(randId)
            }
            let gamesHtml = ''
            const contentHomeRandomGames = document.querySelector('#contentHomeRandomGames')
            randomGamesArrIdx.forEach(gameArrIdx => {
                const gameData = games[gameArrIdx]
                gamesHtml += `
                    <div class="col-sm-6">
                        <div class="game-display">
                        <a href="game.html?id=${gameData.game_id}">
                            <img src="${gameData.main_image}" alt="${gameData.title}" class="img-thumbnail">
                        </a>
                        <h6>${gameData.title}</h6>
                        </div>
                    </div>
                `
            })
            contentHomeRandomGames.innerHTML = gamesHtml
        })
}

const listTopTrendingGames = limit => {
    retrieveTrendingGames(limit)
        .then(games => {
            const trendingGamesList = document.querySelector('#trendingGamesList')
            let trendingGamesListHtml = ''
            games.forEach(gameData => {
                trendingGamesListHtml += `
                    <li><a href="game.html?id=${gameData.game_id}">${gameData.game.title}</a></li>
                `
            })
            trendingGamesList.innerHTML = trendingGamesListHtml
        })
        .catch(err => {
            const trendingGamesList = document.querySelector('#trendingGamesList')
            trendingGamesList.innerHTML = `<li>Error fetching trending games.</li>`
        })
}

window.addEventListener('load', function(e) {
    updateRandomGames(4)
    listTopTrendingGames(10)
})