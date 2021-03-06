const sha256 = require('sha256')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const User = require('../models').User
const StatusCodeError = require('../helpers/StatusCodeError')
const validateParams = require('../helpers/validateRequestParams')
const resOutput = require('../helpers/responseOutput')

const index = (req, res, next) => {
	User.findAll({order: [['createdAt', 'DESC']]})
		.then(users => {
			const data = users.map(user => {
				user.password = undefined
				return user
			})
			res.status(200).json(resOutput.jsonData(data))
		})
		.catch(next)
}

const currentUser = (req, res, next) => {
	User.findOne({where: {
		user_id: req.auth.id
	}})
		.then(user => {
			if(!user) throw new StatusCodeError('Current user is invalid.', 400)
			user.password = undefined
			res.status(200).json(resOutput.jsonData(user))
		})
		.catch(next)
}

const create = (req, res, next) => {
	const requiredFields = ['first_name', 'last_name', 'email', 'password']
	validateParams(requiredFields, req.body)

    User.findOne({where: {email: req.body.email}})
        .then(user => {
            if(user) throw new StatusCodeError('Email address already has an account.', 409)
            return User.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: sha256(req.body.password)
            })
        })
        .then(user => {
			user.password = undefined
			res.status(201).json(resOutput.jsonData(user))
		})
        .catch(next)
}

const update = (req, res, next) => {
	const acceptedFields = ['first_name', 'last_name', 'email']

	User.findOne({where: {user_id: req.params.userid}})
		.then(user => {
			if(!user) throw new StatusCodeError('Cannot find account.', 404)
			return user
		})
		.then(user => {
			if(req.body.email) {
				return User.findOne({
					where: {
						email: req.body.email,
						user_id: {
							[Op.ne]: user.user_id
						}
					}
				})
					.then(existingUser => {
						if(existingUser) throw new StatusCodeError('Email address is already used by another account.', 409)
						return user
					})
			} else return user

		})
		.then(user => {
			Object.keys(req.body).forEach(paramName => {
				if(acceptedFields.indexOf(paramName) > -1)
					user[paramName] = req.body[paramName]
			})
			return user.save(acceptedFields)
				.then(() => {
					user.password = undefined
					res.status(200).json(resOutput.jsonData(user))
				})
		})
		.catch(next)
}

const _changePassword = (userId, newPassword) => {
	return User.findOne({where: {user_id: userId}})
		.then(user => {
			if(!user) throw new StatusCodeError('Cannot find account', 404)
			user.password = sha256(newPassword)
			return user.save(['password'])
		})
}

const changePasswordByUserId = (req, res, next) => {
	const acceptedFields = ['password']
	validateParams(acceptedFields, req.body)

	_changePassword(req.params.userid, req.body.password)
		.then(user => {
			user.password = undefined
			res.status(200).json(resOutput.jsonData(user))
		})
}

const changePasswordByCurrentUserId = (req, res, next) => {
	if(!req.auth) throw new StatusCodeError('You are currently not logged in to perform this action.', 403)
	const acceptedFields = ['password']
	validateParams(acceptedFields, req.body)

	_changePassword(req.auth.id, req.body.password)
		.then(user => {
			user.password = undefined
			res.status(200).json(resOutput.jsonData(user))
		})
}

const remove = (req, res, next) => {
	validateParams(['userid'], req.params)
	User.findOne({where: {user_id: req.params.userid}})
		.then(user => {
			if(!user) throw new StatusCodeError('Cannot find user ID to delete.', 404)
			return user.destroy()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
}

module.exports = {
	index,
	currentUser,
	create,
	update,
	changePasswordByUserId,
	changePasswordByCurrentUserId,
	remove
}