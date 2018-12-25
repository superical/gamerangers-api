const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Favourite = require('../models').Favourite
const Game = require('../models').Game
const User = require('../models').User
const SearchFrequency = require('../models').SearchFrequency
const StatusCodeError = require('../helpers/StatusCodeError')
const validateParams = require('../helpers/validateRequestParams')

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
			res.status(200).json({
				data: favourites.map(favourite => favourite)
			})
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
			return res.status(200).json({data: favourite})
		})
		.catch(next)
}

const viewByUserId = (req, res, next) => {
	Favourite.findAll({
		where: {user_id: req.params.userid},
		include: modelsIncluded
	})
		.then(favourite => {
			if(!favourite) throw new StatusCodeError('Cannot find favourite ID.', 404)
			return res.status(200).json({data: favourite})
		})
		.catch(next)
}

const createReplace = (req, res, next) => {
	const acceptedParams = ['game_id']
	validateParams(acceptedParams, req.body)

	Game.findOne({where: {game_id: req.body.game_id}})
		.then(game => {
			if(!game) throw new StatusCodeError('Invalid game ID to add to favourites.', 400)
			return game
		})
		.then(() => Favourite.findOne({where: {game_id: req.body.game_id, user_id: req.params.userid}})
			.then(favourite => {
				if(favourite) return favourite
				return Favourite.create({
					user_id: req.params.userid,
					game_id: req.body.game_id
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
		.then(data => res.status(201).json({data}))
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

const removeByGameFavId = (req, res, next) => {
	Favourite.findOne({where: {game_id: req.params.gameid, user_id: req.params.userid}})
		.then(favourite => {
			if(!favourite) throw new StatusCodeError('Cannot find game ID from favourites to delete.', 404)
			return favourite.destroy()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
}

module.exports = {
	index,
	viewById,
	viewByUserId,
	createReplace,
	remove,
	removeByGameFavId
}