var express = require("express")
var router = express.Router()
var db = require("../app.js")

/* 모두 테스트 완료했고 동작하지만, update의 경우 db에 해당하는 id가 없더라도 업데이트가 됐다고 나옴 -> 수정필요*/

// 회사 사원 급여내역 및 예정 지급일 조회(이름으로 조회) - test complete
router.get("/", function (req, res) {
  var reqQuery = req.query
  var selectData = reqQuery.emp_name
  db.query(
    `SELECT emp_id, emp_name, emp_dept, sal_basic, sal_bonus, sal_monthly, sal_date, if(is_paid=1, '지급완료','미지급') as is_paid FROM salary NATURAL JOIN employee WHERE emp_name = ?;`,
    selectData,
    function (err, rows) {
      if (err) throw err
      else res.send(rows)
    }
  )
})

// 회사 사원 급여내역 및 예정 지급일 조회(이름+날짜별 조회) - test complete
router.get("/date", function (req, res) {
  var reqQuery = req.query
  var selectData = [reqQuery.emp_name, reqQuery.startDate, reqQuery.endDate]
  db.query(
    `SELECT emp_id, emp_name, emp_dept, sal_basic, sal_bonus, sal_monthly, sal_date, if(is_paid=1, '지급완료','미지급') as is_paid FROM salary NATURAL JOIN employee WHERE emp_name = ? AND sal_date BETWEEN ? AND ?;`,
    selectData,
    function (err, rows) {
      if (err) throw err
      else res.send(rows)
    }
  )
})

// 회사 사원 급여내역 및 예정 지급일 조회(부서별 조회) - test complete
router.get("/dept", function (req, res) {
  var reqQuery = req.query
  var selectData = reqQuery.emp_dept
  db.query(
    `SELECT emp_id, emp_name, emp_dept, sal_basic, sal_bonus, sal_monthly, sal_date, if(is_paid=1, '지급완료','미지급') as is_paid FROM salary NATURAL JOIN employee WHERE emp_dept = ?;`,
    selectData,
    function (err, rows) {
      if (err) throw err
      else res.send(rows)
    }
  )
})

// 회사 사원 급여내역 및 예정 지급일 조회(부서+날짜별 조회) - test complete
router.get("/dept/date", function (req, res) {
  var reqQuery = req.query
  var selectData = [reqQuery.emp_dept, reqQuery.startDate, reqQuery.endDate]
  db.query(
    `SELECT emp_id, emp_name, emp_dept, sal_basic, sal_bonus, sal_monthly, sal_date, if(is_paid=1, '지급완료','미지급') as is_paid FROM salary NATURAL JOIN employee WHERE emp_dept = ? AND sal_date BETWEEN ? AND ?;`,
    selectData,
    function (err, rows) {
      if (err) throw err
      else res.send(rows)
    }
  )
})

// 회사 사원 급여내역 및 예정 지급일 입력 - test complete
router.post("/", function (req, res) {
  var reqBody = req.body
  var insertData = [
    reqBody.emp_id,
    reqBody.sal_basic,
    reqBody.sal_bonus,
    reqBody.sal_monthly,
    reqBody.sal_date,
    reqBody.is_paid,
  ]

  var sql = `INSERT INTO salary VALUES (?)`
  db.query(sql, [insertData], function (err, rows) {
    if (err) throw err
    else res.send("<script>alert('회사 사원 급여에 대한 정보 등록이 완료되었습니다.'); </script>")
  })
})

// 회사 사원 급여내역 및 예정 지급일 업데이트 - test complete
router.put("/", function (req, res) {
  var reqBody = req.body
  var updateData = [
    reqBody.sal_basic,
    reqBody.sal_bonus,
    reqBody.sal_monthly,
    reqBody.is_paid,
    reqBody.emp_id,
    reqBody.sal_date,
  ]

  var sql = `UPDATE salary SET sal_basic = ?, sal_bonus = ?, sal_monthly =?, is_paid =? WHERE emp_id = ? AND sal_date =?`
  db.query(sql, updateData, function (err, rows) {
    if (err) throw err
    if (rows.length < 0) res.send("no such data")
    else res.send("<script>alert('회사 사원 급여에 대한 정보 업데이트가 완료되었습니다.'); </script>")
  })
})

// 회사 사원에 대한 정보 삭제 - test complete
router.delete("/", function (req, res) {
  var reqQuery = req.query
  var deleteData = [reqQuery.emp_id, reqQuery.sal_date]

  var sql = "DELETE FROM salary WHERE emp_id = ? AND sal_date=?"
  db.query(sql, deleteData, function (err, rows) {
    if (err) throw err
    else res.send("<script>alert('회사 사원에 급여에 대한 정보 삭제가 완료되었습니다.');</script>")
  })
})

module.exports = router
