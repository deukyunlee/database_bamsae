const express = require('express');
const app = express();
const router = express.Router();
const db = require('../app.js')

//회원 전체 명부를 테이블 형태로 제공한다. 개인정보 보호를 위해 성명(일부 필터링)과 이메일주소까지만 공개하도록 한다.
//예) Lv.3/홍*동/hong@example.com/2021.10.01
router.get('/memberView', async (req, res) => {
    await db.query(`SELECT movie_id,movie_title,count(mem_id) FROM MOVIE natural join WISH
                     WHERE movie_release > CURDATE() GROUP BY movie_id`, (err, data) => {
        if (data.length <= 0) {
            res.send({ "status": false, "length": data.length });
        } else {
            res.send({ "status": true, "length": data.length, "data": data });
        }

    });
});


module.exports = router;
