
const {CreateService,UpdateService,ListOneJoinService, DeleteService}=require('../service/common')
const {ExpenseModel}=require('../model/ExpenseModel')


const CreateExpenses=async(req,res)=>{
    let result=await CreateService(req,ExpenseModel)
    res.status(200).json(result)
}

const UpdateExpenses=async(req,res)=>{
    let result=await UpdateService(req,ExpenseModel)
    res.status(200).json(result)
}

const ExpenseLists=async(req,res)=>{
let SearchRgx={"$regex":req.params.searchKeyword,$options:'i'}
let SearchArray=[{Note:SearchRgx},{Amount:SearchRgx},{"Type.Name":SearchRgx}]
let JointStage={$lookup:{from:"expensetypes",localField:"TypeID",foreignField:'_id',as:"Type"}}
let result=await ListOneJoinService(req,ExpenseModel,SearchArray,JointStage)
res.status(200).json(result)
}

const DeleteExpense=async(req,res)=>{
    let result=await DeleteService(req,ExpenseModel)
  res.status(200).json(result)
}
module.exports={DeleteExpense,CreateExpenses,UpdateExpenses,ExpenseLists}