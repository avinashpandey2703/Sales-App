import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { SaleApp_API } from '../Config'

import sweetAlert from 'sweetalert2'


function Revenue() {

  const header = {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json"
    }
  }


  const [allSales, SetAllSales] = useState([])
  const [revenue, setRevenue] = useState();

  const getAllSalesData = async () => {
    try {
        const salesList = await axios.get(SaleApp_API + "/getallsales",header)
        let Count = 0;
        for(let i = 0; i < salesList.data.Result.length; i++) {
          Count = Count + salesList.data.Result[i].amount
        }
        setRevenue(Count);
    } catch (error) {
        sweetAlert.fire({
            icon: "error",
            title: error.response.data.error_msg
        })
      }
    }
      
useEffect(() => {
    getAllSalesData()
}, []);




  return (
    <div>
      <h1 class="text-center">Todays Revenue is {revenue}</h1>

    </div>
  )
}
  

export default Revenue
