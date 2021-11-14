var express = require('express');
var router = express.Router();

/* 빠른 예매를 위한 검색 페이지*/
router.get('/',function(req,res){
    console.log(__dirname);
	res.render("fastTicketSearch");
})


module.exports = router;