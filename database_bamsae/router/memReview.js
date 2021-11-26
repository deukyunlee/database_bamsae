const express = require('express');
const app = express();
const router = express.Router();
const db = require('../app.js')

router.get('/', (req, res) => {
    res.render("memReview");
});

router.post('/write', (req, res) => {
    const movie_id = req.body.movie_id;
    const review_star = req.body.review_star;
    const review_blind = req.body.review_blind;
    const review_content = req.body.review_content;
    const mem_id = req.session.mem_id;

    db.query(`insert into review(mem_id,movie_id,review_star,review_blind,review_content,review_time)
            values(?,?,?,?,?,now());`, [mem_id, movie_id, review_star, review_blind, review_content], (err, data) => {
        if (data == undefined) {
            res.send({ "status": false });
        } else {
            db.query(`insert into point(mem_id,point_type,point_date,point_use,point_num) values(?,2,now(),'?? ??',50);`, [mem_id], (err, data) => { if (data == undefined) throw err });
            db.query(`update member set mem_point =  mem_point+50  where mem_id = ?;`, [mem_id], (err, data) => { if (data == undefined) throw err });
            res.send({ "status": true, "length": data.affectedRows, });
        }

    });
});


//??? ??
router.get('/viewMovie', (req, res) => {
    const movie_id = req.query.movie_id;

    db.query(`select mem_id,review_id,review_star,review_blind,review_content,review_time 
                from review
                where movie_id = ?;`, [movie_id], (err, data) => {
        if (data == undefined) {
            res.send({ "status": false });
        } else {
            res.send({ "status": true, "length": data.length, "data": data });
        }

    });
});

//??? ??
router.get('/viewMem', (req, res) => {
    const mem_id = req.session.mem_id;

    db.query(`select movie_id,review_id,review_star,review_blind,review_content,review_time 
                from review
                where mem_id = ?;`, [mem_id], (err, data) => {
        if (data == undefined) {
            res.send({ "status": false });
        } else {
            res.send({ "status": true, "length": data.length, "data": data });
        }

    });
});
module.exports = router;
