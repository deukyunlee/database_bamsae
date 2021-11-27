/*모두 테스트 완료 */
var express = require("express")
var router = express.Router()
var db = require("../app.js")

// 포인트 레벨 조회
router.get("/", function (req, res) {
  var reqQuery = req.query
  var selectData = [reqQuery.mem_id, reqQuery.mem_name]
  db.query(`select mem_name, mem_lv FROM member WHERE mem_id=? OR mem_name =?;`, selectData, function (err, rows) {
    if (err) throw err
    else res.send(rows)
  })
})

// 포인트 사용 내역 조회
router.get("/history", function (req, res) {
  var reqQuery = req.query
  var selectData = [reqQuery.mem_id, reqQuery.mem_name]
  db.query(
    `select mem_name, point_date, point_use, point_num FROM member natural join point WHERE mem_id=? OR mem_name =?;`,
    selectData,
    function (err, rows) {
      if (err) throw err
      else res.send(rows)
    }
  )
})
module.exports = router
