const router = require('express').Router()
const auth = require('../../middlewares/authenticate')

router.get('/', (req, res) => {
	res.json({
		status: 'The GameRanger API is healthy.',
		data: 'Welcome to GameRangers!'
	})
})

const GameController = require('../../controllers/GameController')
router.route('/games')
	.get(GameController.index)
	.post(GameController.create)

router.route('/games/:gameid')
	.get(GameController.viewById)
	.patch(GameController.update)
	.delete(GameController.remove)

router.use('/users', require('./users'))

/*router.route('/users')
	/!*.get(UserController.index)*!/
	.post(UserController.create)*/

/*router.route('/:userid')
	/!*.get(UserController.viewById)*!/
	.patch(UserController.update)
	.delete(UserController.remove)

router.route('/:userid/password')
	.patch(UserController.updatePassword)*/

module.exports = router