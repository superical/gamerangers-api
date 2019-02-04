const fs = require('fs')
const path = require('path')
const router = require('express').Router()

router.get('/', (req, res) => res.render('pages/index.html'))

const pageFiles = fs.readdirSync(path.resolve(path.join('public', 'pages')))
pageFiles.forEach(filename => router.get(`/${filename}`, (req, res) => res.render(`pages/${filename}`)))

module.exports = router