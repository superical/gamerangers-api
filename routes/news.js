const route = require('express').Router()
const db = require('../helpers/db-connection')

route.get('/', (req, res) => {
    const sql = 'select * from latest_news order by date_posted desc'
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
    if(!('headline' in req.body)) {
        return res.status(422).json({
            error_code: 101,
            error: 'The headline field is missing.'
        })
    }
    if(!('content' in req.body)) {
        return res.status(422).json({
            error_code: 101,
            error: 'The content field is missing.'
        })
    }
    const sql = 'insert into latest_news set ?, date_posted = now(), date_updated = now()'
    const fields = {
        headline: req.body.headline,
        content: req.body.content
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

route.put('/:newsid', (req, res) => {
    const sql = 'update latest_news set ?, date_updated = now() where news_id = ?'
    const fields = {
        headline: req.body.headline,
        content: req.body.content
    }
    db.query(sql, [fields, req.params.newsid], (qerr, qres) => {
        if(qerr) { 
            return res.status(500).json({
                error_code: 100,
                error: qerr.message
            })
        }
        res.status(200).json({result: 'success'}) 
    })
})

route.delete('/:newsid', (req, res) => {
    const sql = 'delete from latest_news where news_id = ?'
    db.query(sql, req.params.newsid, (qerr, qres) => {
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