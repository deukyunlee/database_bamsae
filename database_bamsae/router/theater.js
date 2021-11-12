const express = require('express');
const app = express();
const router = express.Router();
const db = require('../app.js')

//���� ���� -> ���� ���� -> ���� ������ �󿵽ð�ǥ
//�켱 ��� ������ ���̰� �� �ȿ��� ����
//���� ���� �󿵿�ȭ �󿵽ð� ��ȸ ����
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

//���� �� �� ���� 
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
