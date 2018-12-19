const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')
const db = require('./helpers/db-connection')

db.authenticate()
	.then(() => console.log('Database connection has been established successfully.'))
	.catch(err => console.error('Unable to connect to the database:', err))

const gamesRoute = require('./routes/games')
const newsRoute = require('./routes/news')
const usersRoute = require('./routes/users')

const app = express()
var host = "127.0.0.1";
var port = 8080;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded())
app.use(express.static(path.join(__dirname, 'public')))
app.get('/', function(req, res) {
    res.send('hello3');
});

app.use('/games', gamesRoute)
app.use('/news', newsRoute)
app.use('/users', usersRoute)

app.use(function(err, req, res, next) {
	console.error(err.message)
	if (!err.statusCode) err.statusCode = 500
	res.status(err.statusCode).json({error: err.message})
});

var server = app.listen(port, host, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});
