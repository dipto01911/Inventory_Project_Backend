
const mongoose=require('mongoose')

const DataSChema=mongoose.Schema({
UserEmail:{type:String},
Name:{type:String,unique:true},
CreatedDate:{type:Date,default:Date.now()}
},{versionKey:false})


const ExpenseTypeModel=mongoose.model('expensetypes',DataSChema)
module.exports={ExpenseTypeModel}