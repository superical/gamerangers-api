const offsetDateTime = require('../helpers/time').offsetDateTime

const Favourite = (db, DataType) => {
	const Model = db.define('favourite', {
		favourite_id: {
			type: DataType.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		user_id: {
			type: DataType.INTEGER
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
	})

	return Model
}

module.exports = Favourite