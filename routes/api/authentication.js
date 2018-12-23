const router = require('express').Router()
const AuthController = require('../../controllers/AuthController')

router.post('/login', AuthController.login)

router.get('/google', AuthController.googleAuth)
router.get('/google/callback', AuthController.googleAuthCallback)

router.get('/google-login-demo', (req, res) => {
	res.render('auth-login.html')
})

module.exports = router