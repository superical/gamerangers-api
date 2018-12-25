const router = require('express').Router()
const auth = require('../../middlewares/authenticate')

const Review = require('../../models').Review
const ReviewController = require('../../controllers/ReviewController')

router.get('/', ReviewController.index)
router.get('/:reviewid', ReviewController.viewById)
router.post('/', auth.required, ReviewController.create)
router.patch('/:reviewid', auth.selfOf(Review, 'reviewid'), ReviewController.update)
router.delete('/:reviewid', auth.selfOf(Review, 'reviewid'), ReviewController.remove)

module.exports = router