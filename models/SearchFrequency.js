const SearchFrequency = (db, DataType) => {
	const Model = db.define('search', {
			searchfreq_id: {
				type: DataType.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			game_id: {
				type: DataType.INTEGER
			}
		},
		{
			tableName: 'search_frequency'
		}
	)

	return Model
}

module.exports = SearchFrequency