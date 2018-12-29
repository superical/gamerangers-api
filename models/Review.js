const offsetDateTime = require('../helpers/time').offsetDateTime

const Review = (db, DataType) => {
	const Model = db.define('review', {
		review_id: {
			type: DataType.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		content: {
			type: DataType.TEXT
		},
		game_id: {
			type: DataType.INTEGER
		},
		user_id: {
			type: DataType.INTEGER
		},
		rating: {
			type: DataType.INTEGER,
			validate: {
				min: {
					args: [0],
					msg: 'Minimum rating must be at least 0.'
				},
				max: {
					args: [5],
					msg: 'Maximum rating must be less than 5.'
				},
			}
		},
		createdAt: {
			type: DataType.DATE,
			get() {
				return offsetDateTime(this.getDataValue('createdAt'))
			}
		},
		updatedAt: {
			type: DataType.DATE,
			get() {
				return offsetDateTime(this.getDataValue('updatedAt'))
			}
		}
	})

	return Model
}

module.exports = Review