const express = require('express');
const app = express();
const router = express.Router();
const db = require('../app.js')

//영화 제목으로 검색
router.get('/', async (req, res) => {
    const movie_title = req.query.movie_title;
    const query = '%'+movie_title+'%';

    await db.query('SELECT * FROM MOVIE WHERE movie_title LIKE ?',[query], (err, data) => {
        if(data.length<=0){
            res.send({ "status": false, "length": data.length});
        }else{
            res.send({ "status": true, "length": data.length, "data": data });
        }
        
    });
});

module.exports = router;
