var express = require('express');
var request = require('request');
var httpBuildQuery = require('http-build-query') ;
const http = require('http');

const adminKey = 'e28e7f1cbe7c53635ac1286c3358ee89';
const app = express();
var httpPort = 3000;

app.get('/', function (req, res){

    let _url = 'https://kapi.kakao.com/v1/payment/ready';

    let _headers = {
        "Authorization": 'KakaoAK '+ adminKey,
        "Content-type": 'application/x-www-form-urlencoded;charset=utf-8'
    }

    let _form = httpBuildQuery({
        'cid': 'TC0ONETIME',
        'partner_order_id': 'partner_order_id',
        'partner_user_id': 'partner_user_id',
        'item_name': '팝콘',
        'quantity': '1',
        'total_amount': '2000',
        'vat_amount': '200',
        'tax_free_amount': '0',
        'approval_url': 'https://developers.kakao.com', // localhost에 https 적용할 때 까지 임시로 사용
        'fail_url': 'https://developers.kakao.com',
        'cancel_url': 'https://developers.kakao.com'
    });
    
    let options = {
        url: _url,
        method: 'POST',
        headers: _headers,
        form: _form
    };

    request(options, (error, response) => {
        if (error) {
            console.log(error);
        }

        else {
            var res_json = JSON.parse(response.body);
            //console.log(res_json);
            res.redirect(res_json.next_redirect_pc_url); //에러가 없으면 결제 창으로 redirection
        }

        //console.log("done");
        return;
    });
});

// app.get('/success', function(req,res){
//     var query = req.query.pg_token
//     res.send('here2');
// })


app.listen(httpPort, function(){
    console.log('running');
});

