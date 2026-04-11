
const {CreateService,UpdateService,
ListService,DropDownService}=require('../service/common')

 const {ExpenseTypeModel}=require('../model/ExpnseTypeModel')

 const CreateExpense=async(req,res)=>{
let result=await CreateService(req,ExpenseTypeModel)
res.status(200).json(result)
}

const UpdateExpense=async(req,res)=>{
let result=await UpdateService(req,ExpenseTypeModel)
res.status(200).json(result)
}



const ExpenseList=async(req,res)=>{
let SearchRgx={"$regex":req.params.searchKeyword,$options:"i"}
let SearchArray=[{Name:SearchRgx}]
let result=await ListService(req,ExpenseTypeModel,SearchArray)
res.status(200).json(result)
}

 


const ExpenseDropDown=async(req,res)=>{
let result=await DropDownService(req,ExpenseTypeModel,{_id:1,Name:1})
res.status(200).json(result)
}

module.exports={CreateExpense,UpdateExpense,
ExpenseList,ExpenseDropDown}