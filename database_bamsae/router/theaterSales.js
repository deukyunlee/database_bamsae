var express = require('express');
var router = express.Router();
var db = require('../app.js');
var moment = require('moment');


// 극장의 매출 정보 열람
router.get('/', function (req, res) {
    var emp_belong = req.query.emp_belong;
    var beg = req.query.beg;
    var end = req.query.end;
    console.log(emp_belong)
    db.query('SELECT *, SUM(sales_net) FROM sales WHERE theater_id=? AND sales_date BETWEEN ? AND ?', [emp_belong, beg, end], function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            rows[0].sales_date = moment(rows[0].sales_date).format('YYYY-MM-DD')
            res.send(rows);
        }
    })
})


// 극장의 매출 정보 등록
router.post('/', function (req, res) {
    var theater_id = req.query.emp_belong
    var sales_ticket = req.body.sales_ticket
    var sales_product = req.body.sales_product
    var sales_salary = req.body.sales_salary
    var sales_admin = req.body.sales_admin
    var sales_net = req.body.sales_net

    db.query('INSERT INTO sales VALUES(?, now(), ?, ?, ?, ?, ?);',
        [theater_id, sales_ticket, sales_product, sales_salary, sales_admin, sales_net], function (err, rows, fields) {
            if (err) {
                console.log(err);
            }
            else {
                res.send("<script>alert('금일 매출 정보가 등록되었습니다.');location.href='/theater/sales';</script>");
            }
        })
})


// 극장의 매출 정보 수정
router.put('/', function (req, res) {
    var theater_id = req.query.emp_belong
    var sales_date = req.body.sales_date
    var sales_ticket = req.body.sales_ticket
    var sales_product = req.body.sales_product
    var sales_salary = req.body.sales_salary
    var sales_admin = req.body.sales_admin
    var sales_net = req.body.sales_net

    db.query('UPDATE sales SET sales_ticket=?, sales_product=?, sales_salary=?, sales_admin=?, sales_net=? WHERE theater_id=? and sales_date=?',
        [sales_ticket, sales_product, sales_salary, sales_admin, sales_net, theater_id, sales_date], function (err, rows, fields) {
            if (err) {
                console.log(err);
            }
            else {
                res.send("<script>alert('매출 정보가 수정되었습니다.');location.href='/theater/sales';</script>");
            }
        })
})


// 극장의 매출 정보 삭제
router.delete('/', function (req, res) {
    var theater_id = req.query.emp_belong;
    var sales_date = req.body.sales_date;
    db.query('DELETE FROM sales WHERE theater_id=? and sales_date=?', [theater_id, sales_date], function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("<script>alert('삭제되었습니다.');location.href='/theater/sales';</script>");
        }
    })
})


module.exports = router;