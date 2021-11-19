var express = require('express');
var router = express.Router();
var db = require('../app.js');


// 극장의 영화 시간표 조회
router.get('/', function (req, res) {
    var emp_belong = req.query.emp_belong;
    var beg = req.query.beg;
    var end = req.query.end;
    var movie_title = req.query.movie_title;
    console.log(emp_belong)
    db.query('SELECT theater_name, movie_title, screen_beg, screen_fin, audit_no FROM schedule NATURAL JOIN movie NATURAL JOIN auditorium NATURAL JOIN theater WHERE theater_id=? AND screen_beg BETWEEN ? AND ? AND movie_title=?;',
        [emp_belong, beg, end, movie_title], function (err, rows, fields) {
            if (err) {
                console.log(err);
            }
            else {
                res.send(rows);
            }
        })
})


module.exports = router;