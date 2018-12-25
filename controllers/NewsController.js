const News = require('../models').News
const StatusCodeError = require('../helpers/StatusCodeError')
const validateParams = require('../helpers/validateRequestParams')

const index = (req, res, next) => {
	News.findAll({
        order: [['createdAt', 'DESC']]
    })
		.then(newss => {
			res.status(200).json({
				data: newss.map(news => news)
			})
		})
		.catch(err => next(err))
}

const viewById = (req, res, next) => {
	News.findOne({where: {news_id: req.params.newsid}})
		.then(news => {
			if(!news) throw new StatusCodeError('Cannot find news.', 404)
			return news
		})
		.then(news => res.status(200).json({data: news}))
		.catch(next)
}

const create = (req, res, next) => {
	const acceptedParams = ['headline', 'content']
	validateParams(acceptedParams, req.body)

    News.create({
        headline: req.body.headline,
        content: req.body.content
    })
        .then(news => res.status(201).json({date: news}))
        .catch(next)
}

const update = (req, res, next) => {
	if(req.body.news_id) throw new StatusCodeError('You are not allowed to modify news ID of a news. Delete and recreate the news if needed.', 400)
	const acceptedParams = ['headline', 'content']

	News.findOne({where: {news_id: req.params.newsid}})
		.then(news => {
			if(!news) throw new StatusCodeError('Invalid news ID.', 404)
			Object.keys(req.body).forEach(paramName => {
				if(acceptedParams.indexOf(paramName) > -1)
					news[paramName] = req.body[paramName]
			})
			return news.save(acceptedParams)
		})
		.then(review => res.status(200).json({data: review}))
		.catch(next)
}

const remove = (req, res, next) => {
	News.findOne({where: {news_id: req.params.newsid}})
		.then(news => {
			if(!news) throw new StatusCodeError('Cannot find news to delete.', 404)
			return news.destroy()
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