const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models').User
const StatusCodeError = require('../helpers/StatusCodeError')

const localStrategy = new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	session: false,
	passReqToCallback: true
}, (req, username, password, done) => {
	User.findOne({where: {
		email: username
	}})
		.then(user => {
			if(!user) return done(new StatusCodeError('Invalid account.', 400), false)
			if(user.password !== password) return done(new StatusCodeError('Invalid email and password combination.', 400), false)
			req.user = user
			return done(null, user)
		})
		.catch(done)
})

module.exports = {
	localStrategy
}