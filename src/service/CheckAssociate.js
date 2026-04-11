
const CheckAssociation=async(QueryObject,AssociateModel)=>{

    try{
     let data=await AssociateModel.aggregate([
        {$match:QueryObject}
     ])
     //return true;
     return data.length > 0;

    }catch(err){
        return false
    }
}
module.exports={CheckAssociation}