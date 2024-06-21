import React from 'react'
import { useEffect,useState } from 'react'

import axios from 'axios'
import "./App.css"
import TransactionStatistics from './components/TransacitionStatistics'

let Months=['SelectAll','January','February',"March","April","May","June",'July',"August","September","October","November","December"]

const App = () => {
  const [products,setProducts]=useState([])
  const [month,setMonth]=useState(3)
  const [search,setSearch]=useState("")
  const [pages,setPages]=useState(0)

  useEffect(()=>{
    
    (async ()=>{
      const responce=await axios.get('http://localhost:5000/month',{"headers":{"pages":pages,"search":search,"month":month}})
     
      setProducts(responce.data)
      

    })()
 
  },[pages,search,month])

  let Search=(event)=>{
    setPages(0)
    setSearch(event.target.value)

  }

  let handlePages=(Index)=>{
    setPages((prev)=>{
      if((Index===-1 && prev===0)|| (Index===1 &&products.length<10)){
        return prev
      }
      return prev+Index
    });

  }
let Month=(e)=>{
    setMonth(e.target.value)
    console.log(e.target.value)

  }
  return (
    <div className="main_container">
      
            <header className="dashboard">
                <h1>Transactions Dashboard</h1>
            </header>
      <div className='search_container'>
      <input type="text" placeholder="Search products" onChange={Search} value={search}></input>
      <select onChange={Month} defaultValue={3}>
        
      {
        Months.map((month,index)=>{
          return <option value={index} key={month}>{month}</option>
        })
      }
      
    </select>
    </div>

  <table border={1}>
      <thead>
        <tr>
        <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>price</th>
          <th>Category</th>
          <th>Sold</th>
      
          <th>Image</th>
        </tr>

      </thead>
      <tbody>
      {
        products.map((item)=>{
          return(
            
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.title}</td>
        <td>{item.description}</td>
        <td>{item.price}</td>
        <td>{item.category}</td>
        <td>{item.sold?"True":"False"}</td>
        <td><img src={item.image} style={{
            width:"60%",
            height:"50%"
        }}></img></td>
    </tr>
          )
        })
      }
      </tbody>
      
      


    </table>
    <div className='buttons'>
      {pages!==0 && <button onClick={()=>handlePages(-1)}>prev</button>}
      {products.length===10&&<button onClick={()=>handlePages(1)}>next</button>}
      </div>
      <TransactionStatistics key={month} month={month==0?3:month} ></TransactionStatistics>
      
    </div>
  )
}

export default App
