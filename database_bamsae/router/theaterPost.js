var express = require('express');
var router = express.Router();
var db = require('../app.js');


// 극장 게시판 불러오기
router.get('/', function (req, res) {
    var theater_id = req.query.emp_belong;
    db.query('SELECT * FROM notice_board WHERE theater_id=?', [theater_id], function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(rows);
        }
    })
})


// 극장 공지사항&이벤트 등록하기
router.post('/', function (req, res) {
    var theater_id = req.query.emp_belong
    var emp_id = req.query.emp_id
    var post_type = "극장"
    var post_title = req.body.post_title
    var post_content = req.body.post_content
    db.query('INSERT INTO notice_board (emp_id, theater_id, post_type, post_title, post_content, posted_date) VALUES(?, ?, ?, ?, ?, now());',
        [emp_id, theater_id, post_type, post_title, post_content], function (err, rows, fields) {
            if (err) {
                console.log(err);
            }
            else {
                res.send("<script>alert('게시글이 등록되었습니다.');location.href='/theater/post';</script>");
            }
        })
})


// 극장 정보 수정하기
router.put('/', function (req, res) {
    var post_no = req.query.post_no
    var emp_id = req.query.emp_id
    var post_title = req.body.post_title
    var post_content = req.body.post_content

    db.query("SELECT * FROM notice_board WHERE post_no=? AND emp_id=?", [post_no, emp_id], function (err, rows, fields) {
        if (rows.length <= 0) {
            res.send("<script>alert('수정 권한이 없습니다.');location.href='/theater/post';</script>");
        } else {
            db.query('UPDATE notice_board SET post_title=?, post_content=?, modified_date=now() WHERE post_no= ? and emp_id=?;',
                [post_title, post_content, post_no, emp_id], function (err, rows, fields) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.send("<script>alert('게시글이 수정되었습니다.');location.href='/theater/post';</script>");
                    }
                })
        }
    })
})


// 극정 정보 삭제하기
router.delete('/', function (req, res) {
    var post_no = req.query.post_no
    var emp_id = req.query.emp_id

    db.query("SELECT * FROM notice_board WHERE post_no=? AND emp_id=?", [post_no, emp_id], function (err, rows, fields) {
        if (rows.length <= 0) {
            res.send("<script>alert('삭제 권한이 없습니다.');location.href='/theater/post';</script>");
        } else {
            db.query('DELETE FROM notice_board WHERE post_no=? and emp_id=?', [post_no, emp_id], function (err, rows, fields) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send("<script>alert('삭제되었습니다.');location.href='/theater/post';</script>");
                }
            })
        }
    })
})


module.exports = router;