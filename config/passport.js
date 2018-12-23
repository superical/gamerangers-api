const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const User = require('../models').User
const StatusCodeError = require('../helpers/StatusCodeError')
const uuid = require('uuid/v4')
const sha256 = require('sha256')

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
			return done(null, user)
		})
		.catch(done)
})

const googleStrategy = new GoogleStrategy({
	clientID: process.env.AUTH_GOOGLE_CLIENT_ID,
	clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
	callbackURL: process.env.AUTH_GOOGLE_CALLBACK
}, (token, refreshToken, profile, done) => {
	User.findOne({where: {email: profile.emails[0].value}})
		.then(user => {
			if(!user) {
				return User.create({
					first_name: profile.name.givenName,
					last_name: profile.name.familyName,
					email: profile.emails[0].value,
					password: sha256(uuid()),
					google_id: profile.id
				})
			}
			return user
		})
		.then(user => done(null, user))
		.catch(done)
})

module.exports = {
	localStrategy,
	googleStrategy
}