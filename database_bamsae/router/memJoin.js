const express = require('express');
const router = express.Router();
var db = require('../app.js');


// 회원가입 페이지 출력
router.get('/', function (req, res) {
    res.render('memJoin');
})


// 회원가입 정보 받아오기
router.post('/post-mem', function (req, rest) {
    // 유효한 가입 정보인지 확인
    req.assert('mem_id', '아이디를 확인해주세요.').notEmpty()
    req.assert('mem_pw', '비밀번호를 확인해주세요.').notEmpty()
    req.assert('mem_pw2', '비밀번호 확인을 위해 한 번 더 입력해주세요.').notEmpty()
    req.assert('email_id', '이메일 아이디를 입력해주세요.').notEmpty()
    req.assert('email_domain', '이메일 도메인을 입력해주세요.').notEmpty()
    req.assert('mem_name', '이름을 입력해주세요.').notEmpty()
    req.assert('mem_birth', '성별을 선택해주세요.').notEmpty()
    req.assert('mem_phone', '휴대폰 번호를 입력해주세요.').notEmpty()
    req.assert('roadAddrPart1', '주소를 입력해주세요.').notEmpty()
    req.assert('addrDetail', '상세 주소를 입력해주세요.').notEmpty()

    var errors = req.validationErrors()

    // 에러가 있다면 가입 거부
    if (errors || !idCheck(req.body.mem_id) || !pwCheck(req.body.mem_pw)) {
        var error_msg = ''
        errors.forEach(function (error) {
            error_msg += error.msg + '<br>'
        })
        req.flash('error', error_msg)
        res.render('memJoin')
    }
    // 에러가 없다면 가입 처리
    else {   
        var mem_id = req.sanitize('mem_id').escape()
        var mem_pw = req.sanitize('mem_pw').escape()
        var mem_name = req.sanitize('mem_name').escape()
        var mem_phone = req.sanitize('mem_phone').escape()
        var mem_email = req.sanitize('email_id').escape()+'@'+ req.sanitize('email_domain').escape()
        var mem_birth = req.sanitize('mem_birth').escape()
        var mem_gender = req.sanitize('mem_gender').escape()
        var mem_city = req.sanitize('roadAddrPart1').escape()
        var mem_address = req.sanitize('addrDetail').escape()

        db.query('INSERT INTO member VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now());',
            [mem_id, mem_pw, 1, mem_name, mem_phone, mem_email, mem_birth, mem_gender, mem_city, mem_address, 0], function (err, result) {
            if (err) {
                console.log(err)
                req.flash('error', err)
                res.render('memJoin')
            } else {
                req.flash('join', '가입을 축하드립니다. 로그인 후 서비스를 이용해주세요.')
                res.redirect('/memLogin');
            }
        })
    }
})


// 주소 검색 팝업창 출력
router.get('/post-add', (req, res) => {
    res.render('post-add');
});


// 주소 검색 api 호출 및 결과 받아오기
router.post('/post-add', (req, res) => {
    res.locals = req.body;
    console.log(res.locals);
    res.render('post-add');
});


// 아이디 유효성 확인
router.post('/idCheck', (req, res) => {
    var response = { 'result': idCheck(req.body.mem_id), 'mem_id': req.body.mem_id };
    res.json(response)
});


// 비밀번호 유효성 확인
router.post('/pwCheck', (req, res) => {
    var response = { 'result': pwCheck(req.body.mem_pw), 'mem_pw': req.body.mem_pw };
    res.json(response);
})


// (함수) 아이디 유효성 확인
var spc = new RegExp(/[~!@#$%^&* ()_ +|<>?:{}]/); // 특수문자
var kor = new RegExp(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/); // 한글
var eng = new RegExp(/^[a-zA-Z]*$/); // 영어
var num = new RegExp(/^[0-9]*$/); // 숫자

function idCheck(id) {
    console.log(id)
    // 5~15자 확인
    if (id.length > 15 || id.length < 5) return 1

    // 영문, 숫자 조합 확인
    if (spc.test(id) || kor.test(id)) return 2;

    // 중복 확인
    db.query('SELECT FROM member WHERE mem_id = ?', id, function (err, result) {
        if (!err) {
            response = { 'result': 'ok', 'mem_id': req.body.mem_id };
        }
        else return 3;
    })

    return 0;
}


// (함수) 비밀번호 유효성 확인
function pwCheck(pw) {
    // 8~16자 확인
    if (pw.length > 16 || pw.length < 8) return 1

    // 영문, 숫자, 특수문자 조합 확인
    if (spc.test(pw) && !kor.test(pw) && eng.test(pw), num.test(pw)) return 2;

    return 0;
}


module.exports = router