var express = require("express")
var router = express.Router()
var db = require("../app.js")
const url = require("url")

// 결제 실패 금액
router.get("/", function (req, res) {
  const queryData = url.parse(req.url, true).query
  var reqQuery = req.query

  res.send(reqQuery.price)
})

router.delete("/", function (req, res) {
  const queryData = url.parse(req.url, true).query

  var sql = `DELETE FROM reservation where reservation_num = ${queryData.order_id}`
  db.query(sql, function (err, rows) {
    if (err) throw err
    else res.send("<script>alert('예매가 취소되었습니다.);</script>")
  })
  res.send(reqQuery.price)
})
module.exports = router
