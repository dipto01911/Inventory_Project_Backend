

const CreateService=async(req,DataModel)=>{
    try{
  let postbody=req.body;
  postbody.UserEmail=req.headers['email'];

  let data=await DataModel.create(postbody)
  return {status:"success",data:data}
    }catch(err){
        return{status:"fail",data:err.toString()}
    }
}


const UpdateService=async(req,DataModel)=>{
    try{
 let UserEmail=req.headers['email'];
 let id=req.params.id;
 let postbody=req.body;
 let data=await DataModel.updateOne({_id:id,UserEmail:UserEmail},postbody)
return {status:'success',data:data}
   
    }catch(err){
        return{status:"fail",data:err.toString()}
    }
}

const ListService=async(req,DataModel,SearchArray)=>{
    try{

        let pageNo=Number(req.params.pageNo);
        let perPage=Number(req.params.perPage)
        let searchValue=req.params.searchKeyword;
        console.log(pageNo,perPage,searchValue)
        let UserEmail=req.headers['email'];
        let skipRow=(pageNo-1)*perPage;
        let data;
        if(searchValue !=='0'){
    let SearchQuery={$or:SearchArray}
    data=await DataModel.aggregate([
        {$match:{UserEmail:UserEmail}},
        {$match:SearchQuery},
        {
            $facet:{
                Total:[{$count:"count"}],
                Rows:[{$skip:skipRow},{$limit:perPage}]
            }
        }
    ])
        }
else{
    data=await DataModel.aggregate([
        {$match:{UserEmail:UserEmail}},
        {
            $facet:{
                Total:[{$count:"count"}],
                Rows:[{$skip:skipRow},{$limit:perPage}]
            }
        }
    ])
}
 return {status:'success',data:data}
    }catch(err){
 return{status:"fail",data:err.toString()}
    }
}


const DropDownService=async(req,DataModel,projection)=>{
    try{
        let UserEmail=req.headers['email'];
        let data=await DataModel.aggregate([
            {$match:{UserEmail:UserEmail}},
             {$project:{...projection}}
        ])
 return {status:'success',data:data}
    }catch(err){
         return{status:"fail",data:err.toString()}
    }

}

const ListOneJoinService=async(req,DataModel,SearchArray,JoinStage)=>{
    try{
let pageNo=Number(req.params.pageNo);
let perPage=Number(req.params.perPage);
let searchValue=req.params.searchKeyword;
let UserEmail=req.headers['email'];
let skipRow=(pageNo-1)*perPage;
let data;

if(searchValue !=='0'){
    data=await DataModel.aggregate([
        [{$match:{UserEmail:UserEmail}},
            JoinStage,
            {$match:{$or:SearchArray}},
            {
                $facet:{
                    Total:[{$count:'count'}],
                    Rows:[{$skip:skipRow},{$limit:perPage}]
                }
            }
        ]
    ])
}
  else{
      data=await DataModel.aggregate([
        {$match:{UserEmail:UserEmail}},
        JoinStage,
        {
            $facet:{
                Total:[{$count:"count"}],
                Rows:[{$skip:skipRow},{$limit:perPage}]
            }
        }
    ])
  }
  return {status:'success',data:data}
    }catch(err){
        return {status:'fail',data:err.toString()}
    }
}


const ListTwoJoinService=async(req,DataModel,SearchArray,JoinStage1,JoinStage2)=>{
    try{
let pageNo=Number(req.params.pageNo);
let perPage=Number(req.params.perPage);
let searchValue=req.params.searchKeyword;
let UserEmail=req.headers['email'];
let skipRow=(pageNo-1)*perPage;
let data;

if(searchValue !=='0'){
    data=await DataModel.aggregate([
        [{$match:{UserEmail:UserEmail}},
            JoinStage1,JoinStage2,
            {$match:{$or:SearchArray}},
            {
                $facet:{
                    Total:[{$count:'count'}],
                    Rows:[{$skip:skipRow},{$limit:perPage}]
                }
            }
        ]
    ])
}
  else{
      data=await DataModel.aggregate([
        {$match:{UserEmail:UserEmail}},
        JoinStage1,JoinStage2,
        {
            $facet:{
                Total:[{$count:"count"}],
                Rows:[{$skip:skipRow},{$limit:perPage}]
            }
        }
    ])
  }
  return {status:'success',data:data}
    }catch(err){
        return {status:'fail',data:err.toString()}
    }
}

const CreateParentChildService=async(req,ParentModel,ChildModel,JoinPropertyName)=>{

    try{
        let Parent=req.body['Parent'];
        Parent.UserEmail=req.headers['email'];
        let ParentCreation=await ParentModel.create(Parent);

        if(ParentCreation['_id']){
            try{
          let Childs=req.body['Childs'];
          await Childs.forEach((element)=>{
            element[JoinPropertyName]=ParentCreation['_id'];
            element['UserEmail']=req.headers['email'];
          })
          let ChildsCreation=await ChildModel.insertMany(Childs);
          return {status:'success',Parent:ParentCreation,Childs:ChildsCreation}
            }catch(err){
             await ParentModel.remove({_id:ParentCreation['_id']})
             return{status:'fail',data:'Child Creation Failed'}
            }
        }
       else{
        return{status:"fail",data:'Parent Creation Failed'}
       }
    }catch(err){
        return {status:'fail',data:err.tostring()}
    }
}


const mongoose=require('mongoose')
const DeleteParentChildService=async(req,ParentModel,ChildModel,JoinPropertyName)=>{
 const session=await mongoose.startSession();
 try{

    await session.startTransaction();
    let DeleteID=req.params.id;
    let UserEmail=req.headers['email'];

    let ChildQueryObject={};
 ChildQueryObject[JoinPropertyName]=DeleteID;
 ChildQueryObject['UserEmail']=UserEmail;

 let ParentQueryObject={};
 ParentQueryObject['_id']=DeleteID;
 ParentQueryObject['UserEmail']=UserEmail;

 let ChildDelete=await ChildModel.deleteMany(ChildQueryObject).session(session)
let ParentDelete=await ParentModel.deleteMany(ParentQueryObject).session(session)

await session.commitTransaction();
session.endSession();

return {status:"success",Parent:ParentDelete,Child:ChildDelete}

 }catch(err){
 await session.abortTransaction();
 session.endSession()
 return {status:'fail',data:err.toString()}
 }
}

const DeleteService=async(req,DataModel)=>{
    try{
 let DeleteID=req.params.id;
 let UserEmail=req.headers['email'];
 let QueryObject={};
 QueryObject['_id']=DeleteID;
 QueryObject['UserEmail']=UserEmail;
 let Delete=await DataModel.deleteMany(QueryObject)
return{status:'success',Delete:Delete}
}catch(err){
        return{status:'fail',data:err.toString()}
    }
}

module.exports={DeleteService,DeleteParentChildService,CreateService,UpdateService,ListService,DropDownService,ListOneJoinService,ListTwoJoinService,CreateParentChildService}