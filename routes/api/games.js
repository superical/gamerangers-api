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
router.post('/', auth.required, GameController.create)
router.patch('/:gameid', auth.adminOnly, GameController.update)

router.put('/:gameid/image', auth.optional, require('multer')({dest: 'uploads/'}).any(), GameController.setOrUpdateMainImage)

router.delete('/:gameid', auth.adminOnly, GameController.remove)



module.exports = router