const StatusCodeError = require('../helpers/StatusCodeError')

const authHandler = (err, req, res, next) => {
	if(err) throw new StatusCodeError(err.message, 400)
	next()
}

module.exports = {
	auth: authHandler
}