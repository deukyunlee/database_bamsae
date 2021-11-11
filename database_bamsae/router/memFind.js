const express = require('express');
const router = express.Router();
var db = require('../app.js');

// ID/PW 찾기 페이지 출력
router.get('/', function (req, res) {
    res.render('memFind');
})


// 회원 이름과 휴대폰 번호로 ID 찾기
router.post('/findID', function (req, res) {
    var mem_name = req.body.mem_name;
    var mem_phone = req.body.mem_phone;
    var cert = req.body.cert;

    req.assert('mem_name', '이름을 입력해주세요.').notEmpty()
    req.assert('mem_phone', '휴대폰 번호를 입력해주세요.').notEmpty()
    req.assert('cert', '인증번호를 입력해주세요.').notEmpty()

    var errors = req.validationErrors()

    if (errors) {
        var error_msg = ''
        errors.forEach(function (error) {
            error_msg += error.msg + '<br>'
        })
        req.flash('id_error', error_msg)
        res.render('memFind')
    } else {
        db.query('SELECT mem_id FROM member WHERE mem_name = ? AND mem_phone = ?', [mem_name, mem_phone], function (err, rows, fields) {
            if (err) {
                console.log(err);
            }
            // 회원 이름과 등록된 휴대폰 번호가 일치하지 않을 때
            if (rows.length <= 0) {
                req.flash('id_error', '일치하는 가입 정보가 없습니다.')
                res.render('memFind');
            }
            // 일치할 때
            else {
                res.send("<script>alert('휴대폰 번호로 ID가 발송되었습니다.');location.href='/memLogin';</script>");
                res.end(rows)
            }
        })
    }
})


// 비밀번호를 찾을 아이디 가져오기
router.get('/findPW', function (req, res) {
    var mem_id = req.query.mem_id;

    if (mem_id == '') res.send("<script>alert('아이디를 입력해주세요.');location.href='/memFind/';</script>");
    else {
        db.query('SELECT * FROM member WHERE mem_id = ?', [mem_id], function (err, rows, fields) {
            if (err) {
                console.log(err);
            }
            // 찾는 아이디 정보가 없을 때
            if (rows.length <= 0) {
                res.send("<script>alert('해당 아이디의 가입 정보가 없습니다.');location.href='/memFind/';</script>");
            }
            // 일치하는 아이디 정보가 있을 때
            else {
                res.render('memFind', { mem_id: mem_id });
            }
        })
    }
})


// 비밀번호 재설정
router.post('/findPW', function (req, res, next) {
    var mem_id = req.query.mem_id;
    var mem_pw = req.body.mem_pw;
    var mem_pw2 = req.body.mem_pw2;
    var check = pwCheck(mem_pw);

    
    if (check == 1) res.send("<script>alert('8~16자 사이로 작성해주세요.');location.href='/memFind/';</script>");
    else if (check == 2) res.send("<script>alert('영문, 숫자, 특수문자를 조합해 작성해주세요.');location.href='/memFind/';</script>");
    else if (mem_pw != mem_pw2) res.send("<script>alert('비밀번호가 일치하지 않습니다.');location.href='/memFind/';</script>");
    else {
        db.query('UPDATE member SET mem_pw=? WHERE mem_id = ?', [mem_pw, mem_id], function (err, result) {
            if (!err) res.send("<script>alert('비밀번호가 재설정되었습니다.');location.href='/memLogin';</script>");
            else console.log(err);
        })
    }
    
})


// (함수) 비밀번호 유효성 확인
var spc = new RegExp(/[~!@#$%^&* ()_ +|<>?:{}]/); // 특수문자
var kor = new RegExp(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/); // 한글
var eng = new RegExp(/^[a-zA-Z]*$/); // 영어
var num = new RegExp(/^[0-9]*$/); // 숫자

function pwCheck(pw) {
    // 8~16자 확인
    if (pw.length > 16 || pw.length < 8) return 1

    // 영문, 숫자, 특수문자 조합 확인
    if (spc.test(pw) && !kor.test(pw) && eng.test(pw), num.test(pw)) return 2;

    return 0;
}


module.exports = router;
