let express=require("express")
let mongoose=require("mongoose")
let route= require('./routes/transactionRoutes')
let cors=require('cors')
let app=express()
app.use(express.json())
app.use(cors())
mongoose.connect("mongodb://127.0.0.1:27017/product_transaction").then(()=>{
    console.log("database is connected successfully ok")
})

app.use("/",route)
app.listen(5000)