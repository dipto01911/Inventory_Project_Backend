
const {CreateService,UpdateService,
ListService,DropDownService,
DeleteService}=require('../service/common')

const {CustomerModel}=require('../model/CustomerModel')
const{SalesModel}=require('../model/SalesModel')
const { CheckAssociation } = require('../service/CheckAssociate')
const mongoose=require('mongoose')
const CreateCustomer=async(req,res)=>{
let result=await CreateService(req,CustomerModel)
res.status(200).json(result)
}

const UpdateCustomer=async(req,res)=>{
let result=await UpdateService(req,CustomerModel)
res.status(200).json(result)
}

const CustomerList=async(req,res)=>{
    let SearchRgx={"$regex":req.params.searchKeyword,$options:"i"}
    let SearchArray=[{CustomerName:SearchRgx},{phone:SearchRgx},{Email:SearchRgx},{Address:SearchRgx}]
    let result=await ListService(req,CustomerModel,SearchArray)
    res.status(200).json(result)
}

const CustomerDropDown=async(req,res)=>{
let result=await DropDownService(req,CustomerModel,{_id:1,CustomerName:1})
res.status(200).json(result)
}
const DeleteCustomer=async(req,res)=>{
    let DeleteID=req.params.id;
    const objectID=new mongoose.Types.ObjectId(DeleteID);
    let CheckAssociate=await CheckAssociation({CustomerID:objectID},SalesModel)

    if(CheckAssociate){
      
   return res.status(200).json({status:'associate',data:'Associate with Sales & Can not be deleted'})
}
else{
    let result=await DeleteService(req,CustomerModel)
   return  res.status(200).json(result)
  
}
}

module.exports={DeleteCustomer,CreateCustomer,UpdateCustomer,CustomerList,CustomerDropDown}
