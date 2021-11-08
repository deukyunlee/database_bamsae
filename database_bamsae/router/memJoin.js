const express = require('express');
const app = express();
const router = express.Router();


// 회원가입 페이지 출력
router.get('/memJoin', (req, res) => {
    console.log('회원가입 페이지입니다.');
    res.render('memJoin');
});


// 회원가입 정보 받아오기
router.post('/memJoin', (req, res) => {
    const body = req.body;
    const mem_id = body.mem_id;
    const mem_pw = body.mem_pw;
    const mem_phone = body.mem_phone;
    const mem_email = body.mem_email;
    const mem_birth = body.mem_birth;
    const mem_gender = body.mem_gender;
    const mem_city = body.mem_city;
    const mem_address = body.mem_address;

    // 아이디 중복 확인
    client.query('SELECT * FROM member WHERE mem_id=?', [mem_id], (err, data) => {
        if (data.length == 0) {
            console.log('회원가입 성공');
            client.query('insert into userdata(id, name, age, pw) values(?,?,1,?,?,?,?,?,?,?,0,now())', [
                mem_id, mem_pw, mem_phone, mem_email, mem_birth, mem_gender, mem_city, mem_address
            ]);
            res.redirect('/login');
        } else {
            console.log('중복되는 아이디입니다.');
            res.send('<script>alert("중복되는 아이디입니다.");</script>')
        }
    });
});

module.exports = router;
