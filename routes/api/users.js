const router = require('express').Router()
const auth = require('../../middlewares/authenticate')
const errorHandler = require('../../middlewares/errorhandlers')

const UserController = require('../../controllers/UserController')

router.post('/', auth.required, errorHandler.auth, UserController.create)

module.exports = router