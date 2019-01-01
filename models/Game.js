const path = require('path')
const { URL } = require('url')
const pathsConfig = require('../config/paths')
const offsetDateTime = require('../helpers/time').offsetDateTime

const Game = (db, DataType) => {
	const Model = db.define('game', {
		game_id: {
			type: DataType.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		main_image: {
			type: DataType.STRING,
			get() {
				return (new URL(path.join(pathsConfig.GAME_IMAGES_DIR, this.getDataValue('main_image') || pathsConfig.GAMES_NO_IMAGE_FILE), pathsConfig.BASE_URL)).href
			}
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