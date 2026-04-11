
const jwt=require('jsonwebtoken')
const {JWT_KEY}=require('../../config')
const CreateToken=async(data)=>{
    let payload={exp:Math.floor(Date.now()/1000)+(24*60*60),data:data}
    return await jwt.sign(payload,JWT_KEY)
}

module.exports={CreateToken}