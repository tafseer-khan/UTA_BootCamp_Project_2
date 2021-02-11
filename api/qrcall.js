getQR = () =>{
    var unirest = require("unirest");

    var req = unirest("GET", "https://codzz-qr-cods.p.rapidapi.com/getQrcode");
    
    req.query({
        "type": "url",
        "value": "https://www.google.com"
    });
    
    req.headers({
        "x-rapidapi-key": "16f6042a71mshd7819557aed7c23p19670cjsn3b86dc1f29bc",
        "x-rapidapi-host": "codzz-qr-cods.p.rapidapi.com",
        "useQueryString": true
    });
    
    
    req.end(function (res) {
        if (res.error) throw new Error(res.error);
    
        console.log(res.body);
    });
}