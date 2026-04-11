
const mongoose=require('mongoose')
const {SupplierModel}=require('../model/SupplierModel')
const {CreateService,UpdateService,
ListService,DropDownService,
DeleteService}=require('../service/common')
const { CheckAssociation } = require('../service/CheckAssociate')
const { PurchaseModel } = require('../model/PurchaseModel')

const CreateSupplier=async(req,res)=>{
let result=await CreateService(req,SupplierModel)
res.status(200).json(result)
}

const UpdateSupplier=async(req,res)=>{
let result=await UpdateService(req,SupplierModel)
res.status(200).json(result)
}



const SupplierList=async(req,res)=>{
let SearchRgx={"$regex":req.params.searchKeyword,$options:"i"}
let SearchArray=[{Name:SearchRgx},{Phone:SearchRgx},{Email:SearchRgx},{Address:SearchRgx}]
let result=await ListService(req,SupplierModel,SearchArray)
res.status(200).json(result)
}

 


const SupplierDropDown=async(req,res)=>{
let result=await DropDownService(req,SupplierModel,{_id:1,Name:1})
res.status(200).json(result)
}


const DeleteSupplier=async(req,res)=>{
    let DeleteID=req.params.id;
    const objectID=new mongoose.Types.ObjectId(DeleteID);
    let CheckAssociate=await CheckAssociation({SupplierID:objectID},PurchaseModel)

    if(CheckAssociate){
      
   return res.status(200).json({status:'associate',data:'Associate with Purchases & Can not be deleted'})
}
else{
    let result=await DeleteService(req,SupplierModel)
   return  res.status(200).json(result)
  
}
}


module.exports={DeleteSupplier,CreateSupplier,UpdateSupplier,SupplierList,SupplierDropDown}