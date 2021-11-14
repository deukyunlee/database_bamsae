var express = require('express');
var router = express.Router();

/* 관람한 영화 조회를 위한 검색 페이지*/
router.get('/',function(req,res){
    console.log(__dirname);
	res.render("MovieHistorySearch");
})


module.exports = router;