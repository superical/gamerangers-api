const Sequelize = require('sequelize').default
const db = require('../helpers/db-connection')

const DataType = Sequelize.DataTypes

const Game = db.define('game', {
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
		type: Sequelize.STRING
	},
	trailer_youtube: {
		type: Sequelize.STRING
	},
	description: {
		type: Sequelize.TEXT
	}
})

module.exports = Game