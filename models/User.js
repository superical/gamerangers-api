const jwt = require('jsonwebtoken')

const User = (db, DataType) => {
	const Model = db.define('user', {
		user_id: {
			type: DataType.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
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
			type: DataType.STRING
		},
		isAdmin: {
			type: DataType.BOOLEAN
		}
	})

	Model.prototype.getAuthObject = function() {
		const expiryDate = new Date()
		expiryDate.setHours(expiryDate.getHours() + 1)
		return {
			id: this.getDataValue('user_id'),
			email: this.getDataValue('email'),
			token: jwt.sign({
				id: this.getDataValue('user_id'),
				email: this.getDataValue('email'),
				isAdmin: this.getDataValue('isAdmin'),
				exp: parseInt(expiryDate.getTime() / 1000)
			}, process.env.JWT_SECRET)
		}
	}
	return Model
}

module.exports = User