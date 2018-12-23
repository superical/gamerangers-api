const StatusCodeError = require('./StatusCodeError')

module.exports = (requiredParamsList, requestParamsObj) => {
	requiredParamsList.forEach(param => {
		if(!(param in requestParamsObj)) throw new StatusCodeError(`The ${param} field is required.`, 422)
	})
}