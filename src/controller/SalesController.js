

const {SalesModel}=require('../model/SalesModel')
const {SalesProductModel}=require('../model/SalesProductModel')
const { CreateParentChildService, ListOneJoinService, DeleteParentChildService } = require('../service/common')




const CreateSell=async(req,res)=>{
let result=await CreateParentChildService(req,SalesModel,SalesProductModel,'SaleID')
res.status(200).json(result)
}


const SellList=async(req,res)=>{
    let SearchRgx={"$regex":req.params.searchKeyword,$options:"i"}
    let JoinStage={$lookup:{from:'customers',localField:"CustomerID",foreignField:'_id',as:'customers'}}
    let SearchArray=[{Note:SearchRgx},{"customers.CustomerName":SearchRgx},{"customers.Address":SearchRgx},{ShippingCost:SearchRgx},{GrandTotal:SearchRgx},{'suppliers.Name':SearchRgx},{"suppliers.Address":SearchRgx},{"suppliers.Email":SearchRgx}]
    let result=await ListOneJoinService(req,SalesModel,SearchArray,JoinStage)
    res.status(200).json(result)
}

const SaleDelete=async(req,res)=>{
    let result =await DeleteParentChildService(req,SalesModel,SalesProductModel,'SaleID')
  res.status(200).json(result)
}


module.exports={CreateSell,SellList,SaleDelete}