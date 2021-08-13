const express = require('express')
const router = express.Router()
var { mysqlQuery } = require('../mysql')

async function category(categoryName,req,res) {
    let ret = await req.findNum(`select count(*) as number from books where category = "${categoryName}"`)
    let totalPage = Math.floor(ret / 28)
    let url = req.url
    url = url.replace(/\d+/igs,str=>{
        return ''
    })
    url += '/page'
    mysqlQuery(`select * from books where category = "${categoryName}" limit 0,28`, data => {
        res.render('category', {data, totalPage,flags:true
        ,num:2,url})
    })
}

async function categoryPage(categoryName,req,res) {
    let ret =  await req.findNum(`select count(*) as number from books where category = "${categoryName}"`)
    let totalPage = Math.floor(ret / 28)
    let pid = (req.params.pid - 1)*28
    let cur = parseInt(req.url.match(/\d+/igs)[0])
    let url = req.url
    url = url.replace(/\/\d+$/igs,str=>{
        return ''
    })
    mysqlQuery(`select * from books where category = "${categoryName}" limit ${pid},28`, data => {
        res.render('category', {data, totalPage,num:cur,flags:false,url})
    })
}

// 小说文学页面渲染
router.get('/fiction', async function (req,res) {
   await category('小说文学',req,res)
})
router.get('/fiction/page/:pid',async function (req,res) {
    await categoryPage('小说文学',req,res)
})
//历史文学页面的渲染
router.get('/history',async function(req,res,next) {
  await category('历史传记',req,res)
})
router.get('/history/page/:pid',async function(req,res,next) {
    await categoryPage('历史传记',req,res)
})
// 人文科学页面的渲染
router.get('/science',async function (req,res,next){

    await category('人文社科',req,res)
})
router.get('/science/page/:pid',async function(req,res) {
    await categoryPage('人文社科',req,res)
})
//励志成功页面渲染

router.get('/success',async function (req,res,next) {
   await category('励志成功',req,res)
})
router.get('/success/page/:pid',async function(req,res) {
    await categoryPage('励志成功',req,res)
})
// 经济管理页面的渲染

router.get('/economy',async function (req,res,next) {
    await category('经济管理',req,res)
})
router.get('/economy/page/:pid',async function (req,res,next) {
    await categoryPage('经济管理',req,res)
})
// 学习教育
router.get('/education',async function (req,res,next) {
    await category('学习教育',req,res)
})
router.get('/education/page/:pid',async function (req,res,next) {
    await categoryPage('学习教育',req,res)
})
// 生活时尚
router.get('/popular',async function (req,res,next) {
   await category('生活时尚',req,res)
})

router.get('/popular/page/:pid',async function (req,res,next) {
   await categoryPage('生活时尚',req,res)
})

// 英文原版
router.get('/englishPublish',async function (req,res,next) {
  await category('英文原版',req,res)
})

router.get('/englishPublish/page/:pid',async function (req,res) {
    let ret =  await req.findNum(`select count(*) as number from books where category = "英文原版"`);
    let totalPage = Math.ceil(ret / 28);
    let pid = (req.params.pid - 1)*28
    let cur = parseInt(req.url.match(/\d+/igs)[0])
    let url = req.url
    url = url.replace(/\/\d+$/igs,str=>{
        return ''
    })
    mysqlQuery(`select * from books where category = "英文原版" limit ${pid},28`,data=>{
        res.render('category',{data,totalPage,num:cur,url,flags:false})
    })
})


module.exports = router
