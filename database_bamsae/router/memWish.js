var express = require('express');
var router = express.Router();

/* 찜 목록 조회(검색 기능)*/
router.get('/',function(req,res){
    console.log(__dirname);
	res.render("MemWishSearch");
})


module.exports = router;