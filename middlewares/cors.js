const cors = (req, res,next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS,HEAD');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

	if (req.method.toUpperCase() === 'OPTIONS') res.send(200)
	else next()
}

module.exports = cors