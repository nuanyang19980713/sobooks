var express = require('express');
var router = express.Router();
var { con } = require('../mysql')
var { mysqlQuery } = require('../mysql')
var { select } = require('../mysql')

const crypto = require('crypto')
// 数据的加密
function md5(str) {
    var obj=crypto.createHash('md5');
    obj.update(str);
    return obj.digest('hex');
}
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
/* GET home page. */
router.get('/',async function(req, res, next) {
    req.session.isLogin = true
 let ret = await req.findNum('select count(*) as number from books')
  let totalPage = Math.floor(ret/28)
    // flags是判断当前是第一页
   mysqlQuery('select * from books limit 0,28',(data)=>{
     res.render('index', {data,totalPage,num:2,flags:true});
 })
});

//配置表单路由
router.get('/register',(req,res)=>{
    res.render('register',{title:'注册页面'})
})
router.get('/login',(req,res)=>{
    res.render('login',{title:'登入页面'})
})
router.post('/login',async (req,res)=>{
    let pass = md5(req.body.password)
    let username = req.body.username
    let userRet = await select(`select * from user where username= '${username}'`)
    let passRet = await select(`select * from user where password ='${pass}'`)

    if (userRet.length>0 && passRet.length>0){
        res.json({meta:200,message:'登入成功'})
        // 给一个凭证代表用户已经登入
        req.session.isLogin = true
    } else {
        res.json({meta:404,message:'账号或者密码错误登入失败'})
    }
})

router.post('/register',async (req,res)=>{
    let pass = md5(req.body.password)
    let username = req.body.username
    let ret = await select(`select * from user where username= '${username}'`)

    if(ret.length > 0) {
        res.json({meta:404,message:'账号已经存在注册失败'})
    } else {
        con.query('insert into user(id,username,password) values(null,?,?)',[req.body.username,pass],(err,data)=>{
            if (err) res.json({meta:500,message:'服务器异常'})
            else {
                res.json({meta:200,message:'注册成功'})
            }

        })

    }

})

module.exports = router;
