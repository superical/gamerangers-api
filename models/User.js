const Sequelize = require('sequelize').default
const jwt = require('jsonwebtoken')
const db = require('../helpers/db-connection')

const DataType = Sequelize.DataTypes

const User = db.define('user', {
	first_name: {
		type: DataType.STRING
	},
	last_name: {
		type: DataType.STRING
	},
	email: {
		type: DataType.STRING
	},
	password: {
		type: Sequelize.STRING
	}
}, {
	getterMethods: {
		generateJwt() {
			const expiryDate = new Date((new Date()).getDate() + 0.5)
			return jwt.sign({
				id: this.getDataValue('id'),
				email: this.getDataValue('email'),
				exp: parseInt(expiryDate.getTime() / 1000, 10)
			}, process.env.JWT_SECRET)
		}
	}
})

module.exports = User