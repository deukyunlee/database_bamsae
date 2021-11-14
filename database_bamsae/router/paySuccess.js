var express = require('express');
var router = express.Router();
var db = require('../app.js');

/* 카카오페이 결제에 성공한 경우*/
router.get('/',function(req,res){
    db.query(`insert into reservation_history values(2, 'abc',2,timestamp(NOW()), 8000);`, async function(err,rows,fields){
      await res.redirect('/movieHistory');
    })
})

module.exports = router;