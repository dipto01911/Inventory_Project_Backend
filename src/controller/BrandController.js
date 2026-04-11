
const  mongoose  = require('mongoose')

const {BrandModel}=require('../model/BrandModel')
const {CreateService,UpdateService,
ListService,DropDownService,
DeleteService}=require('../service/common')
const { CheckAssociation } = require('../service/CheckAssociate')
const {ProductModel} = require('../model/ProductModel')

const CreateBrand=async(req,res)=>{
let result=await CreateService(req,BrandModel)
res.status(200).json(result)
}

const UpdateBrand=async(req,res)=>{
let result=await UpdateService(req,BrandModel)
res.status(200).json(result)
}



const BrandList=async(req,res)=>{
let SearchRgx={"$regex":req.params.searchKeyword,$options:"i"}
let SearchArray=[{Name:SearchRgx}]
let result=await ListService(req,BrandModel,SearchArray)
res.status(200).json(result)
}

 


const BrandDropDown=async(req,res)=>{
let result=await DropDownService(req,BrandModel,{_id:1,Name:1})
res.status(200).json(result)
}

const DeleteBrand=async(req,res)=>{
    let DeleteID=req.params.id;
    const objectID=new mongoose.Types.ObjectId(DeleteID);
    let CheckAssociate=await CheckAssociation({BrandID:objectID},ProductModel)

    if(CheckAssociate){
      
   return res.status(200).json({status:'associate',data:'Associate with Product & Can not be deleted'})
}
else{
    let result=await DeleteService(req,BrandModel)
   return  res.status(200).json(result)
  
}
}


module.exports={DeleteBrand,CreateBrand,UpdateBrand,BrandList,BrandDropDown}
