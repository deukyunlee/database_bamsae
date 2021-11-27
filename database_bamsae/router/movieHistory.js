var express = require("express")
var router = express.Router()

// 3개월 전 영화 조회
router.get("/3months", (req, res) => {
  var reqQuery = req.query
  var selectData = [reqQuery.mem_id, reqQuery.mem_name]
  db.query(
    `SELECT movie_id, movie name from movie NATURAL JOIN schedule NATURAL JOIN reservation where emp_id = ? & screen_beg = DATE_ADD(CURDATE, INTERVAL '-3'MONTH);`,
    selectData,
    function (err, rows) {
      if (err) throw err
      else res.send(rows)
    }
  )
})

// 6개월 전 영화 조회
router.get("/6months", (req, res) => {
  var reqQuery = req.query
  var selectData = [reqQuery.mem_id, reqQuery.mem_name]
  db.query(
    `SELECT movie_id, movie name from movie NATURAL JOIN schedule NATURAL JOIN reservation where emp_id = ? & screen_beg = DATE_ADD(CURDATE, INTERVAL '-6'MONTH);`,
    selectData,
    function (err, rows) {
      if (err) throw err
      else res.send(rows)
    }
  )
})

// 1년 전 영화 조회
router.get("/1year", (req, res) => {
  var reqQuery = req.query
  var selectData = [reqQuery.mem_id, reqQuery.mem_name]
  db.query(
    `SELECT movie_id, movie name from movie NATURAL JOIN schedule NATURAL JOIN reservation where emp_id = ? & screen_beg = DATE_ADD(CURDATE, INTERVAL '12'MONTH);`,
    selectData,
    function (err, rows) {
      if (err) throw err
      else res.send(rows)
    }
  )
})

// 영화 타입이 비슷한 영화 추천
// router.get("/", (req, res) => {
//   var reqQuery = req.query
//   var selectData = [reqQuery.movie_type]
//   db.query(`SELECT `, selectData, function (err, rows) {
//     if (err) throw err
//     else res.send(rows)
//   })
// })
module.exports = router
