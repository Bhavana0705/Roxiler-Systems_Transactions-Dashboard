import React, { useEffect, useState } from 'react'
import axios from 'axios'

let Months=['SelectAll','January','February',"March","April","May","June",'July',"August","September","October","November","December"]

let TransactionStatistics=({month})=> {
    const [MonthStats,setMonthStats]=useState({
        "sale":0,
        "sold":0,
        "notSold":0
    })
    console.log(month)
    useEffect(()=>{
        async function f(){
            const res=await axios.get('http://localhost:5000/selectmonth',{'headers':{'month':month}})
            setMonthStats(res.data)
            console.log(res.data)

        }
        f()
    },[])
    
  return (<div className='monthsales'>
  <h1>{Months[month]}</h1>
  <h1>Total Sale{MonthStats.sale}</h1>
  <h1>Total Sold item:{MonthStats.sold}</h1>
  <h1>Total Non SOld item:{MonthStats.notSold}</h1>

  </div>
  )
}

export default TransactionStatistics
