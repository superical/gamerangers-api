const moment = require('moment')

const offsetDateTime = (datetimeVal, timezone = '+08:00') => moment.utc(datetimeVal).utcOffset(timezone).toISOString(true)

module.exports = {
	offsetDateTime
}