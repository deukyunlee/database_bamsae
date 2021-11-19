var express = require('express');
var router = express.Router();
var db = require('../app.js');


// 극장 직원 근태 정보 불러오기
router.get('/', function (req, res) {
    var emp_belong = req.query.emp_belong;
    var beg = req.query.beg;
    var end = req.query.end;
    console.log(emp_belong)
    db.query('SELECT diligence.*, employee.emp_belong, employee.emp_name FROM diligence JOIN employee on diligence.emp_id=employee.emp_id WHERE emp_belong=? AND dil_worktime BETWEEN ? AND ?',
        [emp_belong, beg, end], function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(rows);
        }
    })
})


// 근태 정보를 극장 직원 아이디로 검색하기
router.get('/id', function (req, res) {
    var emp_belong = req.query.emp_belong;
    var beg = req.query.beg;
    var end = req.query.end;
    var emp_id = req.query.emp_id;
    console.log(emp_belong)
    db.query('SELECT diligence.*, employee.emp_belong, employee.emp_name FROM diligence JOIN employee on diligence.emp_id=employee.emp_id WHERE emp_belong=? AND dil_worktime BETWEEN ? AND ? AND diligence.emp_id=?',
        [emp_belong, beg, end, emp_id], function (err, rows, fields) {
            if (err) {
                console.log(err);
            }
            else {
                res.send(rows);
            }
        })
})


// 근태 정보를 극장 직원 이름으로 검색하기
router.get('/name', function (req, res) {
    var emp_belong = req.query.emp_belong;
    var beg = req.query.beg;
    var end = req.query.end;
    var emp_name = req.query.emp_name;
    console.log(emp_belong)
    db.query('SELECT diligence.*, employee.emp_belong, employee.emp_name FROM diligence JOIN employee on diligence.emp_id=employee.emp_id WHERE emp_belong=? AND dil_worktime BETWEEN ? AND ? AND employee.emp_name=?',
        [emp_belong, beg, end, emp_name], function (err, rows, fields) {
            if (err) {
                console.log(err);
            }
            else {
                res.send(rows);
            }
        })
})


// 극장 직원의 근태 정보 등록하기
router.post('/', function (req, res) {
    var emp_id = req.query.emp_id
    var dil_worktime = req.body.dil_worktime
    var dil_leavetime = req.body.dil_leavetime
    var dil_schedule = req.body.dil_schedule

    db.query('INSERT INTO diligence (emp_id, dil_worktime, dil_leavetime, dil_schedule) VALUES(?, ?, ?, ?);',
        [emp_id, dil_worktime, dil_leavetime, dil_schedule], function (err, rows, fields) {
            if (err) {
                console.log(err);
            }
            else {
                res.send("<script>alert('근무 정보가 등록되었습니다.');location.href='/theater/dil';</script>");
            }
        })
})


// 극장 직원의 근태 정보 수정하기
router.put('/', function (req, res) {
    var dil_id = req.query.dil_id
    var dil_worktime = req.body.dil_worktime
    var dil_leavetime = req.body.dil_leavetime
    var dil_schedule = req.body.dil_schedule

    db.query('UPDATE diligence SET dil_worktime=?, dil_leavetime=?, dil_schedule=? WHERE dil_id=?;',
        [dil_worktime, dil_leavetime, dil_schedule, dil_id], function (err, rows, fields) {
            if (err) {
                console.log(err);
            }
            else {
                res.send("<script>alert('근무 정보가 수정되었습니다.');location.href='/theater/dil';</script>");
            }
        })
})


// 극장 직원의 근태 정보 삭제하기
router.delete('/', function (req, res) {
    var dil_id = req.query.dil_id
    db.query('DELETE FROM diligence WHERE dil_id=?', [dil_id], function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("<script>alert('근무 정보가 삭제되었습니다.');location.href='/theater/dil';</script>");
        }
    })
})


module.exports = router;