const express= require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({  
    host     : 'localhost',
    user     : 'root',
    password : '111111',
    database : 'products',
    //multipleStatements: true // for multiple queries
  });

router.get('/',function(req,res){
    var sql = "SELECT product_id, product_name FROM product";
    connection.query(sql,function(err,rows){
        if (err) throw error;
        res.send(rows);
        //res.render('list.jade', result);
      });
});

router.get('/id',function(req,res){
    var sql = "SELECT product_id FROM product";
    connection.query(sql,function(err,result){
        if (err) throw err;
        res.send(result);
        console.log(res);
      });
});

module.exports = router;