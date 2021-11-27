var express = require("express")
var router = express.Router()
var db = require("../app.js")

/* 모두 테스트 완료했고 동작하지만, update의 경우 db에 해당하는 id가 없더라도 업데이트가 됐다고 나옴 -> 수정필요*/
/** update와 delete를 위한 dil_id column 추가  */
/** ALTER TABLE diligence ADD dil_id INT PRIMARY_KEY AUTO_INCREMENT FIRST; */

// id or 이름 or 부서명을 통한 근태 정보 조회
router.get("/", function (req, res) {
  var reqQuery = req.query
  var selectData = [reqQuery.emp_id, reqQuery.emp_name, reqQuery.emp_dept]
  db.query(
    `SELECT emp_id, emp_name, dil_worktime, dil_leavetime, dil_schedule from diligence NATURAL JOIN employee WHERE emp_id = ? OR emp_name =? OR emp_dept = ?;`,
    selectData,
    function (err, rows) {
      if (err) throw err
      else res.send(rows)
    }
  )
})

// 회사 사원에 대한 근태정보 추가
router.post("/", function (req, res) {
  var reqBody = req.body
  var insertData = [reqBody.dil_id, reqBody.emp_id, reqBody.dil_worktime, reqBody.dil_leavetime, reqBody.dil_schedule]

  var sql = `INSERT INTO diligence VALUES (?)`
  db.query(sql, [insertData], function (err, rows) {
    if (err) throw err
    else res.send("<script>alert('회사 사원에 대한 근태 정보 등록이 완료되었습니다.'); </script>")
  })
})

// 회사 사원에 대한 근태 정보 업데이트
router.put("/", function (req, res) {
  var reqBody = req.body
  var updateData = [reqBody.dil_worktime, reqBody.dil_leavetime, reqBody.dil_schedule, reqBody.emp_id, reqBody.dil_id]
  var sql = `UPDATE diligence SET dil_worktime =?, dil_leavetime=?, dil_schedule=? WHERE emp_id = ? AND dil_id = ?`
  db.query(sql, updateData, function (err, rows) {
    if (err) throw err
    if (rows.length < 0) res.send("no such data")
    else res.send("<script>alert('회사 사원에 대한 정보 업데이트가 완료되었습니다.'); </script>")
  })
})

// 회사 사원에 대한 근태 정보 삭제
router.delete("/", function (req, res) {
  var sql = "DELETE FROM diligence WHERE emp_id = ? AND dil_id = ?"
  db.query(sql, [req.query.emp_id], function (err, rows) {
    if (err) throw err
    else res.send("<script>alert('회사 사원에 대한 근태 정보 삭제가 완료되었습니다.'); </script>")
  })
})

module.exports = router
