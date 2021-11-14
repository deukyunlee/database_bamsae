var express = require('express');
var router = express.Router();

/* 영화 상영 일정 조회를 위한 검색 페이지*/
router.get('/',function(req,res){
    console.log(__dirname);
	res.render("movieScheduleSearch");
})


module.exports = router;