var express = require("express")
var request = require("request")
var httpBuildQuery = require("http-build-query")
var router = express.Router()
const path = require("path")
var db = require("../app.js")
const url = require("url")
const { query } = require("express")
const adminKey = "e28e7f1cbe7c53635ac1286c3358ee89"

router.get("/", function (req, res) {
  const queryData = url.parse(req.url, true).query
  console.log(queryData.item_name)

  const order_id = queryData.order_id
  const mem_id = queryData.mem_id
  const item_name = queryData.item_name
  const quantity = queryData.quantity
  const price = queryData.price
  let _url = "https://kapi.kakao.com/v1/payment/ready"

  let _headers = {
    Authorization: "KakaoAK " + adminKey,
    "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
  }
  // url 예시 : http://localhost:3000/kakaopay?order_id=2&mem_id=abc&item_name=popcorn&quantity=2&price=2000
  let _form = httpBuildQuery({
    cid: "TC0ONETIME",
    // partner_order_id: queryData.order_id,
    // partner_user_id: queryData.mem_id,
    // item_name: queryData.item_name,
    // quantity: queryData.quantity,
    // total_amount: queryData.item_price * queryData.quantity,
    // vat_amount: queryData.item_price * queryData.quantity,
    partner_order_id: order_id,
    partner_user_id: mem_id,
    item_name: item_name,
    quantity: quantity,
    total_amount: quantity * price,
    vat_amount: (quantity * price) / 10,
    tax_free_amount: "0",
    approval_url: `http://localhost:3000/paySuccess?order_id=${order_id}&mem_id=${mem_id}&item_name=${item_name}&quantity=${quantity}&price=${price}`, // localhost에 https 적용할 때 까지 임시로 사용
    fail_url: `http://localhost:3000/payFail?order_id=${order_id}&mem_id=${mem_id}&item_name=${item_name}&quantity=${quantity}&price=${price}`,
    cancel_url: "https://developers.kakao.com",
  })

  let options = {
    url: _url,
    method: "POST",
    headers: _headers,
    form: _form,
  }
  request(options, (error, response) => {
    if (error) {
      console.log(error)
    } else {
      var res_json = JSON.parse(response.body)
      res.redirect(res_json.next_redirect_pc_url) //에러가 없으면 결제 창으로 redirection
    }

    return
  })
})
module.exports = router
