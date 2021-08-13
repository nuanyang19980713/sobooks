// index页面的搜索功能

let search = document.querySelector('.search >button')
let input_search = document.querySelector('input[type="search"]')
let flag = true
search.addEventListener('click',(e)=>{
    if (flag) {
        input_search.style.display = 'block'
        flag = false
    } else {
        input_search.style.display = 'none'
        flag = true
    }
})

// 搜索功能的实现
input_search.addEventListener('keyup',(e)=>{
    if (e.keyCode == 13) {
        location.assign('/search/'+e.target.value)
    }
})


// 分页功能的实现
let list = document.querySelectorAll('.speedBar_item')
Array.from(list).forEach(item=>{
    item.onclick = function () {
        for(let i=0;i<list.length;i++) {
            list[i].classList.remove('active')
        }
        this.classList.add('active')
    }
})

// 上一页功能实现
let pre = document.querySelector('#pre');
if (pre) {
    pre.onclick = (e)=>{
        e.preventDefault()
        let prePageNum = parseInt(location.pathname.match(/\d+/igs)[0]) -1
        let url = location.pathname
        url = url.replace(prePageNum +1,'')
        location.assign(url + prePageNum)
    }
}

// 下一页功能的实现
let next = document.querySelector('#next')
next.addEventListener('click',function (e) {
    e.preventDefault()
    let nextPageNum = parseInt(location.pathname.match(/\d+/igs)[0]) +1
    let url = location.pathname
    url = url.replace(nextPageNum -1,'')
    location.assign(url + nextPageNum)
})

