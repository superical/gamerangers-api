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
		}
	})

	return Model
}

module.exports = Game