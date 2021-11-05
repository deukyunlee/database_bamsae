const express = require('express');
const mysql = require('mysql');
const app = express();
const httpPort = 8080;
const route = require('./router/route.js');
/* create connection with mysql */
const connection = mysql.createConnection({  
    host     : 'localhost',
    user     : 'root',
    password : '111111',
    database : 'products',
    //multipleStatements: true // for multiple queries
  });


app.get('/',function(req,res){
    var sql = "SELECT product_id, product_name FROM product";
    connection.connect();
    connection.query(sql,function(err,rows){
        if (err) throw error;
        res.send(rows);
        //res.render('list.jade', result);
      });
});

app.get('/id',function(req,res){
    var sql = "SELECT product_id FROM product";
    connection.query(sql,function(err,result){
        if (err) throw err;
        res.send(result);
        console.log(res);
      });
});


app.put('/id',function(req,res){
  var id = req.query.id;
  var name = req.query.name;
  var sql = `INSERT INTO product VALUES(${id},${name})`;
  connection.query(sql,function(err,result){
      if (err) throw err;
      res.send(result);
      console.log(res);
    });
});

app.use('/',route);

app.listen(httpPort, function(){
    console.log('running');
})