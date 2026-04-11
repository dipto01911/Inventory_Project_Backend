
const {ReturnModel}=require('../model/ReturnModel')
const {ReturnProductModel}=require('../model/ReturnProductModel')
const { CreateParentChildService, ListOneJoinService, DeleteParentChildService } = require('../service/common')


const CreateReturn=async(req,res)=>{
let result=await CreateParentChildService(req,ReturnModel,ReturnProductModel,'ReturnID')
res.status(200).json(result)
}


const ReturnList=async(req,res)=>{
    let SearchRgx={"$regex":req.params.searchKeyword,$options:"i"}
    let JoinStage={$lookup:{from:'customers',localField:"CustomerID",foreignField:'_id',as:'customers'}}
    let SearchArray=[{Note:SearchRgx},{"customers.CustomerName":SearchRgx},{"customers.Address":SearchRgx},{ShippingCost:SearchRgx},{GrandTotal:SearchRgx},{'suppliers.Name':SearchRgx},{"suppliers.Address":SearchRgx},{"suppliers.Email":SearchRgx}]
    let result=await ListOneJoinService(req,ReturnModel,SearchArray,JoinStage)
    res.status(200).json(result)
}

const ReturnDelete=async(req,res)=>{
    let result =await DeleteParentChildService(req,ReturnModel,ReturnProductModel,'ReturnID')
  res.status(200).json(result)
}


module.exports={CreateReturn,ReturnList,ReturnDelete}