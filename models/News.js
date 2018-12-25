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
		}
    },
    {
        tableName: 'latest_news'
    })

	return Model
}

module.exports = News