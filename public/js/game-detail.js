const ratingVal = document.querySelector('#ratingVal')
const ratingSlider = document.querySelector('#ratingSlider')
ratingSlider.addEventListener('change', function(e) {
    ratingVal.innerHTML = ratingSlider.value
})

const getGameId = () => {
    const queryParams = new URLSearchParams(window.location.search)
    return queryParams.get('id')
}

const populateReviews = gameId => {
    retrieveReviews(gameId)
        .then(reviews => {
            let totalRating = 0
            let reviewsCardsHtml = ''
            if(reviews.length === 0) {
                reviewsCardsHtml = `<div style="text-align:center;">There are no reviews for this game yet.</div>`
            } else {
                reviews.forEach(review => {
                    totalRating += parseInt(review.rating)
                    reviewsCardsHtml += `
                        <div class="card review-card" style="width: 100%;">
                            <div class="card-body">
                                <h6 class="card-subtitle mb-2 text-muted">By ${review.user.first_name} ${review.user.last_name} on ${review.createdAt}.</h6>
                                <div class="rated-box">Rating: <div class="rated-star">${review.rating}</div></div>
                                <p class="card-text">${review.content}</p>
                            </div>
                        </div>
                `
                })
                totalRating /= reviews.length
            }
            const reviewsContainer = document.querySelector('#reviewsContainer')
            reviewsContainer.innerHTML = reviewsCardsHtml
            const contentOverallRating = document.querySelector('#contentOverallRating')
            contentOverallRating.innerHTML = (totalRating === 0) ? '-' : totalRating.toFixed(2)
        })
}

const updateGameContent = gameId => {
    const contentDescription = document.querySelector('#contentDescription')
    const contentGameTitle = document.querySelector('#contentGameTitle')
    const contentGameDeveloper = document.querySelector('#contentGameDeveloper')
    const contentReleaseDate = document.querySelector('#contentReleaseDate')
    const contentGameImage = document.querySelector('#contentGameImage')
    const contentGameVideo = document.querySelector('#contentGameVideo')
    
    retrieveGame(gameId)
        .then(game => {
            contentDescription.innerHTML = game.description
            contentGameDeveloper.innerHTML = game.developer
            contentReleaseDate.innerHTML = game.release_date
            contentGameTitle.innerHTML = game.title
            contentGameVideo.src = game.trailer_youtube
            contentGameImage.src = game.main_image
        })
}

const reviewForm = document.querySelector('#reviewForm')
reviewForm.addEventListener('submit', function(e) {
    e.preventDefault()
    const formElements = e.target.elements
    if(formElements['reviewTextarea'].value.trim() === '') {
        alert('Reviews cannot be empty.')
        return
    }
    const authInfo = Authentication.getAuthInfo()
    if(!authInfo) {
        alert('Please login before submitting a review.')
    } else {
        const body = {
            user_id: authInfo.id,
            game_id: getGameId(),
            rating: formElements['ratingSlider'].value,
            content: formElements['reviewTextarea'].value
        }
        Utils.fetchAuthApi(`${Configuration.apiUrl}/reviews`, 'POST', body)
            .then(res => res.json())
            .then(data => {
                if(data.error) throw new Error(data.error)
                alert('Your review has been submitted successfully.')
                ratingVal.innerHTML = '0'
                formElements['ratingSlider'].value = 0
                formElements['reviewTextarea'].value = ''
                populateReviews(getGameId())
                window.location.hash = 'reviews'
            })
            .catch(err => alert('An error has occurred:\n' + err.message))
    }
})

const retrieveReviews = gameId => {
    return Utils.fetchApi(`${Configuration.apiUrl}/reviews?game_id=${gameId}`, 'GET')
        .then(res => res.json())
        .then(data => {
            if(data.error) throw new Error(data.error)
            return data.data
        })
}

const retrieveGame = gameId => {
    return Utils.fetchApi(`${Configuration.apiUrl}/games/${gameId}`, 'GET')
        .then(res => res.json())
        .then(gameRes => {
            if(gameRes.error) throw new Error(gameRes.error)
            return gameRes.data
        })
}

const gameUploadImageForm = document.querySelector('#gameUploadImageForm')
gameUploadImageForm.addEventListener('submit', function(e) {
    e.preventDefault()
    const gameId = getGameId()
    if(!gameId) {
        alert('Invalid game ID.')
        return
    }
    if(this.elements['game_image_fileinput'].files.length === 0) {
        alert('Please select an image file first.')
        return
    }
	const fr = new FileReader()
	fr.addEventListener('load', e => {
		const pattern = /^data:(image\/.+);base64,/i
		const matches = e.target.result.match(pattern)
		if(matches === null || matches.length < 2) {
			alert('You have uploaded an invalid image file.')
			return
		}
		const contentType = matches[1]
		const imageData = e.target.result.replace(pattern, '')
        Utils.fetchAuthApi(`${Configuration.apiUrl}/games/${gameId}/image`, 'PUT', imageData, {
	        'Content-Type': contentType
        })
			.then(res => res.json())
			.then(data => {
			    if(data.error) throw new Error(data.error)
				const contentGameImage = document.querySelector('#contentGameImage')
				contentGameImage.src = data.data.main_image
				alert('Game image uploaded successfully!')
                window.location.reload()
            })
            .catch(err => alert('Error response from server\n' + err))
	})
	fr.readAsDataURL(this.elements['game_image_fileinput'].files[0])
})

const initAddGameToFavourites = gameId => {
    const addToFavBtn = document.querySelector('#addToFavBtn')
    Utils.fetchAuthApi(`${Configuration.apiUrl}/users/current/favourites`, 'GET')
        .then(res => res.json())
        .then(resData => {
            if(resData.error) throw new Error(resData.error)
            const favsList = resData.data
            for(let i=0; i<favsList.length; i++) {
                const fav = favsList[i]
                if(fav.game_id === parseInt(gameId)) {
                    return true
                }
            }
            return false
        })
        .then(isFavAlreadyAdded => {
            if(isFavAlreadyAdded) {
                addToFavBtn.innerHTML = 'Game is already added to Favourites'
                addToFavBtn.classList.add('disabled')
            } else {
                addToFavBtn.addEventListener('click', function(e) {
                    Utils.fetchAuthApi(`${Configuration.apiUrl}/users/current/favourites/${gameId}`, 'PUT')
                        .then(res => res.json())
                        .then(resData => {
                            if(resData.error) throw new Error(resData.error)
                            addToFavBtn.innerHTML = 'Added to Favourites!'
                            addToFavBtn.classList.add('disabled')
                        })
                        .catch(err => alert(err))
                })
            }
        })
        .catch(err => {
            addToFavBtn.addEventListener('click', function(e) {
                alert('You need to log in to add to Favourites.')
            })
        })
}

window.addEventListener('load', function(e) {
    populateReviews(getGameId())
    updateGameContent(getGameId())
    initAddGameToFavourites(getGameId())
})