var express = require('express');
var router = express.Router();
var db = require('../app.js');
var moment = require('moment');


// 극장 직원 정보 불러오기
router.get('/', function (req, res) {
    var emp_belong = req.query.emp_belong;
    db.query('SELECT * FROM employee WHERE emp_belong=?', [emp_belong], function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            rows[0].emp_birth = moment(rows[0].emp_birth).format('YYYY-MM-DD')
            rows[0].emp_join = moment(rows[0].emp_join).format('YYYY-MM-DD')
            res.send(rows);
        }
    })
})


// 극장 직원 정보 등록하기
router.post('/', function (req, res) {
    var emp_belong = req.query.emp_belong;
    var emp_id = req.body.emp_id
    var emp_name = req.body.emp_name
    var emp_phone = req.body.emp_phone
    var emp_gender = req.body.emp_gender
    var emp_birth = req.body.emp_birth
    var emp_dept = req.body.emp_dept
    var emp_rank = req.body.emp_rank
    var emp_type = req.body.emp_type
    var emp_email = req.body.emp_email
    var emp_password = req.body.emp_password

    db.query('INSERT INTO employee VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, now(), ?);',
        [emp_id, emp_name, emp_phone, emp_gender, emp_birth, emp_belong, emp_dept, emp_rank, emp_type, emp_email, emp_password], function (err, rows, fields) {
            if (err) {
                console.log(err);
            }
            else {
                res.send("<script>alert('직원 정보가 등록되었습니다.');location.href='/theater/emp';</script>");
            }
        })
})


// 극장 직원 정보 수정하기
router.put('/', function (req, res) {
    var emp_id = req.query.emp_id;
    var emp_name = req.body.emp_name
    var emp_phone = req.body.emp_phone
    var emp_gender = req.body.emp_gender
    var emp_birth = req.body.emp_birth
    var emp_dept = req.body.emp_dept
    var emp_rank = req.body.emp_rank
    var emp_type = req.body.emp_type
    var emp_email = req.body.emp_email
    var is_resignated = req.body.is_resignated
    var emp_password = req.body.emp_password

    db.query('UPDATE employee SET emp_name=?, emp_phone=?, emp_gender=?, emp_birth=?, emp_dept=?, emp_rank=?, emp_type=?, emp_email=?, emp_password=?, is_resignated=? WHERE emp_id=?;',
        [emp_name, emp_phone, emp_gender, emp_birth, emp_dept, emp_rank, emp_type, emp_email, emp_password, is_resignated, emp_id], function (err, rows, fields) {
            if (err) {
                console.log(err);
            }
            else {
                res.send("<script>alert('직원 정보가 수정되었습니다.');location.href='/theater/emp';</script>");
            }
        })
})


// 극장 직원 정보 삭제하기
router.delete('/', function (req, res) {
    var emp_id = req.query.emp_id;
    db.query('DELETE FROM employee WHERE emp_id=?', [emp_id], function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("<script>alert('직원 정보가 삭제되었습니다.');location.href='/theater/emp';</script>");
        }
    })
})


module.exports = router;