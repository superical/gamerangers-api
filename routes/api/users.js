const router = require('express').Router()
const auth = require('../../middlewares/authenticate')

const User = require('../../models').User
const UserController = require('../../controllers/UserController')
const FavouriteController = require('../../controllers/FavouriteController')
const ReviewController = require('../../controllers/ReviewController')

router.get('/', UserController.index)
router.get('/current', auth.required, UserController.currentUser)
router.post('/', UserController.create)
router.patch('/:userid', auth.self, UserController.update)
router.delete('/:userid', auth.adminOnly, UserController.remove)

router.get('/:userid/favourites', auth.self, FavouriteController.viewByUserId)
router.put('/:userid/favourites', auth.self, FavouriteController.createReplace)
router.delete('/:userid/favourites/:gameid', auth.self, FavouriteController.removeByGameFavId)

router.get('/:userid/reviews', auth.self, ReviewController.viewByUserId)

module.exports = router