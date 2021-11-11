var express = require('express');
var router = express.Router();


// 비로그인 상태에서 메인페이지 출력
router.get('/', function (req, res, next) {
    res.render('main')
})


// 로그인 후 회원 메인 페이지 출력
router.get('/memMain', function (req, res, next) {
    // 로그인 상태가 아니라면 로그인 페이지로 redirect
    if (req.session.mem_id == null) {
        res.send("<script>alert('로그인이 필요합니다.');location.href='/memLogin';</script>");
    }
    // 로그인 상태일 때
    else {
        res.render('memMain', {mem_id:req.session.mem_id});
    }
})


// 로그인 후 직원 메인 페이지 출력
router.get('/empMain', function (req, res, next) {
    res.render('empMain');
})


module.exports = router;