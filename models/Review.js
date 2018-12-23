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
			type: DataType.INTEGER
		}
	})

	return Model
}

module.exports = Review