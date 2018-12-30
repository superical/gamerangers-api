const offsetDateTime = require('../helpers/time').offsetDateTime

const SearchFrequency = (db, DataType) => {
	const Model = db.define('search', {
			searchfreq_id: {
				type: DataType.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			game_id: {
				type: DataType.INTEGER
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
			tableName: 'search_frequency'
		}
	)

	return Model
}

module.exports = SearchFrequency