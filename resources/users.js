const route = require('express').Router()
const db = require('../db')
const sha256 = require('sha256')

route.get('/', (req, res) => {
    const sql = 'select * from users'
    db.query(sql, (qerr, qres) => {
        if(qerr) { 
            return res.status(500).json({
                error_code: 100,
                error: qerr.message
            })
        }
        res.status(200).json({
            data: qres.map(user => {
                delete user.password
                return user
            })
        })
    })
})

route.post('/', (req, res) => {
    if(!('first_name' in req.body)) {
        return res.status(422).json({
            error_code: 101,
            error: 'The first_name field is missing.'
        })
    }
    if(!('last_name' in req.body)) {
        return res.status(422).json({
            error_code: 101,
            error: 'The last_name field is missing.'
        })
    }
    if(!('email' in req.body)) {
        return res.status(422).json({
            error_code: 101,
            error: 'The email field is missing.'
        })
    }
    if(!('password' in req.body)) {
        return res.status(422).json({
            error_code: 101,
            error: 'The password field is missing.'
        })
    }
    const sql = 'insert into users set ?'
    const fields = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: sha256(req.body.password)
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

route.post('/:userid/password', (req, res) => {
    if(!('password' in req.body)) {
        return res.status(422).json({
            error_code: 101,
            error: 'The password field is missing.'
        })
    }
    const sql = 'update users set ? where user_id = ?'
    const fields = {
        password: sha256(req.body.password), 
    }
    db.query(sql, [fields, req.params.userid], (qerr, qres) => {
        if(qerr) { 
            return res.status(500).json({
                error_code: 100,
                error: qerr.message
            })
        }
        res.status(200).json({result: 'success'}) 
    })
})

route.put('/:userid', (req, res) => {
    if(!('first_name' in req.body)) {
        return res.status(422).json({
            error_code: 101,
            error: 'The first_name field is missing.'
        })
    }
    if(!('last_name' in req.body)) {
        return res.status(422).json({
            error_code: 101,
            error: 'The last_name field is missing.'
        })
    }
    if(!('email' in req.body)) {
        return res.status(422).json({
            error_code: 101,
            error: 'The email field is missing.'
        })
    }
    if(!('password' in req.body)) {
        return res.status(422).json({
            error_code: 101,
            error: 'The password field is missing.'
        })
    }
    const sql = 'update users set ? where user_id = ?'
    const fields = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: sha256(req.body.password), 
    }
    db.query(sql, [fields, req.params.userid], (qerr, qres) => {
        if(qerr) { 
            return res.status(500).json({
                error_code: 100,
                error: qerr.message
            })
        }
        res.status(200).json({result: 'success'}) 
    })
})

route.delete('/:userid', (req, res) => {
    const sql = 'delete from users where user_id = ?'
    db.query(sql, req.params.userid, (qerr, qres) => {
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