var express = require("express")
var router = express.Router()
var db = require("../app.js")

/*수익 조회 통계 페이지  */
/** 영화 수익은 영화명과 영화 아이디를 통해서 조회 가능 */
/** 상품 수익은 상품명과 상품 아이디를 통해서 조회 가능 */

// 영화명 또는 영화 아이디를 통한 영화 수익 조회
router.get("/movie", function (req, res) {
  db.query(
    `select movie_title, sum(total_price) from movie natural join reservation natural join reservation_history where movie_title = ?;`,
    req.query.movie_title,
    function (err, rows) {
      if (err) throw err
      else res.send(rows)
    }
  )
})

// 상품명 또는 상품 아이디를 통한 상품 수익 조회
router.get("/product", function (req, res) {
  var reqQuery = req.query
  var selectData = [reqQuery.product_id, reqQuery.product_title]
  db.query(
    `select product_id, product_title, sum(payment_num) from order_history NATURAL JOIN product WHERE product_id = ? OR product_title = ?`,
    selectData,
    function (err, rows) {
      if (err) throw err
      else res.send(rows)
    }
  )
})

router.get("/movie/audience", function (req, res) {
  var reqQuery = req.query
  var selectData = [reqQuery.movie_id, reqQuery.movie_title]

  db.query(
    `select movie_id, movie_title, SUM(reservation_count) from reservation natural join schedule natural join movie where movie_id = ? OR movie_title = ? GROUP BY movie_id)`,
    selectData,
    function (err, rows) {
      if (err) throw err
      else res.send(rows)
    }
  )
})

router.get("/movie/star", function (req, res) {
  var reqQuery = req.query
  var selectData = [reqQuery.movie_id, reqQuery.movie_title]

  db.query(
    `select movie_id, movie_title, AVERAGE(review_star) from review NATURAL JOIN movie where movie_id = ? OR movie_ title = ? group by movie_id`,
    selectData,
    function (err, rows) {
      if (err) throw err
      else res.send(rows)
    }
  )
})

router.get("/movie/review", function (req, res) {
  var reqQuery = req.query
  var selectData = [reqQuery.movie_id, reqQuery.movie_title]

  db.query(
    `select movie_id, movie_title, revie_content from review NATURAL JOIN movie where movie_id = ? OR movie_ title = ?`,
    selectData,
    function (err, rows) {
      if (err) throw err
      else res.send(rows)
    }
  )
})

router.delete("/movie/review", function (req, res) {
  var reqQuery = req.query
  var selectData = [reqQuery.movie_id, reqQuery.movie_title]
  var sql = "DELETE FROM review where movie_id = ? OR movie_title = ?"
  db.query(sql, selectData, function (err, rows) {
    if (err) throw err
    else res.send("<script>alert('리뷰 및 별점 삭제가 완료되었습니다.'); </script>")
  })
})
module.exports = router
