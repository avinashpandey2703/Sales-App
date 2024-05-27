import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { SaleApp_API } from '../Config'
import sweetAlert from 'sweetalert2'


function Topsales() {
  const header={
    headers:{
      "Authorization":"Bearer " + localStorage.getItem("token"),
      "Content-Type":"application/json"
    }
   }

const [allSales,SetAllSales]=useState([])
const getAllSalesData=async()=>{
  try {
    const salesList = await axios.get(SaleApp_API + "/getallsales",header)
    SetAllSales(salesList.data.Result)
} catch (error) {
    sweetAlert.fire({
        icon: "error",
        title: error.response.data.error_msg
    })
}


}

useEffect(()=>{
  getAllSalesData();
},[]);


  return (
    <div class="w-50 m-auto">
    <h1 class="text-center">Top Sales</h1>
      <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Sales Id</th>
      <th scope="col">Product Name</th>
      <th scope="col">Quantity</th>
      <th scope="col">Sales Amount</th>
    </tr>
  </thead>
  <tbody>
  {allSales
  .sort((a, b) => b.quantity - a.quantity) 
  .slice(0, 5) 
  .map((sales, index) => (
    <tr key={sales._id}>
      <th scope="row">{index + 1}</th>
      <td>{sales._id}</td>
      <td>{sales.product_name}</td>
      <td>{sales.quantity}</td>
      <td>{sales.amount}</td>
    </tr>
  ))}

    
   
    
  </tbody>
</table>
    </div>
  )
}

export default Topsales
