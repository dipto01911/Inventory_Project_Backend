const {CreateService,DetailService,LoginService,
    UpdateService,VerifyEmailService,VerifyOtpService, 
    ResetPasswordService}=require('../service/userService')

    const Registration=async(req,res)=>{
        let result=await CreateService(req);
        return res.status(200).json(result)
    }

    const Login=async(req,res)=>{
        let result =await LoginService(req);
        return res.status(200).json(result)
    }

    const ProfileUpdate=async(req,res)=>{
        let result=await UpdateService(req);
        return res.status(200).json(result)
    }

    const ProfileDetails=async(req,res)=>{
        let result=await DetailService(req);
        return res.status(200).json(result)
    }

    const RecoverVerifyEmail=async(req,res)=>{
        let result = await VerifyEmailService(req);
        return res.status(200).json(result)
    }

    const RecoverVerifyOTP=async(req,res)=>{
        let result=await VerifyOtpService(req);
        return res.status(200).json(result)
    }

    const RecoverResetPass=async(req,res)=>{
        let result=await ResetPasswordService(req);
        return res.status(200).json(result)
    }

    module.exports={Registration,Login,ProfileUpdate,
ProfileDetails,RecoverVerifyEmail,RecoverVerifyOTP,RecoverResetPass
    }