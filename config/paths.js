const path = require('path')

module.exports = {
	SERVER_HOSTNAME: process.env.SERVER_HOSTNAME,
	SERVER_PORT: process.env.SERVER_PORT,
	BASE_URL: `http://${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}`,
	GAME_IMAGES_DIR: path.join('images', 'games'),
	GAMES_NO_IMAGE_FILE: 'no-image.jpg'
}