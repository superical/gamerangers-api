const express = require('express')
const bodyparser = require('body-parser')

const gamesRoute = require('./resources/games')
const newsRoute = require('./resources/news')
const usersRoute = require('./resources/users')

const app = express()
var host = "127.0.0.1";
var port = 8080;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded())

app.get('/', function(req, res) {
    res.send('hello3');
});

app.use('/games', gamesRoute)
app.use('/news', newsRoute)
app.use('/users', usersRoute)

var server = app.listen(port, host, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});
