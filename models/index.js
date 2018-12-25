const sequelize = require('../helpers/dbConnection')

const User = sequelize.import(__dirname + '/User.js')
const Review = sequelize.import(__dirname + '/Review.js')
const Game = sequelize.import(__dirname + '/Game.js')
const SearchFrequency = sequelize.import(__dirname + '/SearchFrequency.js')
const News = sequelize.import(__dirname + '/News.js')

User.hasOne(User, {foreignKey: 'user_id'})
User.hasMany(Review, {foreignKey: 'user_id', sourceKey: 'user_id', onDelete: 'cascade', hooks: true})     //foreignkey: on Reviews, sourceKey: on User
Review.belongsTo(User, {foreignKey: 'user_id', targetKey: 'user_id'})   //foreignkey: on Reviews, targetKey: on User

Game.hasMany(Review, {foreignKey: 'game_id', sourceKey: 'game_id', onDelete: 'cascade', hooks: true})
Review.belongsTo(Game, {foreignKey: 'game_id', targetKey: 'game_id'})

SearchFrequency.belongsTo(Game, {foreignKey: 'game_id', sourceKey: 'game_id'})
Game.hasMany(SearchFrequency, {foreignKey: 'game_id', sourceKey: 'game_id', onDelete: 'cascade', hooks: true})

module.exports = {
	Review,
	User,
	Game,
	SearchFrequency,
	News
}