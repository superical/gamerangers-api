const route = require('express').Router()
const db = require('../db')

route.get('/', (req, res) => {
    const sql = 'select * from games'
    db.query(sql, (qerr, qres) => {
        if(qerr) { 
            return res.status(500).json({
                error_code: 100,
                error: qerr.message
            })
        }
        res.status(200).json({
            data: qres
        })
    })
})

route.post('/', (req, res) => {
    if(!('description' in req.body)) {
        return res.status(422).json({
            error_code: 101,
            error: 'The description field is missing.'
        })
    }
    const sql = 'insert into games set ?'
    const fields = {
        main_image: req.body.main_image,
        title: req.body.title,
        release_date: req.body.release_date,
        developer: req.body.developer,
        trailer_youtube: req.body.trailer_youtube,
        description: req.body.description
    }
    db.query(sql, fields, (qerr, qres) => {
        if(qerr) { 
            return res.status(500).json({
                error_code: 100,
                error: qerr.message
            })
        }
        res.status(200).json({result: 'success'})
    })
})

route.put('/:gameid', (req, res) => {
    const sql = 'update games set ? where game_id = ?'
    const fields = {
        main_image: req.body.main_image,
        title: req.body.title,
        release_date: req.body.release_date,
        developer: req.body.developer,
        trailer_youtube: req.body.trailer_youtube,
        description: req.body.description
    }
    db.query(sql, [fields, req.params.gameid], (qerr, qres) => {
        if(qerr) { 
            return res.status(500).json({
                error_code: 100,
                error: qerr.message
            })
        }
        res.status(200).json({result: 'success'}) 
    })
})

route.delete('/:gameid', (req, res) => {
    const sql = 'delete from games where game_id = ?'
    db.query(sql, req.params.gameid, (qerr, qres) => {
        if(qerr) { 
            return res.status(500).json({
                error_code: 100,
                error: qerr.message
            })
        }
        res.status(200).json({result: 'success'}) 
    })
})

module.exports = route