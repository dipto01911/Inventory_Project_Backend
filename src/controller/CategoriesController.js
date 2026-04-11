
const mongoose=require('mongoose')
const {CategoriesModel}=require('../model/CategoriesModel')
const { ProductModel } = require('../model/ProductModel')
const { CheckAssociation } = require('../service/CheckAssociate')

const {CreateService,UpdateService,
ListService,DropDownService,
DeleteService}=require('../service/common')

const CreateCategories=async(req,res)=>{
let result=await CreateService(req,CategoriesModel)
res.status(200).json(result)
}

const UpdateCategories=async(req,res)=>{
let result=await UpdateService(req,CategoriesModel)
res.status(200).json(result)
}



const CategoriesList=async(req,res)=>{
let SearchRgx={"$regex":req.params.searchKeyword,$options:"i"}
let SearchArray=[{Name:SearchRgx}]
let result=await ListService(req,CategoriesModel,SearchArray)
res.status(200).json(result)
}

 


const CategoriesDropDown=async(req,res)=>{
let result=await DropDownService(req,CategoriesModel,{_id:1,Name:1})
res.status(200).json(result)
}

const DeleteCategory=async(req,res)=>{
    let DeleteID=req.params.id;
    const objectID=new mongoose.Types.ObjectId(DeleteID);
    let CheckAssociate=await CheckAssociation({CategoryID:objectID},ProductModel)

    if(CheckAssociate){
      
   return res.status(200).json({status:'associate',data:'Associate with Product & Can not be deleted'})
}
else{
    let result=await DeleteService(req,CategoriesModel)
   return  res.status(200).json(result)
  
}
}


module.exports={DeleteCategory,CreateCategories,UpdateCategories,CategoriesList,CategoriesDropDown}