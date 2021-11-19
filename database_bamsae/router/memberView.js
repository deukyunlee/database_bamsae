const express = require('express');
const app = express();
const router = express.Router();
const db = require('../app.js')

//회원 전체 명부를 테이블 형태로 제공한다. 개인정보 보호를 위해 성명(일부 필터링)과 이메일주소까지만 공개하도록 한다.
//예) Lv.3/홍*동/hong@example.com/2021.10.01
router.get('/', (req, res) => {
    res.render("memberView");
});

router.get('/viewAll', (req, res) => {
     db.query(`select mem_id,mem_lv,
     CASE WHEN CHAR_LENGTH(mem_name) > 2 THEN 
         CONCAT(
             SUBSTRING(mem_name, 1, 1)
             ,LPAD('*', CHAR_LENGTH(mem_name) - 2, '*')
             ,SUBSTRING(mem_name, CHAR_LENGTH(mem_name), CHAR_LENGTH(mem_name))
         )
         ELSE CONCAT(
             SUBSTRING(mem_name, 1, 1)
             ,LPAD('*', CHAR_LENGTH(mem_name) - 1, '*')
         )
     END AS mem_name,
     replace(mem_phone,right(mem_phone,4),'****') as mem_phone,mem_email,mem_birth,
     if(mem_gender=1,"남","여") as mem_gender
     ,mem_city,mem_address,mem_point,mem_join,mem_sanc from member;`, (err, data) => {
        if (data == undefined) {
            res.send({"status": false, "length": data.length});
        } else {
            res.send( {"status": true, "length": data.length,"data": data});
        }

    });
});

router.get('/viewLv', (req, res) => {
    var level = req.query.level;

    db.query(`select mem_id,mem_lv,
    CASE WHEN CHAR_LENGTH(mem_name) > 2 THEN 
        CONCAT(
            SUBSTRING(mem_name, 1, 1)
            ,LPAD('*', CHAR_LENGTH(mem_name) - 2, '*')
            ,SUBSTRING(mem_name, CHAR_LENGTH(mem_name), CHAR_LENGTH(mem_name))
        )
        ELSE CONCAT(
            SUBSTRING(mem_name, 1, 1)
            ,LPAD('*', CHAR_LENGTH(mem_name) - 1, '*')
        )
    END AS mem_name,
    replace(mem_phone,right(mem_phone,4),'****') as mem_phone,mem_email,mem_birth,
    if(mem_gender=1,"남","여") as mem_gender
    ,mem_city,mem_address,mem_point,mem_join,mem_sanc from member where mem_lv="Lv.${level}";`, (err, data) => {
       if (data==undefined) {
           res.send({"status": false});
       } else {
           res.send( {"status": true, "length": data.length,"data": data});
       }

   });
});

router.get('/viewSanc', (req, res) => {
    db.query(`select mem_id,mem_lv,
    CASE WHEN CHAR_LENGTH(mem_name) > 2 THEN 
        CONCAT(
            SUBSTRING(mem_name, 1, 1)
            ,LPAD('*', CHAR_LENGTH(mem_name) - 2, '*')
            ,SUBSTRING(mem_name, CHAR_LENGTH(mem_name), CHAR_LENGTH(mem_name))
        )
        ELSE CONCAT(
            SUBSTRING(mem_name, 1, 1)
            ,LPAD('*', CHAR_LENGTH(mem_name) - 1, '*')
        )
    END AS mem_name,
    replace(mem_phone,right(mem_phone,4),'****') as mem_phone,mem_email,mem_birth,
    if(mem_gender=1,"남",'여') as mem_gender
    ,mem_city,mem_address,mem_point,mem_join,
    if(mem_sanc=1,"제재",'') as mem_sanc from member where mem_sanc = 1;`, (err, data) => {
       if (data==undefined) {
           res.send({"status": false});
       } else {
           res.send( {"status": true, "length": data.length,"data": data});
       }
       
   });
});

router.get('/memSanc', (req, res) => {
    var mem_id = req.query.mem_id;

    db.query(`update member
                SET mem_sanc = CASE WHEN mem_sanc='1' THEN NULL ELSE 1 END
                where mem_id='${mem_id}';`, (err, data) => {
       if (data.changedRows<1) {
           res.send({"status": false});
       } else {
           res.send( {"status": true, "data": data});
       }
       
   });
});

module.exports = router;
