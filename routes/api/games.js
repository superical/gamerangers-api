const router = require('express').Router()
const auth = require('../../middlewares/authenticate')

const GameController = require('../../controllers/GameController')
const ReviewController = require('../../controllers/ReviewController')

router.get('/', GameController.index)
router.get('/:gameid', GameController.viewById)
router.post('/', auth.required, GameController.create)
router.patch('/:gameid', auth.adminOnly, GameController.update)
router.delete('/:gameid', auth.adminOnly, GameController.remove)

router.get('/trending', GameController.trending)

router.get('/:gameid/reviews', ReviewController.viewByGameId)

module.exports = router