const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')
const passport = require('passport')
const passportConfig = require('./config/passport')

const db = require('./helpers/dbConnection')
db.authenticate()
	.then(() => console.log('Database connection has been established successfully.'))
	.catch(err => console.error('Unable to connect to the database:', err))

const app = express()
const host = "127.0.0.1";
const port = 8080;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))

app.engine('html', require('mustache-express')());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/public');

app.use(express.static(path.join(__dirname, 'public')))
app.use(require('./middlewares/authenticate').optional)
passport.use(passportConfig.localStrategy)
passport.use(passportConfig.googleStrategy)
app.use(passport.initialize());

app.get('/', function(req, res) {
    res.send('hello3');
});

app.use('/', require('./routes/api'))

app.use(function(err, req, res, next) {
	console.error('name:', err.name, 'actual error:', err)
	// console.error('Error:', err.message)
	if (!err.statusCode) err.statusCode = 500
	res.status(err.statusCode).json({error: err.message})
});

const server = app.listen(port, host, function() {
	const host = server.address().address;
	const port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});
