
const {PurchaseModel}=require('../model/PurchaseModel')
const {PurchaseProductModel}=require('../model/PurchaseProductModel')

const {CreateParentChildService,ListOneJoinService, DeleteParentChildService}=require('../service/common')

const CreatePurchase=async(req,res)=>{
let result=await CreateParentChildService(req,PurchaseModel,PurchaseProductModel,'PurchaseID')
res.status(200).json(result)
}


const PurchaseList=async(req,res)=>{
    let SearchRgx={"$regex":req.params.searchKeyword,$options:"i"}
    let JoinStage={$lookup:{from:'suppliers',localField:"SupplierID",foreignField:'_id',as:'suppliers'}}
    let SearchArray=[{VatTax:SearchRgx},{Discount:SearchRgx},{OtherCost:SearchRgx},{ShippingCost:SearchRgx},{GrandTotal:SearchRgx},{'suppliers.Name':SearchRgx},{"suppliers.Address":SearchRgx},{"suppliers.Email":SearchRgx}]
    let result=await ListOneJoinService(req,PurchaseModel,SearchArray,JoinStage)
    res.status(200).json(result)
}

const PurchaseDelete=async(req,res)=>{
let result = DeleteParentChildService(req,PurchaseModel,PurchaseProductModel,'PurchaseID')
  res.status(200).json(result)
}




module.exports={CreatePurchase,PurchaseList,PurchaseDelete}