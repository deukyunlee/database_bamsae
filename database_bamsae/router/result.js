/* 조회한 결과를 보여주는 API */

var express = require('express');
var router = express.Router();
var db = require('../app.js');


router.post('/fastTicket', function(req,res){

	db.query(`select movie_title, audit_id, screen_beg, movie_age from schedule natural join movie where movie_title = ?;`,req.body.title,function(err,rows){
        if(rows.length<=0){
            throw err;
        }
        else{
            res.render("result",{
                title: '빠른 예매 조회',
                dbQuery: rows
            })
        }
    })
})

router.post('/memWish', function(req,res){

    db.query(`select mem_id, movie_title from movie natural join wish where mem_id = ?;`, req.body.id, function(err,rows){
        if(rows.length<=0){
            throw err;
        }
        else{
            res.render("result",{
                title: '찜 목록',
                dbQuery: rows
            })
        }
    })
})

router.post('/movieHistory', function(req,res){

    db.query('select movie_title, viewing_date, seat_num,total_price, payment_date from reservation_history natural join movie natural join reservation where mem_id=?;',req.body.id,function(err,rows){
        
        if(rows.length<=0){
            throw err;
        }
        else{
            res.render("result",{
                title: '예매내역 상세 조회',
                dbQuery: rows
            })
        }
    })
})

router.post('/movieSchedule', function(req,res){

	db.query(`select movie_title, screen_beg, theater_id, audit_id from movie natural join schedule natural join auditorium where movie_title = ? and cast(screen_beg as date) = ?;`,[req.body.title, req.body.date],function(err,rows){
        
        if(rows.length<=0){
            throw err;
        }
        else{
            res.render("result",{
                title: '극장, 날짜에 따른 상영 정보',
                dbQuery: rows
            })
        }
    })
})

router.post('/point', function(req,res){


    db.query(`select point_id,mem_id,point_type,point_use,point_num,mem_lv,mem_point from 
    point natural join member
    where mem_id=?;`, req.body.id , function(err,rows){
        
        if(rows.length<=0){
            throw err;
        }
        else{
            res.render("result",{
                title: '멤버십',
                dbQuery: rows
            })
        }
    })
})

module.exports = router;