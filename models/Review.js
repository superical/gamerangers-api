const Review = (db, DataType) => {
	return db.define('review', {
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
}

module.exports = Review