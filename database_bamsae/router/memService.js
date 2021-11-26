const express = require('express');
const app = express();
const router = express.Router();
const db = require('../app.js')

router.get('/', (req, res) => {
    res.render("memService");
});


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

//??? 1:1 ansd
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
