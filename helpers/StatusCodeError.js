class StatusCodeError extends Error {

	constructor(errorMessage, statusCode = 500) {
		super()
		super.message = errorMessage
		this.statusCode = statusCode
	}
}

module.exports = StatusCodeError