const route = require('express').Router()
const sha256 = require('sha256')
const passport = require('passport')
const db = require('../helpers/db-connection')
const User = require('../models/User')
const StatusCodeError = require('../helpers/StatusCodeError')
const validateRequestParams = require('../helpers/validateRequestParams')

const create = (req, res, next) => {
    const requiredFields = ['first_name', 'last_name', 'email', 'password']
	validateRequestParams(requiredFields, req.body)

    User.findOne({where: {email: req.body.email}})
        .then(user => {
            if(user) throw new StatusCodeError('Email address already has an account.', 409)
            return User.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password
            })
        })
        .then(user => res.status(201).json({data: user}))
        .catch(err => next(err))
}

const login = (req, res, next) => {
	validateRequestParams(['email', 'password'], req.body)

	return passport.authenticate('local', {session: false}, (err, passportUser, info) => {
		if(err) next(err)
		if(passportUser) {
			const user = passportUser
			user.token = passportUser.generateJWT()
		}
	})
}

/*
const index = (req, res) => {
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
}


const updatePassword = (req, res) => {
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
}

const update = (req, res) => {
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
}

const remove = (req, res) => {
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
}*/

module.exports = {
	create
}