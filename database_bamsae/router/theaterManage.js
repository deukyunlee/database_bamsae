var express = require('express');
var router = express.Router();
var db = require('../app.js');


// 극장 정보 불러오기
router.get('/', function (req, res) {
    var theater_id = req.query.emp_belong;
    db.query('SELECT * FROM theater WHERE theater_id=?', [theater_id], function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(rows);
        }
    })
})


// 극장 정보 등록하기
router.post('/', function (req, res) {
    var theater_id = req.body.theater_id
    var theater_name = req.body.theater_name
    var theater_loc = req.body.theater_loc
    var theater_call = req.body.theater_call
    var theater_info = req.body.theater_info
    db.query('INSERT INTO theater VALUES(?, ?, ?, ?, ?);',
        [theater_id, theater_name, theater_loc, theater_call, theater_info], function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("<script>alert('극장이 등록되었습니다.');location.href='/theater';</script>");
        }
    })
})


// 극장 정보 수정하기
router.put('/', function (req, res) {
    var theater_id = req.query.emp_belong
    var theater_name = req.body.theater_name
    var theater_loc = req.body.theater_loc
    var theater_call = req.body.theater_call
    var theater_info = req.body.theater_info
    db.query('UPDATE theater SET theater_name=?, theater_loc=?, theater_call=?, theater_info=? WHERE theater_id= ?;',
        [theater_name, theater_loc, theater_call, theater_info, theater_id], function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("<script>alert('극장 정보가 수정되었습니다.');location.href='/theater';</script>");
        }
    })
})


// 극장 정보 삭제하기
router.delete('/', function (req, res) {
    var theater_id = req.query.emp_belong;
    db.query('DELETE FROM theater WHERE theater_id=?', [theater_id], function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("<script>alert('삭제되었습니다.');location.href='/theater';</script>");
        }
    })
})


module.exports = router;