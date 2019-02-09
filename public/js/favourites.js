const removeFavourite = gameId => {
    Utils.fetchAuthApi(`${Configuration.apiUrl}/users/current/favourites/${gameId}`, 'DELETE')
        .then(res => {
            if(res.status === 204) {
                alert('Selected favourite has been deleted successfully!')
                window.location.reload()
            } else {
                alert('There is an error while deleting favourite.')
            }
        })
}

const retrieveUserFavourites = () => {
    Utils.fetchAuthApi(`${Configuration.apiUrl}/users/current/favourites`, 'GET')
        .then(res => res.json())
        .then(resData => {
            if (resData.error) throw new Error(resData.error)
            const favs = resData.data
            let favsListingHtml = ''
            if (favs.length === 0) {
                favsListingHtml = `
                    <div class="col-sm-12">You do not have any favourites added to your account yet.</div>
                `
            } else {
                favs.forEach(fav => {
                    favsListingHtml += `
                    <div class="col-sm-6">
                        <div class="game-display">
                            <a href="game.html?id=${fav.game.game_id}">
                                <img src="${fav.game.main_image}" alt="${fav.game.title}" class="img-thumbnail">
                            </a>
                            <h6>${fav.game.title}</h6>
                        </div>
                        <div style="display: flex; justify-content: center; margin-top: -20px;">
                            <button data-gameid="${fav.game.game_id}" type="button" class="btn btn-outline-primary btn-sm removeFavBtn">Remove Favourite</button>
                        </div>
                    </div>
                `
                })
            }
            const favsListingContainer = document.querySelector('#favsListingContainer')
            favsListingContainer.innerHTML = favsListingHtml

            const removeFavBtns = document.querySelectorAll('.removeFavBtn')
            removeFavBtns.forEach(removeFavBtn => {
                removeFavBtn.addEventListener('click', function(e) {
                    if(confirm('Delete the selected game from Favourites?'))
                        removeFavourite(e.target.dataset.gameid)
                })
            })
        })
        .catch(err => standardErrorDisplay(err.message, document.querySelector('#favsListingContainer')))
}

window.addEventListener('load', function (e) {
    if(Authentication.isAuthenticated())
        retrieveUserFavourites()
    else {
        standardErrorDisplay(`Please <a href="./login.html">login</a> to view your favourite games.`, document.querySelector('#favsListingContainer'))
    }
})