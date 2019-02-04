const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')
const passport = require('passport')
const passportConfig = require('./config/passport')

const db = require('./helpers/dbConnection')
db.authenticate()
	.then(() => console.log('Database connection has been established successfully.'))
	.catch(err => console.error('Unable to connect to the database:', err))

const pathsConfig = require('./config/paths')

const app = express()
const host = pathsConfig.SERVER_HOSTNAME
const port = pathsConfig.SERVER_PORT

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))
app.use(require('./middlewares/cors'))

app.engine('html', require('mustache-express')())
app.engine('mustache', require('mustache-express')())
app.set('view engine', 'mustache')
app.set('views', __dirname + '/public')

app.use(express.static(path.join(__dirname, 'public')))
app.use(require('./middlewares/authenticate').optional)
passport.use(passportConfig.localStrategy)
passport.use(passportConfig.googleStrategy)
app.use(passport.initialize())

app.use('/', require('./routes'))

app.use('/api', require('./routes/api'))

const errorHandlers = require('./middlewares/errorHandlers')
app.use(errorHandlers.pageNotFound)
app.use(errorHandlers.catchAll)

const server = app.listen(port, host, function() {
	const host = server.address().address
	const port = server.address().port

    console.info("\t >>> GameRangers API server is listening at http://%s:%s", host, port)
});
