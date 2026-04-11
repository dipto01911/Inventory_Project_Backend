
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config({path:'./.env'})
const app=require('./app')

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Database Connected...')
    app.listen(process.env.PORT,()=>console.log(`Server running ...${process.env.PORT}`))
}).catch((err)=>{
    console.log('error occured',err.toString())
})