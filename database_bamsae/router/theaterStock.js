var express = require('express');
var router = express.Router();
var db = require('../app.js');


// 극장 재고 정보 불러오기
router.get('/', function (req, res) {
    var theater_id = req.query.emp_belong;
    db.query('SELECT stock.*, product.product_title, product.product_type, product.product_price FROM stock LEFT JOIN product on stock.product_id=product.product_id',
        [theater_id], function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(rows);
        }
    })
})


// 극장 재고 정보 등록하기
router.post('/', function (req, res) {
    var theater_id = req.query.emp_belong
    var product_title = req.body.product_title
    var stock_quantity = req.body.stock_quantity

    db.query('SELECT product_id FROM product WHERE product_title=?;', [product_title], function (err, rows, fields) {
        if (rows.length <= 0) {
            res.send("<script>alert('존재하지 않는 상품입니다.');location.href='/theater/stock';</script>");
         }
        else {
            var product_id = rows[0].product_id;

            db.query('INSERT INTO stock VALUES(?, ?, ?);', [theater_id, product_id, stock_quantity], function (err, rows, fields) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send("<script>alert('재고가 등록되었습니다.');location.href='/theater/stock';</script>");
                }
            })
        }
    })
})


// 극장 재고 정보 수정하기(수량)
router.put('/', function (req, res) {
    var theater_id = req.query.emp_belong
    var product_id = req.query.product_id
    var stock_quantity = req.body.stock_quantity

    db.query('UPDATE stock SET stock_quantity=? WHERE theater_id= ? AND product_id=?;',
        [stock_quantity, theater_id, product_id], function (err, rows, fields) {
            if (err) {
                console.log(err);
            }
            else {
                res.send("<script>alert('재고가 수정되었습니다.');location.href='/theater/stock';</script>");
            }
        })
})


// 극장 재고 정보 삭제하기
router.delete('/', function (req, res) {
    var theater_id = req.query.emp_belong
    var product_id = req.query.product_id
    db.query('DELETE FROM stock WHERE theater_id=? AND product_id=?', [theater_id, product_id], function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("<script>alert('삭제되었습니다.');location.href='/theater/stock';</script>");
        }
    })
})


module.exports = router;