let transactionmodel=require('../model/Transaction')
let searchMonth=async(req,res)=>{
    try{

        if(req.headers.month==0){
           
            res.json(await transactionmodel.find().skip(req.headers.pages*10).limit(10))

            }

            else{
                console.log(req.headers.month)
                res.json(await transactionmodel.aggregate([
                    {
                        $addFields:{
                                    convertdate:{$toDate:"$dateOfSale"}
                                    }
                    },
                    {
                        $addFields:{
                            month:{$month:"$convertdate"}
        
                        }
                    },
                    {
                        $match:{"month":+req.headers.month}
                    }
                    
        
                ]))
            }
    }
    catch(err){
        console.log(err)
        res.json(err)
    }

}
let selectMonth=async(req,res)=>{
    console.log(req.headers.month)
    const selectedMonth= await transactionmodel.aggregate([
        {
            $addFields:{
                        convertdate:{$toDate:"$dateOfSale"}
                        }
        },
        {
            $addFields:{
                month:{$month:"$convertdate"}

            }
        },
        {
            $match:{"month":+req.headers.month}
        }
        

    ])
    let totalSale=0
   const soldItems= selectedMonth.reduce((x,product)=>{
            if(product.sold===true){
                totalSale=totalSale+product.price
                return x+1

            }
            return x
    },0)
  
    console.log(totalSale)
    res.json({"sold":soldItems,"notSold":selectedMonth.length-soldItems,"sale":totalSale})
}
module.exports={searchMonth,selectMonth}