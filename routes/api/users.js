const router = require('express').Router()
const auth = require('../../middlewares/authenticate')
const errorHandler = require('../../middlewares/errorhandlers')
const passport = require('passport')

const UserController = require('../../controllers/UserController')

router.get('/', auth.optional, errorHandler.auth, UserController.index)
router.post('/', auth.required, errorHandler.auth, UserController.create)
router.patch('/:userid', auth.required, errorHandler.auth, UserController.update)

router.get('/current', auth.required, errorHandler.auth, UserController.currentUser)

router.post('/login', auth.optional, errorHandler.auth, UserController.login)

module.exports = router