
const { CreateToken } = require("../utility/CreateToken");
const { EmailSend } = require("../utility/SendEmailUtility");
const {UserModel}=require('../model/UserModel')
const {OTPModel}=require('../model/OTPModel')


const CreateService=async(req)=>{
    try{
   let reqBody=req.body;
   let data=await UserModel.create(reqBody)
   return {status:"success",data:data}
    }catch(err){
        return {status:"fail",data:err.toString()}
    }
}


const DetailService=async(req,res)=>{
    try{
   let email=req.headers['email'];
   let data=await UserModel.aggregate([{$match:{email:email}}])
   return {status:"success",data:data}
    }catch(err){
        return {status:"fail",data:err.toString()}
    }
}



const LoginService=async(req)=>{
    try{
        let reqBody=req.body;
   let data=await UserModel.aggregate([{$match:reqBody},{$project:{_id:0,email:1,firstName:1,lastName:1,mobile:1,photo:1}}])
    if(data.length>0){
        let token=await CreateToken(data[0]['email'])
        return {status:'success',token:token,data:data[0]}
    } 
    else{
        return {status:"unauthorized"}
    }
}catch(err){
        return{status:"fail",data:err.toString()}
    }
}



const UpdateService=async(req)=>{
    try{
    let email=req.headers['email']
let data=await UserModel.updateOne({email:email},req.body)
return {status:"success",data:data}
    }catch(err){
        return{status:"fail",data:err.toString()}
    }
}


const VerifyEmailService=async(req)=>{
    try{
 let email=req.params.email;
 let OTPCode=Math.floor(10000+Math.random()*90000)
 let userCount=await UserModel.aggregate([{$match:{email:email}},{$count:"total"}])
 if(userCount.length>0){
    await OTPModel.create({email:email,otp:OTPCode})
    let SendEmail=await EmailSend(email,OTPCode,'PIN Verified')
    return {status:"success",data:SendEmail}
 }else{
    return {status:'fail',data:'No user Found'}
 }
    }catch(err){
    return {status:fail,data:err.toString()}
    }
}


const VerifyOtpService=async(req)=>{
    try{
 let email=req.params.email;
 let OTPCode=req.params.otp;

 let status=0;
 let statusUpdate=1;
 let OTPCount=await OTPModel.aggregate([{$match:{email:email,otp:OTPCode,status:status}},{$count:"total"}])
 if(OTPCount.length>0){
    let OTPUpdate=await OTPModel.updateOne({email:email,otp:OTPCode,status:status},{email:email,otp:OTPCode,status:statusUpdate})
    return {status:'success',data:OTPUpdate} 
}   
else{
    return {status:'fail',data:'Invalid OTP Code'}
}
}catch(err){
        return{status:'fail','data':err.toString()}
    }
}


const ResetPasswordService=async(req)=>{
let email=req.body['email'];
let OTPCode=req.body['OTP'];
let NewPass=req.body['password'];
let statusUpdate=1;
try{
let OTPUsedCount=await OTPModel.aggregate([{$match:{email:email,otp:OTPCode,status:statusUpdate}},{$count:"total"}])
if(OTPUsedCount.length>0){
    let PassUpdate=await UserModel.updateOne({email:email},{password:NewPass})
 return {status:"success",data:PassUpdate}
}
else{
    return {status:'fail',data:"Invalid Request"}
}
}catch(err){
    return{status:fail,data:err.toString()}
}

}


module.exports={CreateService,DetailService,LoginService,UpdateService,VerifyEmailService,VerifyOtpService, ResetPasswordService}