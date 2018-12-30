const passport = require('passport')
const StatusCodeError = require('../helpers/StatusCodeError')
const validateParams = require('../helpers/validateRequestParams')

const googleAuth = passport.authenticate('google', {scope: [
		'https://www.googleapis.com/auth/userinfo.email'
	]})

const googleAuthCallback = (req, res, next) => {
	passport.authenticate('google', {session: false}, (err, passportUser, info) => {
		if(err) throw err
		if(passportUser) {
			const authObj = passportUser.getAuthObject()
			res.render('auth-callback.html', {
				user_id: authObj.id,
				email: authObj.email,
				token: authObj.token
			})
			//return res.status(200).json({authentication: passportUser.getAuthObject()})
		} else {
			throw new Error('Authentication error with Google.')
		}
	})(req, res, next)
}

const login = (req, res, next) => {
	validateParams(['email', 'password'], req.body)

	return passport.authenticate('local', {session: false}, (err, passportUser, info) => {
		if(err) next(err)
		if(passportUser) {
			return res.status(200).json({authentication: passportUser.getAuthObject()})
		} else {
			throw new StatusCodeError('Authentication error.', 400)
		}
	})(req, res, next)
}

module.exports = {
	login,
	googleAuth, googleAuthCallback
}