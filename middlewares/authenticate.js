const jwt = require('express-jwt')
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

const authErrorHandler = (err, req, res, next) => {
	if(err) throw new StatusCodeError(err.message, err.statusCode || 401)
	next()
}

const isUserAdmin = (req, res, next) => {
	if(!req.auth) return next(new StatusCodeError('Invalid logged in user.', 403))
	if(!req.auth.isAdmin) {
		return next(new StatusCodeError('Account has no admin rights to perform this action.', 403))
	}
	next()
}

const isOwnerOf = (model, modelIdParamName, paramType = 'params') => (err, req, res, next) => {
	if(!model) return next()
	model.findOne({where: {[model.primaryKeyAttribute]: req[paramType][modelIdParamName]}})
		.then(record => {
			if(!record) throw new StatusCodeError(`The ID ${req[paramType][modelIdParamName]} of this resource does not exist.`, 404)
			if(!record.getUser) throw new StatusCodeError('Model does not have owner.')
			return record.getUser()
		})
		.then(user => {
			if(!user) throw new StatusCodeError('Model has missing owner.')
			if(user.user_id !== req.auth.id) throw new StatusCodeError('Record does not belong to logged in account. Cannot perform this action.', 403)
			return next()
		})
		.catch(next)
}

const composeJwt = jwtConfigObj => [jwt(jwtConfigObj), authErrorHandler]
const composeJwtAndSelf = (requestedModel, modelIdParamName, paramType = 'params') => [jwt(jwtConfig), isUserAdmin, isOwnerOf(requestedModel, modelIdParamName, paramType),  authErrorHandler]
const composeJwtAndAdmin = [jwt(jwtConfig), isUserAdmin, authErrorHandler]

module.exports = {
	required: composeJwt(jwtConfig),
	optional: composeJwt({...jwtConfig, credentialsRequired: false}),
	self: composeJwtAndSelf,
	adminOnly: composeJwtAndAdmin
}