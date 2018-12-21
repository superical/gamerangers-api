const jwt = require('express-jwt')
const passport = require('passport')
const StatusCodeError = require('../helpers/StatusCodeError')

const getTokenFromHeader = req => {
	const { headers: { authorization } } = req
	if(authorization && authorization.split(' ')[0] === 'Bearer') {
		return authorization.split(' ')[1]
	}
	return null
}

const jwtConfig = {
	secret: process.env.JWT_SECRET,
	userProperty: 'auth',
	getToken: getTokenFromHeader
}

module.exports = {
	required: jwt(jwtConfig),
	optional: jwt({...jwtConfig, credentialsRequired: false})
}