const {ExpenseModel}=require('../model/ExpenseModel');
const { PurchaseProductModel } = require('../model/PurchaseProductModel');
const { ReturnProductModel } = require('../model/ReturnProductModel');
const { SalesProductModel } = require('../model/SalesProductModel');
const ExpenseReportService=async(req,res)=>{
    try{
 const UserEmail=req.headers['email'];
 const FromDate=req.body['FromDate']
 const ToDate=req.body['ToDate']
 let data=await ExpenseModel.aggregate([
    {$match:{UserEmail:UserEmail,CreatedDate:{$gte:new Date(FromDate),$lte:new Date(ToDate)}}},
    {
        $facet:{
            Total:[{
                $group:{
                    _id:0,
                    TotalAmount:{$sum:'$Amount'}
                }
            }],
            Rows:[
                {$lookup:{from:'expensetypes',localField:'TypeID',foreignField:'_id',as:'types'}}
            ]
        }
    }
 ])
 return res.status(200).json(data)
    }catch(err){
 return res.status(200).json(err.toString())
    }
}

const PurchaseReportService=async(req,res)=>{
    try{
const UserEmail=req.headers['email'];
 const FromDate=req.body['FromDate']
 const ToDate=req.body['ToDate']
 const data=await PurchaseProductModel.aggregate([
  {$match:{UserEmail:UserEmail,CreatedDate:{$gte:new Date(FromDate),$lte:new Date(ToDate)}}},
  {
    $facet:{
        Total:[{
            $group:{
                _id:0,
                TotalAmount:{$sum:"$Total"}
            }
        }],
        Rows:[
            {$lookup:{from:'products',localField:'ProductID',foreignField:'_id',as:'Products'}},
            {$lookup:{from:'brands',localField:'Products.BrandID',foreignField:'_id',as:'brands'}},
            {$lookup:{from:'categories',localField:'Products.CategoryID',foreignField:'_id',as:'category'}}

        ]
    }
  }  
 ])
 return res.status(200).json(data)
    }catch(err){
        return res.status(200).json(err.toString()) 
    }
}

const SalesReportService=async(req,res)=>{
    try{
const UserEmail=req.headers['email'];
 const FromDate=req.body['FromDate']
 const ToDate=req.body['ToDate']
 const data=await SalesProductModel.aggregate([
  {$match:{UserEmail:UserEmail,CreatedDate:{$gte:new Date(FromDate),$lte:new Date(ToDate)}}},
  {
    $facet:{
        Total:[{
            $group:{
                _id:0,
                TotalAmount:{$sum:"$Total"}
            }
        }],
        Rows:[
            {$lookup:{from:'products',localField:'ProductID',foreignField:'_id',as:'Products'}},
            {$lookup:{from:'brands',localField:'Products.BrandID',foreignField:'_id',as:'brands'}},
            {$lookup:{from:'categories',localField:'Products.CategoryID',foreignField:'_id',as:'category'}}

        ]
    }
  }  
 ])
 return res.status(200).json(data)
    }catch(err){
        return res.status(200).json(err.toString()) 
    }
}

const ReturnReportService=async(req,res)=>{
    try{
const UserEmail=req.headers['email'];
 const FromDate=req.body['FromDate']
 const ToDate=req.body['ToDate']
 const data=await ReturnProductModel.aggregate([
  {$match:{UserEmail:UserEmail,CreatedDate:{$gte:new Date(FromDate),$lte:new Date(ToDate)}}},
  {
    $facet:{
        Total:[{
            $group:{
                _id:0,
                TotalAmount:{$sum:"$Total"}
            }
        }],
        Rows:[
            {$lookup:{from:'products',localField:'ProductID',foreignField:'_id',as:'Products'}},
            {$lookup:{from:'brands',localField:'Products.BrandID',foreignField:'_id',as:'brands'}},
            {$lookup:{from:'categories',localField:'Products.CategoryID',foreignField:'_id',as:'category'}}

        ]
    }
  }  
 ])
 return res.status(200).json(data)
    }catch(err){
        return res.status(200).json(err.toString()) 
    }
}
module.exports={ReturnReportService,ExpenseReportService,PurchaseReportService,SalesReportService}