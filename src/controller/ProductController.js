
const mongoose=require('mongoose')
const {ProductModel}=require('../model/ProductModel')
const { CheckAssociation } = require('../service/CheckAssociate')

const {CreateService,UpdateService, ListTwoJoinService, DeleteService}=require('../service/common')
const { ReturnProductModel } = require('../model/ReturnProductModel')
const { PurchaseProductModel } = require('../model/PurchaseProductModel')
const { SalesProductModel } = require('../model/SalesProductModel')

const CreateProduct=async(req,res)=>{
    let result=await CreateService(req,ProductModel)
    res.status(200).json(result)
}

const UpdateProduct=async(req,res)=>{
    let result=await UpdateService(req,ProductModel)
    res.status(200).json(result)
}


const ProductList=async(req,res)=>{
let SearchRgx={"$regex":req.params.searchKeyword,$options:'i'}
let JoinStage1={$lookup:{from:'brands',localField:'BrandID',foreignField:'_id',as:"brands"}}
let JoinStage2={$lookup:{from:'categories','localField':"CategoryID",'foreignField':"_id",as:"categories"}}
let SearchArray=[{Name:SearchRgx},{Unit:SearchRgx},{Details:SearchRgx},{'brands.Name':SearchRgx},{'categories.Name':SearchRgx}]
let result=await ListTwoJoinService (req,ProductModel,SearchArray,JoinStage1,JoinStage2)
res.status(200).json(result)
}


const DeleteProduct=async(req,res)=>{
    let DeleteID=req.params.id;
    const objectID=new mongoose.Types.ObjectId(DeleteID);

    let CheckReturnAssociate=await CheckAssociation({ProductID:objectID},ReturnProductModel)
    let CheckPurchaseAssociate=await CheckAssociation({ProductID:objectID},PurchaseProductModel)
    let CheckSaleAssociate=await CheckAssociation({ProductID:objectID},SalesProductModel)
   
    console.log(CheckReturnAssociate,CheckPurchaseAssociate,CheckSaleAssociate)

    if(CheckReturnAssociate){
      return res.status(200).json({status:'associate',data:'Product Associate with Return & Can not be deleted'})
    }
    else if(CheckPurchaseAssociate){
      return res.status(200).json({status:'associate',data:'Product Associate with Purchase & Can not be deleted'})   
    }
    else if(CheckSaleAssociate){
      return res.status(200).json({status:'associate',data:'Product Associate with Sale & Can not be deleted'})   
    }

else{
    let result=await DeleteService(req,ProductModel)
   return  res.status(200).json(result)
  
}
}

module.exports={CreateProduct,UpdateProduct,ProductList,DeleteProduct}