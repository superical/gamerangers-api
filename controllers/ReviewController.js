const Review = require('../models').Review
const StatusCodeError = require('../helpers/StatusCodeError')
const validateParams = require('../helpers/validateRequestParams')

const index = (req, res, next) => {
	Review.findAll()
		.then(reviews => {
			res.status(200).json({
				data: reviews.map(review => review)
			})
		})
		.catch(err => next(err))
}

const viewById = (req, res, next) => {
	console.log('reviews view by id??')
	Review.findOne({where: {review_id: req.params.reviewid}})
		.then(review => {
			if(!review) throw new StatusCodeError('Cannot find review.', 404)
			return review
		})
		.then(review => res.status(200).json({data: review}))
		.catch(next)
}

const create = (req, res, next) => {
	const acceptedParams = ['content', 'game_id', 'rating']
	validateParams(acceptedParams, req.body)

	const Game = require('../models').Game
	Game.findOne({where: {game_id: req.body.game_id}})
		.then(game => {
			if(!game) throw new StatusCodeError('Invalid game ID.', 400)
			return game
		})
		.then(game => Review.create({
			content: req.body.content,
			game_id: game.game_id,
			user_id: req.auth.id,
			rating: req.body.rating
		}))
		.then(review => res.status(201).json({data: review}))
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
		.then(review => res.status(200).json({data: review}))
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
	create,
	update,
	remove
}