const router = require('express').Router()

const GameController = require('../../controllers/GameController')
router.route('/')
	.get(GameController.index)
	.post(GameController.create)

router.route('/:gameid')
	.get(GameController.viewById)
	.patch(GameController.update)
	.delete(GameController.remove)

module.exports = router