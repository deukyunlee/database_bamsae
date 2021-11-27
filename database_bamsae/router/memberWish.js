/*모두 테스트 완료 */
var express = require("express")
var router = express.Router()
var db = require("../app.js")

// 찜 목록 조회
router.get("/", function (req, res) {
  var reqQuery = req.query
  var selectData = [reqQuery.mem_id, reqQuery.mem_name]
  db.query(
    `select mem_name, movie_title from member natural join wish natural join movie WHERE mem_id=? OR mem_name = ?;`,
    selectData,
    function (err, rows) {
      if (err) throw err
      else res.send(rows)
    }
  )
})

//찜 목록 삭제
router.delete("/", function (req, res) {
  var reqQuery = req.query
  var selectData = [reqQuery.mem_id, reqQuery.movie_id]
  db.query(`DELETE from wish where mem_id=? AND movie_id =?`, selectData, function (err, rows) {
    if (err) throw err
    else res.send("<script>alert('찜 목록 삭제가 완료되었습니다.'); </script>")
  })
})
module.exports = router
