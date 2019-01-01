const Op = require('sequelize').Op
const Review = require('../models').Review
const Game = require('../models').Game
const User = require('../models').User
const StatusCodeError = require('../helpers/StatusCodeError')
const validateParams = require('../helpers/validateRequestParams')
const resOutput = require('../helpers/responseOutput')

const userAttributes = ['user_id', 'first_name', 'last_name', 'email', 'isAdmin', 'createdAt', 'updatedAt']
const modelsIncluded = [{model: Game}, {model: User, attributes: userAttributes}]

const index = (req, res, next) => {
	Review.findAll({
		where: Object.keys(req.query).length === 0 ? undefined : {
			[Op.and]: [
				req.query.game_id ? {game_id: {[Op.eq]: req.query.game_id}} : undefined,
				req.query.user_id ? {user_id: {[Op.eq]: req.query.user_id}} : undefined
			]
		},
		order: [['createdAt', 'DESC']],
		include: modelsIncluded
	})
		.then(reviews => {
			res.status(200).json(resOutput.jsonData(reviews))
		})
		.catch(err => next(err))
}

const viewById = (req, res, next) => {
	Review.findOne({
		where: {review_id: req.params.reviewid},
		include: modelsIncluded
	})
		.then(review => {
			if(!review) throw new StatusCodeError('Cannot find review.', 404)
			return review
		})
		.then(review => res.status(200).json(resOutput.jsonData(review)))
		.catch(next)
}

const viewByUserId = (req, res, next) => {
	Review.findAll({
		where: {user_id: req.params.userid},
		include: modelsIncluded,
		order: [['createdAt', 'DESC']]
	})
		.then(reviews => res.status(200).json(resOutput.jsonData(reviews)))
		.catch(next)
}

const viewByGameId = (req, res, next) => {
	Review.findAll({
		where: {game_id: req.params.gameid},
		include: modelsIncluded,
		order: [['createdAt', 'DESC']]
	})
		.then(reviews => res.status(200).json(resOutput.jsonData(reviews)))
		.catch(next)
}

const create = (req, res, next) => {
	const requiredParams = ['content', 'game_id', 'rating', 'user_id']
	validateParams(requiredParams, req.body)

	const Game = require('../models').Game
	Game.findOne({where: {game_id: req.body.game_id}})
		.then(game => {
			if(!game) throw new StatusCodeError('Invalid game ID.', 404)
			return game
		})
		.then(() => Review.findOne({where: {game_id: req.body.game_id, user_id: req.body.user_id}}))
		.then(review => {
			if(review) throw new StatusCodeError('User already has a review for this game.', 409)
			return true
		})
		.then(() => Review.create({
			content: req.body.content,
			game_id: req.body.game_id,
			user_id: req.body.user_id,
			rating: req.body.rating
		}))
		.then(review => {
			return Promise.all([review.getGame(), review.getUser({attributes: userAttributes})])
				.then(metaData => {
					return {
						...review.dataValues,
						createdAt: review.createdAt,
						updatedAt: review.updatedAt,
						game: metaData[0],
						user: metaData[1]
					}
				})
		})
		.then(data => res.status(201).json(resOutput.jsonData(data)))
		.catch(next)
}

const update = (req, res, next) => {
	if(req.body.game_id) throw new StatusCodeError('You are not allowed to modify game ID of a review. Delete and recreate the review if needed.', 400)
	const acceptedParams = ['content', 'rating']

	Review.findOne({where: {review_id: req.params.reviewid}})
		.then(review => {
			if(!review) throw new StatusCodeError('Invalid review ID.', 404)
			Object.keys(req.body).forEach(paramName => {
				if(acceptedParams.indexOf(paramName) > -1)
					review[paramName] = req.body[paramName]
			})
			return review.save(acceptedParams)
		})
		.then(review => {
			return Promise.all([review.getGame(), review.getUser({attributes: userAttributes})])
				.then(metaData => {
					return {
						...review.dataValues,
						createdAt: review.createdAt,
						updatedAt: review.updatedAt,
						game: metaData[0],
						user: metaData[1]
					}
				})
		})
		.then(data => res.status(200).json(resOutput.jsonData(data)))
		.catch(next)
}

const remove = (req, res, next) => {
	Review.findOne({where: {review_id: req.params.reviewid}})
		.then(review => {
			if(!review) throw new StatusCodeError('Cannot find review to delete.', 404)
			return review.destroy()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
}

module.exports = {
	index,
	viewById,
	viewByUserId,
	viewByGameId,
	create,
	update,
	remove
}