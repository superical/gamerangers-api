const router = require('express').Router()
const auth = require('../../middlewares/authenticate')

router.get('/', (req, res) => {
	res.json({
		status: 'The GameRanger API is healthy.',
		data: 'Welcome to GameRangers!'
	})
})

router.use('/games', require('./games'))
router.use('/users', require('./users'))
router.use('/reviews', require('./reviews'))

router.use('/auth', require('./authentication'))

module.exports = router