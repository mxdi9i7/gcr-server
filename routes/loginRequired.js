var jwt = require('jsonwebtoken');


module.exports.check_token=function(req,res,next){
    var token = req.body.token || req.headers["token"]; // 从body或query或者header中获取token
    if (token ) {
        jwt.verify(token, 'nihao', function (err, decode) {
            if (err || decoded === undefined) {
                res.status(401).json({
                    message: "Invaild Token"
                })
            }  else {
                        res.decode = decode; 
                        console.log(decode);   // today  is  a  good  day
                        next();
                    }
        })
    } else {
        return  res.send('No token')
    }

    
};