var express = require("express")
var router = express.Router()
var db = require("../app.js")
const url = require("url")

/* 카카오페이 결제에 성공한 경우*/
router.get("/", function (req, res) {
  const queryData = url.parse(req.url, true).query
  // console.log(queryData.pg_token)
  // console.log(queryData.item_name)
  // console.log(queryData.quantity)
  // console.log("success")
  const totalPrice = queryData.quantity * queryData.price
  const point = 
  console.log(totalPrice)
  db.query(
    `UPDATE member SET mem_point = mem_point + ${totalPrice}*0.05 where mem_id = '${queryData.mem_id}';`,
    async function (err, rows, fields) {
      if (err) throw err

      db.query(`SELECT mem_point from member where mem_id = ${queryData.mem_id};`, (err, rows, fields) =>
        res.send(fields)
      ),
        res.send(`${totalPrice * 0.05}만큼 포인트가 적립되었습니다.`)
      // await res.redirect("/movieHistory")
    }
  )
})

module.exports = router
