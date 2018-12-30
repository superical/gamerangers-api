const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Game = require('../models').Game
const SearchFrequency = require('../models').SearchFrequency
const StatusCodeError = require('../helpers/StatusCodeError')
const validateParams = require('../helpers/validateRequestParams')

const index = (req, res, next) => {
	Game.findAll({
		where: Object.keys(req.query).length === 0 ? undefined : {
			[Op.and]: [
				req.query.title ? {title: {[Op.like]: `%${req.query.title}%`}} : undefined,
				req.query.developer ? {developer: {[Op.like]: `%${req.query.developer}%`}} : undefined
			]
		},
		order: [['createdAt', 'DESC']]
	})
		.then(games => {
			if(Object.keys(req.query).length > 1 && req.query.search === 'true') games.forEach(game => SearchFrequency.create({game_id: game.game_id}))
			return games
		})
		.then(games => {
			res.status(200).json({
				data: games.map(game => game)
			})
		})
		.catch(next)
}

const viewById = (req, res, next) => {
	Game.findOne({where: {game_id: req.params.gameid}})
		.then(game => {
			if(!game) throw new StatusCodeError('Cannot find game ID.', 404)
			return res.status(200).json({data: game})
		})
		.catch(next)
}

const create = (req, res, next) => {
	const acceptedParams = ['main_image', 'title', 'release_date', 'developer', 'trailer_youtube', 'description']
    validateParams(acceptedParams, req.body)

    Game.create({
	    main_image: req.body.main_image,
	    title: req.body.title,
	    release_date: req.body.release_date,
	    developer: req.body.developer,
	    trailer_youtube: req.body.trailer_youtube,
	    description: req.body.description
    })
	    .then(game => {
	    	res.status(201).json({
			    data: game
		    })
	    })
	    .catch(next)
}

const update = (req, res, next) => {
	const acceptedFields = ['main_image', 'title', 'release_date', 'developer', 'trailer_youtube', 'description']
	Game.findOne({where: {game_id: req.params.gameid}})
		.then(game => {
			if(!game) throw new StatusCodeError('Cannot find game ID to update.', 404)
			Object.keys(req.body).forEach(paramName => {
				if(acceptedFields.indexOf(paramName) > -1)
					game[paramName] = req.body[paramName]
			})
			return game.save(acceptedFields)
				.then(() => res.status(200).json({data: game}))
		})
		.catch(next)
}

const setOrUpdateMainImage = (req, res, next) => {
	const requiredParams = ['main_image']
	validateParams(requiredParams)
	// https://medium.com/technoetics/handling-file-upload-in-nodejs-7a4bb9f09a27
	console.log(req.files)
}

const remove = (req, res, next) => {
	Game.findOne({where: {game_id: req.params.gameid}})
		.then(game => {
			if(!game) throw new StatusCodeError('Cannot find game ID to delete.', 404)
			return game.destroy()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
}

const trending = (req, res, next) => {
	const where = {}
	const createdAt = {}
	if(req.query.date_from && !req.query.date_to) {
		createdAt[Op.gte] = req.query.date_from
	} else if(!req.query.date_from && req.query.date_to) {
		console.log(req.query.date_to)
		createdAt[Op.lte] = req.query.date_to
	} else if(req.query.date_from && req.query.date_to) {
		createdAt[Op.and] = [
			{[Op.gte]: req.query.date_from},
			{[Op.lte]: req.query.date_to}
		]
	}
	if(Object.getOwnPropertySymbols(createdAt).length > 0) where.createdAt = createdAt
	SearchFrequency.findAll({
		where: where,
		group: 'game_id',
		attributes: ['game_id', [Sequelize.fn('COUNT', Sequelize.col('*')), 'frequency']],
		order: [[Sequelize.fn('COUNT', Sequelize.col('*')), 'DESC']],
		limit: req.query.limit ? parseInt(req.query.limit) : undefined,
		include: [{model: Game}]
	})
		.then(frequencies => res.status(200).json({data: frequencies}))
		.catch(next)
}

module.exports = {
	index,
	viewById,
	create,
	update,
	setOrUpdateMainImage,
	remove,
	trending
}