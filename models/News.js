const offsetDateTime = require('../helpers/time').offsetDateTime

const News = (db, DataType) => {
	const Model = db.define('news', {
		news_id: {
			type: DataType.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		headline: {
			type: DataType.STRING
		},
		content: {
			type: DataType.TEXT
		},
		createdAt: {
			type: DataType.DATE,
			get() {
				return offsetDateTime(this.getDataValue('createdAt'))
			},
		},
		updatedAt: {
			type: DataType.DATE,
			get() {
				return offsetDateTime(this.getDataValue('updatedAt'))
			},
		}
    },
    {
        tableName: 'latest_news'
    })

	return Model
}

module.exports = News