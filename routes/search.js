const express = require('express')
const router = express.Router()
const { con } = require('../mysql')
const { mysqlQuery } = require('../mysql')

router.get('/:key',(req,res,next) =>{
    let sql = `select * from books where author like '%${req.params.key}%' 
    or category like '%${req.params.key}%'
    or title like '%${req.params.key}%'
    `
    mysqlQuery(sql,data=>{
        res.render('index')
    })
})

module.exports = router
