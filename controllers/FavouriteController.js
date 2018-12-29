const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Favourite = require('../models').Favourite
const Game = require('../models').Game
const User = require('../models').User
const StatusCodeError = require('../helpers/StatusCodeError')
const validateParams = require('../helpers/validateRequestParams')
const resOutput = require('../helpers/responseOutput')

const userAttributes = ['user_id', 'first_name', 'last_name', 'email', 'isAdmin', 'createdAt', 'updatedAt']
const modelsIncluded = [{model: Game}, {model: User, attributes: userAttributes}]

const index = (req, res, next) => {
	Favourite.findAll({
		where: Object.keys(req.query).length === 0 ? undefined : {
			[Op.and]: [
				req.query.user_id ? {user_id: {[Op.eq]: req.query.user_id}} : undefined,
				req.query.game_id ? {game_id: {[Op.eq]: req.query.game_id}} : undefined
			]
		},
		order: [['createdAt', 'DESC']],
		include: modelsIncluded
	})
		.then(favourites => {
			res.status(200).json(resOutput.jsonData(favourites))
		})
		.catch(next)
}

const viewById = (req, res, next) => {
	Favourite.findOne({
		where: {favourite_id: req.params.favouriteid},
		include: modelsIncluded
	})
		.then(favourite => {
			if(!favourite) throw new StatusCodeError('Cannot find favourite ID.', 404)
			return res.status(200).json(resOutput.jsonData(favourite))
		})
		.catch(next)
}

const _viewAllByUserId = userId =>
	Favourite.findAll({
		where: {user_id: userId},
		include: modelsIncluded,
		order: [['createdAt', 'DESC']]
	})
		.then(favourites => {
			return favourites
		})

const viewAllByCurrentUserId = (req, res, next) => {
	if(!req.auth) throw new StatusCodeError('You are currently not logged in to perform this action.', 403)
	_viewAllByUserId(req.auth.id)
		.then(favourites => res.status(200).json(resOutput.jsonData(favourites)))
		.catch(next)
}

const viewAllByUserId = (req, res, next) => {
	_viewAllByUserId(req.params.userid)
		.then(favourites => res.status(200).json(resOutput.jsonData(favourites)))
		.catch(next)
}

const _createReplace = (userId, gameId) =>
	Game.findOne({where: {game_id: gameId}})
		.then(game => {
			if(!game) throw new StatusCodeError('Invalid game ID to add to favourites.', 404)
			return game
		})
		.then(() => User.findOne({where: {user_id: userId}}))
		.then(user => {
			if(!user) throw new StatusCodeError('Invalid user ID to add favourites.', 404)
			return user
		})
		.then(() => Favourite.findOne({where: {game_id: gameId, user_id: userId}})
			.then(favourite => {
				if(favourite) return favourite
				return Favourite.create({
					user_id: userId,
					game_id: gameId
				})
			})
		)
		.then(favourite => {
			return Promise.all([favourite.getGame(), favourite.getUser({attributes: userAttributes})])
				.then(metaData => {
					return {
						...favourite.dataValues,
						game: metaData[0],
						user: metaData[1]
					}
				})
		})

const createReplaceByUserIdGameId = (req, res, next) => {
	const acceptedParams = ['game_id', 'user_id']
	validateParams(acceptedParams, req.body)
	_createReplace(req.body.user_id, req.body.game_id)
		.then(data => res.status(201).json(resOutput.jsonData(data)))
		.catch(next)
}

const createReplaceByCurrentUserIdGameId = (req, res, next) => {
	if(!req.auth) throw new StatusCodeError('You are currently not logged in to perform this action.', 403)
	_createReplace(req.auth.id, req.params.gameid)
		.then(data => res.status(201).json(resOutput.jsonData(data)))
		.catch(next)
}

const _removeByUserIdGameId = (userId, gameId) =>
	Favourite.findOne({where: {user_id: userId, game_id: gameId}})
		.then(favourite => {
			if(!favourite) throw new StatusCodeError('Cannot find favourite to delete.', 404)
			return favourite.destroy()
		})

const removeByCurrentUserId = (req, res, next) => {
	if(!req.auth) throw new StatusCodeError('You are currently not logged in to perform this action.', 403)
	_removeByUserIdGameId(req.auth.id, req.params.gameid)
		.then(() => res.sendStatus(204))
		.catch(next)
}

const remove = (req, res, next) => {
	Favourite.findOne({where: {favourite_id: req.params.favouriteid}})
		.then(favourite => {
			if(!favourite) throw new StatusCodeError('Cannot find favourite ID to delete.', 404)
			return favourite.destroy()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
}

module.exports = {
	index,
	viewById,
	viewAllByCurrentUserId,
	viewAllByUserId,
	createReplaceByUserIdGameId,
	createReplaceByCurrentUserIdGameId,
	remove,
	removeByCurrentUserId
}