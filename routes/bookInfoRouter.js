var express = require('express');
var router = express.Router();
var { con } = require('../mysql')
var { mysqlQuery } = require('../mysql')

// 定义一个中间件为了查询数据库中的一些数据
router.use((req,res,next)=>{
    req.findNum = function (sql) {
        return new Promise((resolve,reject)=>{
            mysqlQuery(sql,data=>{
                resolve(data[0].number)
            })
        })
    }
    next()
})
router.get('/:id',function (req,res,next) {
    // 判断是否登入，没有登入不让进入isLogin
   if (req.session.isLogin) {
       let id = req.params.id
       mysqlQuery('select soBookDetail,thumbImgUrl,contentBrief,authorBrief from books where bookId='+id,(data)=>{
           res.render('detail',{data})
       })
   } else {
        res.redirect('/login')
   }





})
router.get('/page/:cid',async function (req,res) {
    let id = req.params.cid
    if (parseInt(id) !==1) {
        let ret = await req.findNum('select count(*) as number from books')
        let totalPage = Math.floor(ret/28)
        // 页面的起始编号
        let first = (id-1) * 28
        let sql = `select * from books limit ${first},28`
        let cur = parseInt(req.url.match(/\d+/igs)[0])
        mysqlQuery(sql,data=>{
            res.render('index',{data,totalPage,num:cur,flags:false})
        })
    } else {
        let ret = await req.findNum('select count(*) as number from books')
        let totalPage = Math.floor(ret/28)
        // flags是判断当前是第一页
        mysqlQuery('select * from books limit 0,28',(data)=>{
            res.render('index', {data,totalPage,num:2,flags:true});
        })
    }

})

module.exports = router
