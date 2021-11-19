const express = require('express');
const app = express();
const router = express.Router();
const db = require('../app.js')

router.get('/', (req, res) => {
    res.render("question");
});

router.get('/1to1', (req, res) => {
    db.query(`select qna_id,mem_id,date_format(qna_date,'%Y-%m-%d') as qna_date ,qna_title,qna_content,qna_category,if(is_completed=1,'O','X') as is_completed from qna;
     `, (err, data) => {
        if (data == undefined) {
            res.send({ "status": false });
        } else {
            res.send({ "status": true, "length": data.length, "data": data });
        }

    });
});

//ÅëÇÕ
router.get('/noticeAll', (req, res) => {
    db.query(`select post_no,emp_id,theater_id,if(post_type=1,'ÅëÇÕ','±ØÀå') as post_type,post_title,post_content,
                date_format(posted_date,'%Y-%m-%d') as posted_date,date_format(modified_date,'%Y-%m-%d') as modified_date 
                from notice_board where post_type = 1;`, (err, data) => {
        if (data == undefined) {
            res.send({ "status": false});
        } else {
            res.send({ "status": true, "length": data.length, "data": data });
        }

    });
});

//±ØÀåÀüÃ¼
router.get('/noticeTheater', (req, res) => {
    db.query(`select post_no,emp_id,theater_id,if(post_type!=1,'ÅëÇÕ','±ØÀå') as post_type,post_title,post_content,
    date_format(posted_date,'%Y-%m-%d') as posted_date,date_format(modified_date,'%Y-%m-%d') as modified_date 
    from notice_board where post_type = 2`, (err, data) => {
        if (data == undefined) {
            res.send({ "status": false});
        } else {
            res.send({ "status": true, "length": data.length, "data": data });
        }

    });
});

//±ØÀå
router.get('/theaterSelect', (req, res) => {
    const loc = req.query.loc;
    const query="%"+loc+"%";

    db.query(`select post_no,emp_id,theater_id,if(post_type!=1,'ÅëÇÕ','±ØÀå') as post_type,post_title,post_content,
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
