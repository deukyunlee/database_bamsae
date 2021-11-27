var express = require("express")
var router = express.Router()
var db = require("../app.js")

// 결제정보 조회
router.get("/", function (req, res) {
  var reqQuery = req.query
  var selectData = [reqQuery.mem_id, reqQuery.mem_name]
  db.query(
    `SELECT reservation_num, pay_method FROM reservation natural join member where mem_id =? OR mem_name =?`,
    selectData,
    function (err, rows) {
      if (err) throw err
      else res.send(rows)
    }
  )
})

// 예매내역 조회 : 제목, 시간, 지점
router.get("/history", (req, res) => {
  var reqQuery = req.query
  var selectData = [reqQuery.mem_id, reqQuery.mem_name]
  db.query(
    `select movie_title, screen_beg, screen_fin, theater_name from schedule natural join movie natural join theater natural join member where mem_id =? OR mem_name = ?`,
    selectData,
    function (err, rows) {
      if (err) throw err
      else res.send(rows)
    }
  )
})
module.exports = router
