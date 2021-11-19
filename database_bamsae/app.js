const express = require('express');
const mysql = require('mysql');
const app = express();
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


// DB Connection 생성
const db = mysql.createConnection({
	connectionlimit: 100,
	host: db_host,
	user: db_user,
	password: db_password,
	database: db_database,
	port: db_port,
	multipleStatements: true
})


// DB 연동
db.connect(function(err) {
	if (err) throw (err);
	console.log("DB connected successful");
})

module.exports = db;


// ejs 설정
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


// 미들웨어
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: '1234',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}))
app.use(flash());
//app.use(expressValidator());
app.use('/node_modules', express.static(path.join(__dirname + '/node_modules')))


// Router 연결
var movieSearch = require('./router/movieSearch');
var store = require('./router/store');
var movie = require('./router/movie');
var theater = require('./router/theater')
var movieHistory = require('./router/movieHistory');
var point = require('./router/point');
var fastTicket = require('./router/fastTicket');
var memWish = require('./router/memWish');
var movieSchedule = require('./router/movieSchedule');
var kakaoPay = require('./router/kakaopay');
var paySuccess = require('./router/paySuccess');
var result = require('./router/result');

var movieSearch = require('./router/movieSearch.js');
var store = require('./router/store.js');
var movie = require('./router/movie.js');
var theater = require('./router/theater.js');
var memberView = require('./router/memberView.js');

var main = require('./router/main.js');
var memLogin = require('./router/memLogin.js');
var memJoin = require('./router/memJoin.js');
var memFind = require('./router/memFind.js');
var theaterManage = require('./router/theaterManage.js');
var theaterSales = require('./router/theaterSales.js');
var theaterPost = require('./router/theaterPost.js');
var theaterStock = require('./router/theaterStock.js');
var theaterEmp = require('./router/theaterEmp.js');
var theaterDil = require('./router/theaterEmpDil.js');
var theaterSalary = require('./router/theaterSalary.js');
var theaterSchedule = require('./router/theaterSchedule.js');

app.use('/movieSearch', movieSearch);
app.use('/store', store);
app.use('/movie', movie);
app.use('/theater',theater);
app.use('/movieHistory', movieHistory);
app.use('/point', point);
app.use('/fastTicket', fastTicket);
app.use('/memWish', memWish);
app.use('/movieSchedule',movieSchedule);
app.use('/kakaoPay',kakaoPay);
app.use('/paySuccess',paySuccess);
app.use('/result',result);
app.use('/memberView',memberView);
app.use('/', main);
app.use('/memLogin', memLogin);
app.use('/memJoin', memJoin);
app.use('/memFind', memFind);
app.use('/theater', theaterManage);
app.use('/theater/sales', theaterSales);
app.use('/theater/post', theaterPost);
app.use('/theater/stock', theaterStock);
app.use('/theater/emp', theaterEmp);
app.use('/theater/dil', theaterDil);
app.use('/theater/sal', theaterSalary);
app.use('/theater/sched', theaterSchedule)

app.get('/', (req, res) => {
	res.send('Hello World!')
})


// 실행
app.listen(port, () => console.log(`Server Started on port ${port}`))
module.exports = app;
