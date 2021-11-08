const express = require('express');
const app = express();
const router = express.Router();

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'dbwls0924@',
  database : 'database'
});
 
connection.connect();

//주석
router.get('/', async (req, res) => {
    const movie_title = req.query.movie_title;
    const query = '%'+movie_title+'%';
    //주석..이야...
    await connection.query('SELECT * FROM MOVIE WHERE movie_title LIKE ?',[query], (err, data) => {
        console.log(data);
        console.log(query);
        res.json(data)
    });
});

module.exports = router;
