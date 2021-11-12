const express = require('express');
const app = express();
const router = express.Router();
const db = require('../app.js')

//개봉 예정작 순위별 조회(찜 많은 순으로 구성) 
router.get('/upcomingList', async (req, res) => {
    await db.query(`SELECT movie_id,movie_title,count(mem_id) FROM MOVIE natural join WISH
                     WHERE movie_release > CURDATE() GROUP BY movie_id`, (err, data) => {
        if (data.length <= 0) {
            res.send({ "status": false, "length": data.length });
        } else {
            res.send({ "status": true, "length": data.length, "data": data });
        }

    });
});

//현재 상영작 순위별 조회(찜 많은 순으로 구성) -> 추후 관람객수 많은 순으로 변경 할수도 있음
router.get('/currentList', async (req, res) => {
    await db.query(`SELECT movie_id,movie_title,count(mem_id) FROM MOVIE natural join WISH
    WHERE movie_release <= CURDATE() GROUP BY movie_id`, (err, data) => {
        if (data.length <= 0) {
            res.send({ "status": false });
        } else {
            res.send({ "status": true, "length": data.length, "data": data });
        }

    });
});

//개봉 예정작 상세 조회
router.get('/upcoming', async (req, res) => {
    const movie_id = req.query.movie_id;

    await db.query(`SELECT * FROM MOVIE WHERE MOVIE_ID = ?`,[movie_id], (err, data) => {
        if (data.length <= 0) {
            res.send({ "status": false });
        } else {
            res.send({ "status": true, "data": data });
        }

    });
});

//현재 상영작 상세 조회
router.get('/current', async (req, res) => {
    const movie_id = req.query.movie_id;

    await db.query(`SELECT * FROM MOVIE WHERE MOVIE_ID = ?`,[movie_id], (err, data) => {
        if (data.length <= 0) {
            res.send({ "status": false });
        } else {
            res.send({ "status": true, "data": data });
        }

    });
});


module.exports = router;
