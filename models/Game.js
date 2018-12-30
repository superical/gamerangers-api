const offsetDateTime = require('../helpers/time').offsetDateTime

const Game = (db, DataType) => {
	const Model = db.define('game', {
		game_id: {
			type: DataType.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		main_image: {
			type: DataType.STRING
		},
		title: {
			type: DataType.STRING
		},
		release_date: {
			type: DataType.DATEONLY
		},
		developer: {
			type: DataType.STRING
		},
		trailer_youtube: {
			type: DataType.STRING
		},
		description: {
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
	})

	return Model
}

module.exports = Game