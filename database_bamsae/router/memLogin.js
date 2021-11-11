var express = require('express');
var router = express.Router();
var db = require('../app.js');


// 로그인 페이지 출력
router.get('/', function (req, res) {
    res.render('memLogin', {
        title: 'Login',
        mem_id: '',
        mem_pw: ''
    })
})


// 회원 식별
router.post('/auth', function (req, res) {
    var mem_id = req.body.mem_id;
    var mem_pw = req.body.mem_pw;

    db.query('SELECT * FROM member WHERE mem_id = ? AND mem_pw = ?', [mem_id, mem_pw], function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        // 로그인 정보가 일치하지 않을 때
        if (rows.length <= 0) {
            req.flash('error', '아이디와 비밀번호를 정확히 입력해주세요.')
            res.redirect('/memLogin')
        }
        // 로그인 정보가 일치할 때
        else {
            req.session.login = true;
            req.session.mem_id = mem_id;
            console.log(req.session);
            res.redirect('/memMain');
        }
    })
})


router.get('/out', function (req, res) {
    req.session.destroy();
    res.redirect('/');
})


module.exports = router;