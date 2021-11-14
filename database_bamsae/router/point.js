var express = require('express');
var router = express.Router();

/* 유저 포인트 및 멤버십 레벨 조회를 위한 검색 페이지*/
router.get('/',function(req,res){
    console.log(__dirname);
	res.render("pointSearch");
})

module.exports = router;