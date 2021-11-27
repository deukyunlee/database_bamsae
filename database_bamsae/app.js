const express = require("express")
const mysql = require("mysql")
const app = express()
const path = require("path") //-> const로
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const expressValidator = require("express-validator")
const flash = require("express-flash")
const session = require("express-session")
const bodyParser = require("body-parser")

// .env에서 db 서버 credential 가져오기
require("dotenv").config()

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
  multipleStatements: true,
})

// DB 연동
db.connect(function (err) {
  if (err) throw err
  console.log("DB connected successful")
})

module.exports = db

// ejs 설정
app.set("views", path.join(__dirname, "./views"))
app.set("view engine", "ejs")

// 미들웨어
app.use(logger("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
app.use(
  session({
    secret: "1234",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
)
app.use(flash())
//app.use(expressValidator());
app.use("/node_modules", express.static(path.join(__dirname + "/node_modules")))

// Router 연결

const memLogin = require("./router/memLogin")
const movieSearch = require("./router/movieSearch")
const store = require("./router/store")
const movie = require("./router/movie")
const theater = require("./router/theater")
const movieHistory = require("./router/movieHistory")
const fastTicket = require("./router/fastTicket")
const memberWish = require("./router/memberWish")
const movieSchedule = require("./router/movieSchedule")
const kakaoPay = require("./router/kakaopay")
const paySuccess = require("./router/paySuccess")
const payFail = require("./router/payFail")
const result = require("./router/result")
const companyEmpInfo = require("./router/companyEmpInfo")
const companyEmpSalary = require("./router/companyEmpSalary")
const companyEmpDil = require("./router/companyEmpDil")
const companyIncome = require("./router/companyIncome")
const companyStastics = require("./router/companyStastics")
const movieReservation = require("./router/movieReservation")
const memberPoint = require("./router/memberPoint")


app.use('/memberView',memberView);
app.use('/question',question); 
app.use('/platform',platform); 
app.use('/memReview',memReview); 
app.use('/memService',memService); 
app.use("/memLogin", memLogin)


// app.use('/memJoin', memJoin);
app.use("/movieSearch", movieSearch)
app.use("/store", store)
app.use("/movie", movie)
app.use("/theater", theater)
app.use("/movieHistory", movieHistory)
//app.use("/point", point)
app.use("/fastTicket", fastTicket)
//app.use("/memWish", memWish)
app.use("/memberWish", memberWish)
app.use("/movieSchedule", movieSchedule)
app.use("/kakaoPay", kakaoPay)
app.use("/paySuccess", paySuccess)
app.use("/payFail", payFail)
app.use("/result", result)
app.use("/emp/info", companyEmpInfo)
app.use("/emp/salary", companyEmpSalary)
app.use("/emp/diligence", companyEmpDil)
app.use("/company/income", companyIncome)
app.use("/company/stastics", companyStastics)
app.use("/reservation", movieReservation)
app.use("/mem/point", memberPoint)


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
app.get("/", (req, res) => {
  res.send("Hello World!")
>>>>>>> duke
})


// 실행
app.listen(port, () => console.log(`Server Started on port ${port}`))
module.exports = app
