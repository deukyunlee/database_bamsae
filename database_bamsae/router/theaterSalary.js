var express = require('express');
var router = express.Router();
var db = require('../app.js');


// 극장 직원의 급여 내역 불러오기
router.get('/', function (req, res) {
    var emp_belong = req.query.emp_belong;
    var beg = req.query.beg;
    var end = req.query.end;
    console.log(emp_belong)
    db.query('SELECT salary.*, employee.emp_belong, employee.emp_name FROM salary JOIN employee on salary.emp_id=employee.emp_id WHERE emp_belong=? AND sal_date BETWEEN ? AND ?',
        [emp_belong, beg, end], function (err, rows, fields) {
            if (err) {
                console.log(err);
            }
            else {
                res.send(rows);
            }
        })
})


// 급여 정보를 극장 직원 아이디로 검색하기
router.get('/id', function (req, res) {
    var beg = req.query.beg;
    var end = req.query.end;
    var emp_id = req.query.emp_id;
    db.query('SELECT salary.*, employee.emp_belong, employee.emp_name FROM salary JOIN employee on salary.emp_id=employee.emp_id WHERE sal_date BETWEEN ? AND ? AND salary.emp_id=?',
        [beg, end, emp_id], function (err, rows, fields) {
            if (err) {
                console.log(err);
            }
            else {
                res.send(rows);
            }
        })
})


// 급여 정보를 극장 직원 이름으로 검색하기
router.get('/name', function (req, res) {
    var emp_belong = req.query.emp_belong;
    var beg = req.query.beg;
    var end = req.query.end;
    var emp_name = req.query.emp_name;
    console.log(emp_belong)
    db.query('SELECT salary.*, employee.emp_belong, employee.emp_name FROM salary JOIN employee on salary.emp_id=employee.emp_id WHERE emp_belong=? AND sal_date BETWEEN ? AND ? AND employee.emp_name=?',
        [emp_belong, beg, end, emp_name], function (err, rows, fields) {
            if (err) {
                console.log(err);
            }
            else {
                res.send(rows);
            }
        })
})


// 극장 직원의 급여 정보 등록하기
router.post('/', function (req, res) {
    var emp_id = req.body.emp_id
    var sal_basic = req.body.sal_basic
    var sal_bonus = req.body.sal_bonus
    var sal_monthly = req.body.sal_monthly

    db.query('INSERT INTO salary VALUES(?, ?, ?, ?, now(), 0);',
        [emp_id, sal_basic, sal_bonus, sal_monthly], function (err, rows, fields) {
            if (err) {
                console.log(err);
            }
            else {
                res.send("<script>alert('급여 정보가 등록되었습니다.');location.href='/theater/sal';</script>");
            }
        })
})


// 극장 직원의 급여 정보 수정하기
router.put('/', function (req, res) {
    var emp_id = req.query.emp_id
    var sal_date = req.query.sal_date;
    var sal_basic = req.body.sal_basic
    var sal_bonus = req.body.sal_bonus
    var sal_monthly = req.body.sal_monthly
    var is_paid = req.body.is_paid

    db.query('UPDATE salary SET sal_basic=?, sal_bonus=?, sal_monthly=?, is_paid=? WHERE emp_id=? AND sal_date=?;',
        [sal_basic, sal_bonus, sal_monthly, is_paid, emp_id, sal_date], function (err, rows, fields) {
            if (err) {
                console.log(err);
            }
            else {
                res.send("<script>alert('급여 정보가 수정되었습니다.');location.href='/theater/sal';</script>");
            }
        })
})


// 극장 직원의 급여 정보 삭제하기
router.delete('/', function (req, res) {
    var emp_id = req.query.emp_id
    var sal_date = req.query.sal_date;
    db.query('DELETE FROM salary WHERE emp_id=? AND sal_date=?;', [emp_id, sal_date], function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("<script>alert('급여 정보가 삭제되었습니다.');location.href='/theater/sal';</script>");
        }
    })
})


module.exports = router;