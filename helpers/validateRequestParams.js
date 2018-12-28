const StatusCodeError = require('./StatusCodeError')

module.exports = (requiredParamsList, requestParamsObj) => {
	if(requiredParamsList.length > 0 && requestParamsObj === undefined) throw new StatusCodeError('No parameters were provided.', 422)
	requiredParamsList.forEach(param => {
		if(!(param in requestParamsObj)) throw new StatusCodeError(`The ${param} field is required.`, 422)
	})
}