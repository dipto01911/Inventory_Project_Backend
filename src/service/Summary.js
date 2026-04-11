const { ExpenseModel } = require("../model/ExpenseModel");
const { PurchaseModel } = require("../model/PurchaseModel");
const { ReturnModel } = require("../model/ReturnModel");
const { SalesModel } = require("../model/SalesModel");

const ExpenseSummary=async(req,res)=>{
    try{

const UserEmail=req.headers['email'];
let data=await ExpenseModel.aggregate([
    {$match:{UserEmail:UserEmail}},
    {
        $facet:{
            Total:[{
                $group:{
                    _id:0,
                    TotalAmount:{$sum:"$Amount"}
                }
            }],
            Last30Days:[{
                $group:{
                    _id:{$dateToString:{format:'%Y-%m-%d',date:'$CreatedDate'}},
                    TotalAmount:{$sum:"$Amount"}

                }
            },
            {$sort:{_id:-1}},
            {$limit:30}
        ]
        }
    }
])
 return res.status(200).json(data)

    }catch(err){
        return res.status(200).json(err.toString())
    }
}

const PurChaseSummary=async(req,res)=>{
    try{

const UserEmail=req.headers['email'];
let data=await PurchaseModel.aggregate([
    {$match:{UserEmail:UserEmail}},
    {
        $facet:{
            Total:[{
                $group:{
                    _id:0,
                    TotalAmount:{$sum:"$GrandTotal"}
                }
            }],
            Last30Days:[{
                $group:{
                    _id:{$dateToString:{format:'%Y-%m-%d',date:'$CreatedDate'}},
                    TotalAmount:{$sum:"$GrandTotal"}

                }
            },
            {$sort:{_id:-1}},
            {$limit:30}
        ]
        }
    }
])
 return res.status(200).json(data)

    }catch(err){
        return res.status(200).json(err.toString())
    }
}

const SalesSummary=async(req,res)=>{
    try{

const UserEmail=req.headers['email'];
let data=await SalesModel.aggregate([
    {$match:{UserEmail:UserEmail}},
    {
        $facet:{
            Total:[{
                $group:{
                    _id:0,
                    TotalAmount:{$sum:"$GrandTotal"}
                }
            }],
            Last30Days:[{
                $group:{
                    _id:{$dateToString:{format:'%Y-%m-%d',date:'$CreatedDate'}},
                    TotalAmount:{$sum:"$GrandTotal"}

                }
            },
            {$sort:{_id:-1}},
            {$limit:30}
        ]
        }
    }
])
 return res.status(200).json(data)

    }catch(err){
        return res.status(200).json(err.toString())
    }
}

const ReturnSummary=async(req,res)=>{
 try{

const UserEmail=req.headers['email'];
let data=await ReturnModel.aggregate([
    {$match:{UserEmail:UserEmail}},
    {
        $facet:{
            Total:[{
                $group:{
                    _id:0,
                    TotalAmount:{$sum:"$GrandTotal"}
                }
            }],
            Last30Days:[{
                $group:{
                    _id:{$dateToString:{format:'%Y-%m-%d',date:'$CreatedDate'}},
                    TotalAmount:{$sum:"$GrandTotal"}

                }
            },
            {$sort:{_id:-1}},
            {$limit:30}
        ]
        }
    }
])
 return res.status(200).json(data)

    }catch(err){
        return res.status(200).json(err.toString())
    }
}

module.exports={ExpenseSummary,PurChaseSummary,SalesSummary,ReturnSummary}