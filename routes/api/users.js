const router = require('express').Router()
const auth = require('../../middlewares/authenticate')

const User = require('../../models').User
const UserController = require('../../controllers/UserController')

router.get('/', UserController.index)
router.get('/current', auth.required, UserController.currentUser)
router.post('/', UserController.create)
router.post('/login', auth.optional, UserController.login)
router.patch('/:userid', auth.self(User, 'userid'), UserController.update)
router.delete('/:userid', auth.adminOnly, UserController.remove)

module.exports = router