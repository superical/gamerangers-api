const sequelize = require('../helpers/db-connection')

const User = sequelize.import(__dirname + '/User.js')
const Review = sequelize.import(__dirname + '/Review.js')

module.exports = {
	Review,
	User
}

//foreignkey: on Reviews, sourceKey: on User
User.hasMany(Review, {foreignKey: 'user_id', sourceKey: 'user_id'})
//foreignkey: on Reviews, targetKey: on User
Review.belongsTo(User, {foreignKey: 'user_id', targetKey: 'user_id'})