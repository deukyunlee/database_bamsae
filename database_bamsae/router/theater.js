const express = require('express');
const app = express();
const router = express.Router();
const db = require('../app.js')

//지역 선택 -> 지점 선택 -> 선택 극장의 상영시간표
//우선 모든 정보가 보이고 그 안에서 선택
//지역 지점 상영영화 상영시간 조회 가능
router.get('/', async (req, res) => {
    await db.query(`select  theater_id,audit_id,audit_no,audit_type,sched_id,movie_id,screen_beg,screen_fin 
                    from theater natural join auditorium natural join schedule;`, (err, data) => {
        if(data.length<=0){
            res.send({ "status": false});
        }else{
            res.send({ "status": true, "length":data.length,"data": data });
        }
        
    });

        
});

//지점 별 상세 정보 
router.get('/tid', async (req, res) => {
    const theater_id = req.query.theater_id;
    await db.query('SELECT * from theater WHERE theater_id = ?',[theater_id], (err, data) => {
        if(data.length<=0){
            res.send({ "status": false});
        }else{
            res.send({ "status": true, "data": data });
        }
        
    });
});


module.exports = router;
