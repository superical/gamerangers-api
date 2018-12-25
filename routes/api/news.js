const router = require('express').Router()
const auth = require('../../middlewares/authenticate')

const News = require('../../models').News
const NewsController = require('../../controllers/NewsController')

router.get('/', NewsController.index)
router.get('/:newsid', NewsController.viewById)
router.post('/', auth.adminOnly, NewsController.create)
router.patch('/:newsid', auth.adminOnly, NewsController.update)
router.delete('/:newsid', auth.adminOnly, NewsController.remove)

module.exports = router