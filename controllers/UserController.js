const User = require('../models').User
const StatusCodeError = require('../helpers/StatusCodeError')
const validateRequestParams = require('../helpers/validateRequestParams')

const index = (req, res, next) => {
	User.findAll()
		.then(users => {
			res.status(200).json({data: users})
		})
		.catch(next)
}

const currentUser = (req, res, next) => {
	User.findOne({where: {
		email: req.auth.email,
		user_id: req.auth.id
	}})
		.then(user => {
			if(!user) throw new StatusCodeError('Current user is invalid.', 400)
			user.password = undefined
			res.status(200).json({data: user})
		})
		.catch(next)
}

const create = (req, res, next) => {
	const requiredFields = ['first_name', 'last_name', 'email', 'password']
	validateRequestParams(requiredFields, req.body)

    User.findOne({where: {email: req.body.email}})
        .then(user => {
            if(user) throw new StatusCodeError('Email address already has an account.', 409)
            return User.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password
            })
        })
        .then(user => res.status(201).json({data: user}))
        .catch(next)
}

const update = (req, res, next) => {
	const acceptedFields = ['first_name', 'last_name', 'email']

	User.findOne({where: {user_id: req.params.userid}})
		.then(user => {
			if(!user) throw new StatusCodeError('Cannot find account.', 404)
			Object.keys(req.body).forEach(paramName => {
				if(acceptedFields.indexOf(paramName) > -1)
					user[paramName] = req.body[paramName]
			})
			return user.save(acceptedFields)
				.then(() => {
					user.password = undefined
					res.status(200).json({data: user})
				})
		})
		.catch(next)
}

const remove = (req, res, next) => {
	validateRequestParams(['userid'], req.params)
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
	remove
}