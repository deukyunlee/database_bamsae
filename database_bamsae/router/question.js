const express = require('express');
const app = express();
const router = express.Router();
const db = require('../app.js')

router.get('/', (req, res) => {
    res.render("question");
});

//전체 1:1 문의 다 보기 (관리자용)
router.get('/1to1', (req, res) => {
    db.query(`select qna_id,mem_id,date_format(qna_date,'%Y-%m-%d') as qna_date ,qna_title,qna_content,
    if(qna_category=1,'??? ??','?? ??') as qna_category,if(is_completed=1,'O','X') as is_completed from qna;
     `, (err, data) => {
        if (data == undefined) {
            res.send({ "status": false });
        } else {
            res.send({ "status": true, "length": data.length, "data": data });
        }

    });
});


//1:1문의 회원별로 전체 보기 (회원)
router.get('/1to1Mem', (req, res) => {
    const mem_id = 'abc'//req.session.mem_id;
    db.query(`select qna_id,mem_id,date_format(qna_date,'%Y-%m-%d') as qna_date ,qna_title,qna_content,if(qna_category = 1,"분실물문의","대관문의") as qna_category ,if(is_completed=1,'O','X') as is_completed from qna where mem_id = ? `, [mem_id] , (err, data) => {
        if (data == undefined) {
            res.send({ "status": false });
        } else {
            res.send({ "status": true, "length": data.length, "data": data });
        }

    });
});

//1:1문의 회원별로 분실물 보기 (회원)
router.get('/1to1Lost', (req, res) => {
    const mem_id = 'abc'//req.session.mem_id;
    db.query(`select qna_id,mem_id,date_format(qna_date,'%Y-%m-%d') as qna_date ,qna_title,qna_content,if(qna_category = 1,"분실물문의","대관문의") as qna_category ,if(is_completed=1,'O','X') as is_completed from qna where mem_id = ? and qna_category = 1 `, [mem_id] , (err, data) => {
        if (data == undefined) {
            res.send({ "status": false });
        } else {
            res.send({ "status": true, "length": data.length, "data": data });
        }

    });
});

//1:1문의 회원별로 대관문의 보기 (회원)
router.get('/1to1Rent', (req, res) => {
    const mem_id = 'qwe'//req.session.mem_id;
    db.query(`select qna_id,mem_id,date_format(qna_date,'%Y-%m-%d') as qna_date ,qna_title,qna_content,if(qna_category = 1,"분실물문의","대관문의") as qna_category ,if(is_completed=1,'O','X') as is_completed from qna where mem_id = ? and qna_category = 2 `, [mem_id] , (err, data) => {
        if (data == undefined) {
            res.send({ "status": false });
        } else {
            res.send({ "status": true, "length": data.length, "data": data });
        }

    });
});

router.post('/new', (req, res) => {
    const qna_title = req.body.qna_title;
    const qna_content = req.body.qna_content;
    const qna_category = req.body.qna_category;
    const contact_way = req.body.contact_way;
    const mem_id = 'abc' //req.session.mem_id;

    db.query(`INSERT INTO qna(mem_id,qna_date,qna_title,qna_content,qna_category,is_completed,contact_way)
    VALUES(?,now(),?,?,?,1,?);`, [mem_id,qna_title,qna_content,qna_category,contact_way], (err, data) => {
        if (data == undefined) {
            res.send({ "status": false });
        } else {
            res.send({ "status": true, "length": data.affectedRows, });
        }
    });
});


//영화관 전체 공지 + 극장별 공지 조회
router.get('/noticeAll', (req, res) => {
    db.query(`select post_no,emp_id,theater_id,if(post_type=1,'통합','극장') as post_type,post_title,post_content,
                date_format(posted_date,'%Y-%m-%d') as posted_date,date_format(modified_date,'%Y-%m-%d') as modified_date 
                from notice_board where post_type = 1;`, (err, data) => {
        if (data == undefined) {
            res.send({ "status": false});
        } else {
            res.send({ "status": true, "length": data.length, "data": data });
        }

    });
});

//영화관 전체 공지 조회
router.get('/noticeTheater', (req, res) => {
    db.query(`select post_no,emp_id,theater_id,if(post_type!=1,'통합','극장') as post_type,post_title,post_content,
    date_format(posted_date,'%Y-%m-%d') as posted_date,date_format(modified_date,'%Y-%m-%d') as modified_date 
    from notice_board where post_type = 2`, (err, data) => {
        if (data == undefined) {
            res.send({ "status": false});
        } else {
            res.send({ "status": true, "length": data.length, "data": data });
        }

    });
});

//극장별 공지 조회
router.get('/theaterSelect', (req, res) => {
    const loc = req.query.loc;
    const query="%"+loc+"%";

    db.query(`select post_no,emp_id,theater_id,if(post_type!=1,'통합','극장') as post_type,post_title,post_content,
    date_format(posted_date,'%Y-%m-%d') as posted_date,date_format(modified_date,'%Y-%m-%d') as modified_date 
    from notice_board where post_type = 2 and theater_id LIKE ?`,[query], (err, data) => {
        if (data == undefined) {
            res.send({ "status": false});
        } else {
            res.send({ "status": true, "length": data.length, "data": data });
        }

    });
});
module.exports = router;
