const express = require('express');
const app = express();
const router = express.Router();
const db = require('../app.js')

//카테고리 별 분류(관람권/스낵/패키지)
router.get('/', async (req, res) => {
    var product_type = req.query.product_type;
    console.log(product_type);
    
    if(product_type==='best'){//종류별로 3개씩 우선 뽑음
        await db.query(`(SELECT * FROM PRODUCT WHERE PRODUCT_TYPE = '1' limit 3)
                    union (SELECT * FROM PRODUCT WHERE PRODUCT_TYPE = '2' limit 3)
                    union (SELECT * FROM PRODUCT WHERE PRODUCT_TYPE = '3' limit 3);`, (err, data) => {
            if(data.length<=0){
                res.send({ "status": false, "length": data.length});
            }else{
                res.send({ "status": true, "length": data.length, "data": data });
            }
            
        });
    }else{
        await db.query('SELECT * FROM PRODUCT WHERE PRODUCT_TYPE = ?', [product_type], (err, data) => {
            if(data.length<=0){
                res.send({ "status": false, "length": data.length});
            }else{
                res.send({ "status": true, "length": data.length, "data": data });
            }
            
        });
    }
});

//상세조회
router.get('/pid', async (req, res) => {
    const product_id = req.query.product_id;

    await db.query('SELECT * FROM PRODUCT WHERE product_id = ?',[product_id], (err, data) => {
        if(data.length<=0){
            res.send({ "status": false});
        }else{
            res.send({ "status": true, "data": data });
        }
        
    });
});


module.exports = router;