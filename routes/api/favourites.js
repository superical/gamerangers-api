const router = require('express').Router()
const auth = require('../../middlewares/authenticate')

const Favourite = require('../../models').Favourite
const FavouriteController = require('../../controllers/FavouriteController')

router.get('/', auth.adminOnly, FavouriteController.index)
router.get('/:favouriteid', auth.adminOnly, FavouriteController.viewById)
router.put('/:favouriteid', auth.adminOnly, FavouriteController.createReplaceByUserIdGameId)
router.delete('/:favouriteid', auth.adminOnly, FavouriteController.remove)

module.exports = router