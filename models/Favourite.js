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
		}
	})

	return Model
}

module.exports = Favourite