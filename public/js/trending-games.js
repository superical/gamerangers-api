const loadTrendingGamesPage = () => {
    retrieveTrendingGames(10)
        .then(trendingGames => {
            let gamesCarouselHtml = ''
            let gamesCarouselIndicatorsHtml = ''
            trendingGames.forEach((trendingGame, idx) => {
                gamesCarouselHtml += `
                    <div class="carousel-item${idx === 0 ? ' active' : ''}">
                        <a href="./game.html?id=${trendingGame.game_id}">
                            <img src="${trendingGame.game.main_image}" class="d-block w-100" alt="${trendingGame.game.title}">
                            <div class="carousel-caption d-none d-md-block">
                                <h5> Number ${idx+1} : ${trendingGame.game.title}</h5>
                                <small>Searched <strong>${trendingGame.frequency}</strong> times.</small>
                                <p>${trendingGame.game.description}</p>
                            </div>
                        </a>
                    </div>
                `
                gamesCarouselIndicatorsHtml += `
                    <li data-target="#carouselTrendingGamesIndicators" data-slide-to="${idx}" ${idx === 0 ? 'class="active"' : ''}></li>
                `
            })
            const trendingCarouselInnerContainer = document.querySelector('#trendingCarouselInnerContainer')
            const trendingCarouselIndicatorsContainer = document.querySelector('#trendingCarouselIndicatorsContainer')
            trendingCarouselInnerContainer.innerHTML = gamesCarouselHtml
            trendingCarouselIndicatorsContainer.innerHTML = gamesCarouselIndicatorsHtml
            $('.carousel').carousel()
        })
}

window.addEventListener('load', function(e) {
    loadTrendingGamesPage()
   
})