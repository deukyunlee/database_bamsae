const express = require('express');
const app = express();
const router = express.Router();
const db = require('../app.js')

router.get('/', (req, res) => {
    res.render("platform");
});

router.get('/productRead', (req, res) => {
    db.query(`select product_id,product_title,product_price,product_img,product_content,if(product_type=1,"°ü¶÷±Ç",'½º³¼') as product_type from product;
     `, (err, data) => {
        if (data == undefined) {
            res.send({ "status": false });
        } else {
            res.send({ "status": true, "length": data.length, "data": data });
        }

    });
});

router.get('/productInsert', (req, res) => {
    const product_id = req.query.product_id;
    const product_title = req.query.product_title;
    const product_price = req.query.product_price;
    const product_content = req.query.product_content;
    const product_type = req.query.product_type;

    db.query(`INSERT INTO product VALUES (?,?,?,'img',?,?);`,
        [product_id, product_title, product_price, product_content, product_type], (err, data) => {
            if (data == undefined) {
                res.send({ "status": false });
            } else {
                res.send({ "status": true });
            }

        });
});
router.get('/productUpdate', (req, res) => {
    const product_id = req.query.product_id;
    const product_title = req.query.product_title;
    const product_price = req.query.product_price;
    const product_content = req.query.product_content;
    const product_type = req.query.product_type;

    console.log(product_title)
    console.log(product_price)
    console.log(product_content)
    db.query(`update product set product_title=?,product_price=?,product_content=?,product_type=? where product_id=?`,
        [product_title, product_price, product_content, product_type,product_id], (err, data) => {
            console.log(err)
            if (data == undefined) {
                res.send({ "status": false });
            } else {
                res.send({ "status": true });
            }

        });
});

router.get('/productDelete', (req, res) => {
    const product_id = req.query.product_id;

    db.query(`delete from product where product_id = ?;`, [product_id], (err, data) => {
        if (data == undefined) {
            res.send({ "status": false });
        } else {
            res.send({ "status": true });
        }

    });
});


//±ØÀå
router.get('/theaterSelect', (req, res) => {
    const loc = req.query.loc;
    const query = "%" + loc + "%";

    db.query(`select post_no,emp_id,theater_id,if(post_type!=1,'ÅëÇÕ','±ØÀå') as post_type,post_title,post_content,
    date_format(posted_date,'%Y-%m-%d') as posted_date,date_format(modified_date,'%Y-%m-%d') as modified_date 
    from notice_board where post_type = 2 and theater_id LIKE ?`, [query], (err, data) => {
        if (data == undefined) {
            res.send({ "status": false });
        } else {
            res.send({ "status": true, "length": data.length, "data": data });
        }

    });
});
module.exports = router;
