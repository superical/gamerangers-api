const rearrangeData = modelObj => {
	if(modelObj instanceof Array) {
		return modelObj.map(obj => rearrangeData(obj))
	} else {
		const result = Object.keys(modelObj.dataValues || modelObj)
			.reduce((result, key) => {
				if (modelObj[key] instanceof Object && key !== 'createdAt' && key !== 'updatedAt') {
					result[key] = rearrangeData(modelObj[key])
					return result
				} else {
					if (key !== 'createdAt' && key !== 'updatedAt') {
						result[key] = modelObj[key] || modelObj.getDataValue(key)
						return result
					}
					return result
				}
			}, {})
		result['createdAt'] = modelObj['createdAt'] || modelObj.getDataValue('createdAt')
		result['updatedAt'] = modelObj['updatedAt'] || modelObj.getDataValue('updatedAt')
		return result
	}
}

const nextData = (res, next, data) => {
	res.locals.data = data
	return next()
}

const jsonData = modelObj => {
	return {
		data: rearrangeData(modelObj)
	}
}

module.exports = {
	jsonData,
	nextData
}