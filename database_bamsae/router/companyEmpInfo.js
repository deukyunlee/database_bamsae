var express = require("express")
var router = express.Router()
var db = require("../app.js")

/* 모두 테스트 완료했고 동작하지만, update의 경우 db에 해당하는 id가 없더라도 업데이트가 됐다고 나옴 -> 수정필요*/

// 회사 사원에 대한 정보 조회 (이름과 휴대폰 번호는 마스킹 처리)
router.get("/", function (req, res) {
  db.query(
    `SELECT emp_id, CASE WHEN CHAR_LENGTH(emp_name) > 2 THEN CONCAT(SUBSTRING(emp_name, 1, 1),LPAD('*', CHAR_LENGTH(emp_name) - 2, '*'),SUBSTRING(emp_name, CHAR_LENGTH(emp_name), CHAR_LENGTH(emp_name))) ELSE CONCAT( SUBSTRING(emp_name, 1, 1),LPAD('*', CHAR_LENGTH(emp_name) -1, '*')) END AS emp_name, REPLACE(emp_phone,right(emp_phone, 4),'****') AS emp_phone, if(emp_gender=1, '남','여') as emp_gender, date_format(emp_birth, '%Y-%m-%d') as emp_birth, emp_dept, emp_rank, emp_type, emp_email, if(is_resignated=0,'재직자','퇴사자') AS emp_resignated, date_format(emp_join, '%Y-%m-%d') as emp_join, emp_password FROM employee;`,
    function (err, rows) {
      if (err) throw err
      else res.send(rows)
    }
  )
})

// 회사 사원에 대한 정보 추가
router.post("/", function (req, res) {
  var reqBody = req.body
  var insertData = [
    reqBody.emp_id,
    reqBody.emp_name,
    reqBody.emp_phone,
    reqBody.emp_gender,
    reqBody.emp_birth,
    reqBody.emp_dept,
    reqBody.emp_rank,
    reqBody.emp_type,
    reqBody.emp_email,
    reqBody.is_resignated,
    reqBody.emp_join,
    reqBody.emp_password,
  ]

  var sql = `INSERT INTO employee(emp_id, emp_name, emp_phone, emp_gender, emp_birth, emp_dept, emp_rank, emp_type, emp_email, is_resignated, emp_join, emp_password) VALUES (?)`
  db.query(sql, [insertData], function (err, rows) {
    if (err) throw err
    else res.send("<script>alert('회사 사원에 대한 정보 등록이 완료되었습니다.'); </script>")
  })
})

// 회사 사원에 대한 정보 업데이트
router.put("/", function (req, res) {
  var reqBody = req.body
  var updateData = [
    reqBody.emp_name,
    reqBody.emp_phone,
    reqBody.emp_gender,
    reqBody.emp_birth,
    reqBody.emp_dept,
    reqBody.emp_rank,
    reqBody.emp_type,
    reqBody.emp_email,
    reqBody.is_Resignated,
    reqBody.emp_join,
    reqBody.emp_password,
    reqBody.emp_id,
  ]
  var sql = `UPDATE employee SET emp_name = ?, emp_phone = ?, emp_gender = ?, emp_birth =?, emp_dept =?, emp_rank =?, emp_type =?, emp_email =?, is_resignated =?, emp_join =?, emp_password =? WHERE emp_id = ?`
  db.query(sql, updateData, function (err, rows) {
    if (err) throw err
    if (rows.length < 0) res.send("no such data")
    else res.send("<script>alert('회사 사원에 대한 정보 업데이트가 완료되었습니다.'); </script>")
  })
})

// 회사 사원에 대한 정보 삭제
router.delete("/", function (req, res) {
  var sql = "DELETE FROM employee WHERE emp_id = ?"
  db.query(sql, [req.query.emp_id], function (err, rows) {
    if (err) throw err
    else res.send("<script>alert('회사 사원에 대한 정보 삭제가 완료되었습니다.'); </script>")
  })
})

module.exports = router
