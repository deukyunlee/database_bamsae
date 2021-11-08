const express = require('express');
const mysql = require('mysql');
const app = express();
const createError = require('http-errors');
const path = require('path'); //-> const로
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressValidator = require('express-validator');
const flash = require('express-flash');
const session = require('express-session');
const bodyParser = require('body-parser');


// .env에서 db 서버 credential 가져오기
require('dotenv').config()

const db_host = process.env.db_host
const db_user = process.env.db_user
const db_password = process.env.db_password
const db_database = process.env.db_database
const db_port = process.env.db_port
const port = process.env.PORT


// DB pool 생성
const db = mysql.createPool({
	connectionlimit: 100,
	host: db_host,
	user: db_user,
	password: db_password,
	database: db_database,
	port: db_port
})


// DB 연결
db.getConnection((err, connection) => {
	if (err) throw (err)
	console.log("DB connected successful")
})


// esj 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); 


// 에러 핸들러
app.use(function (req, res, next) {
	next(createError(404));
});

app.use(function (err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// 에러 페이지 출력
	res.status(err.status || 500);
	res.render('error');
});


// 라우터 연결
app.get('/', (req, res) => {
	res.send('Hello World!')
})

//var memLogin = require('./router/memLogin.js');
//var memJoin = require('./router/memJoin.js');

//app.use('/memLogin', memLogin);
//app.use('/memJoin', memJoin);

//app.get('/', (req, res) => {
//	res.send('Hello World!')
//})



// 실행
app.listen(port, () => console.log(`Server Started on port ${port}`))
module.exports = app;
