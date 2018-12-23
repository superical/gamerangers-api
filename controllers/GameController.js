const Game = require('../models').Game
const StatusCodeError = require('../helpers/StatusCodeError')
const validateParams = require('../helpers/validateRequestParams')

const index = (req, res, next) => {
	Game.findAll()
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
			    data: game.dataValues
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

const remove = (req, res, next) => {
	Game.findOne({where: {game_id: req.params.gameid}})
		.then(game => {
			if(!game) throw new StatusCodeError('Cannot find game ID to delete.', 404)
			return game.destroy()
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