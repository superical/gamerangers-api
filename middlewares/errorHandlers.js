const pageNotFound = (req, res, next) => {
	const notFoundMsg = `Oops, the path ${req.originalUrl} cannot be found. Did you enter a wrong path?`

	res.status(404)

	if (req.is('application/json') || req.accepts('json')) {
		res.json({error: notFoundMsg})
		return
	}

	res.type('txt').send(notFoundMsg)
}

const catchAll = function(err, req, res, next) {
	if(process.env.NODE_ENV !== 'production') console.error('Error Details:', '\n', err)
	if (!err.statusCode) err.statusCode = 500
	res.status(err.statusCode).json({error: err.message})
}

module.exports = {
	pageNotFound,
	catchAll
}