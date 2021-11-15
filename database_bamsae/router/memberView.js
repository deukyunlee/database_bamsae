const express = require('express');
const app = express();
const router = express.Router();
const db = require('../app.js')

//ȸ�� ��ü ��θ� ���̺� ���·� �����Ѵ�. �������� ��ȣ�� ���� ����(�Ϻ� ���͸�)�� �̸����ּұ����� �����ϵ��� �Ѵ�.
//��) Lv.3/ȫ*��/hong@example.com/2021.10.01
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
