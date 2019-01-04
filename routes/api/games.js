const router = require('express').Router()
const auth = require('../../middlewares/authenticate')

const GameController = require('../../controllers/GameController')
const ReviewController = require('../../controllers/ReviewController')

router.get('/', GameController.index)
router.get('/trending', GameController.trending)

router.get('/testupload', (req, res) => {
	res.render('games-upload.html')
})

router.get('/:gameid/reviews', ReviewController.viewByGameId)
router.get('/:gameid', GameController.viewById)
router.post('/', auth.adminOnly, GameController.create)
router.patch('/:gameid', auth.adminOnly, GameController.update)

router.put('/:gameid/image', auth.adminOnly, require('body-parser').text({limit: '5mb', type: 'image/*'}), auth.optional, GameController.setOrUpdateMainImage)

router.delete('/:gameid', auth.adminOnly, GameController.remove)

module.exports = router