const router = require('express').Router()
const auth = require('../../middlewares/authenticate')

const User = require('../../models').User
const UserController = require('../../controllers/UserController')
const Favourite = require('../../models').Favourite
const FavouriteController = require('../../controllers/FavouriteController')

router.get('/', UserController.index)
router.get('/current', auth.required, UserController.currentUser)
router.post('/', UserController.create)
router.patch('/:userid', auth.self(User, 'userid'), UserController.update)
router.delete('/:userid', auth.adminOnly, UserController.remove)

router.get('/:userid/favourites', auth.self(User, 'userid'), FavouriteController.viewByUserId)
router.put('/:userid/favourites', auth.self(User, 'userid'), FavouriteController.createReplace)
router.delete('/:userid/favourites/:gameid', auth.self(User, 'userid'), FavouriteController.removeByGameFavId)

module.exports = router