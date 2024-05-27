import React, { useState } from 'react'
import './Registration.css'
import axios from 'axios'
import sweetAlert from 'sweetalert2'
import { SaleApp_API } from '../Config'




function Form() {

  const [product_name, SetProduct_name] = useState("")
  const [quantity, SetQuantity] = useState("0")
  const [amount, SetAmount] = useState("0")

   const header={
    headers:{
      "Authorization":"Bearer " + localStorage.getItem("token"),
      "Content-Type":"application/json"
    }
   }
  const HandleSubmit=(e)=>{
    e.preventDefault();
    const sales = { product_name, quantity ,amount }
    

    try{
      if(sales.product_name!=='' && sales.quantity!==0 &&sales.amount!==0){
        axios.post(SaleApp_API + "/addsales", sales,header)
        .then(()=>{
          sweetAlert.fire({
            icon: 'Success',
            title: "Sales Added Successfully"
        })
        })
        .catch(err=>{
          sweetAlert.fire({
            icon: 'error',
            title: err.response.data.error_msg
          })
        })
      }
      else{
       
        sweetAlert.fire({
          icon: 'error',
          title: "All field are mendatory"
        })
      }

    }catch(error){
      throw error;

    }
  }



  return (
    <div>
      <form className="w-50 m-auto " onSubmit={HandleSubmit}>
  <div className="mb-3 ">
  <h1 className="text-center"> ADD SALES ENTRY</h1>
    <label htmlFor="exampleInputEmail1 " className="form-label customtext">Product Name</label>
    <input type="text" className="form-control" id="exampleInputEmail1 " aria-describedby="emailHelp"
      name="product_name" onChange={(e) => SetProduct_name(e.target.value)}
    />
   
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputemail" className="form-label customtext">Quantity</label>
    <input type="Number" className="form-control" id="exampleInputemail"
       name="quantity" onChange={(e) => SetQuantity(e.target.value)}
    />
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label customtext">Amount</label>
    <input type="Number" className="form-control" id='exampleInputPassword1'
      name="amount" onChange={(e) => SetAmount(e.target.value)}
    
    />
 
  </div>
 
  <button type="submit" className="btn btn-primary form-control ">Submit</button>
</form>
    </div>
  )
}

export default Form
