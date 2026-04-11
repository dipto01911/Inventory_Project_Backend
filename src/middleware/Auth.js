const jwt=require('jsonwebtoken')
const { JWT_KEY } = require('../../config')

const Auth=(req,res,next)=>{
    let Token=req.headers['token']
     Token = Token.trim().replace(/^"|"$/g, '');
    // console.log(Token)
    jwt.verify(Token,JWT_KEY,(err,decoded)=>{
      //  console.log(decoded)
    if(err){
        res.status(401).json({status:'unauthorized'})
        //console.log(err.toString())
    }
    else{
       //console.log(decoded)
        let email=decoded['data']
        req.headers.email=email;
        next();
    }
    })
}

module.exports={Auth}