import axios from 'axios';
import React, { useState } from 'react'
import { SaleApp_API } from '../Config'
import './Registration.css'
import { useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import sweetAlert from 'sweetalert2'

function Login() {
  const [email, SetEmail] = useState("")
  const [password, SetPassword] = useState("")
  const Dispatch =useDispatch()  // we use useDispatch hook
  const Navigate =useNavigate();

  const HandleSubmit = async(e) => {
    e.preventDefault();

    try {
      if (email !== '' && password !== '') {
        const body = { email, password }
        
       await axios.post(SaleApp_API + "/login", body)
          .then((response) => {
            if (response.status === 200) {
              localStorage.setItem('token',response.data.Result.Token)
              localStorage.setItem('user', JSON.stringify(response.data.Result.userInfo))
              Dispatch({type:"LOGIN", payload:response.data.Result.userInfo})
              Navigate("/Form")
            }
          })
          .catch(err => {
           sweetAlert({
            icon: "error",
            title: err.data.error_msg
           })
          })
        }
      else {

        if (email === '') {
          document.getElementById('Emailerrorhandle').style.display = 'block'
        }
        if (password === '') {
          document.getElementById('Passwordrrorhandle').style.display = 'block'
        }
      }

    }
    catch (error) {
      throw error;
    }
  }



  return (
    <div>
      <form class="w-50 m-auto" onSubmit={HandleSubmit}>
        <div class="mb-3 ">
          <h1 class="text-center">Login Form</h1>
          <label htmlFor="exampleInputEmail1 " class="form-label customtext  " >Email</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            value={email} onChange={(e) => SetEmail(e.target.value)}

          />
          <span className='errorMessage ps-3' id='Emailerrorhandle'>Invalid Entry</span>

        </div>
        <div class="mb-3">
          <label htmlFor="exampleInputPassword1" class="form-label customtext">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1"
            value={password} onChange={(e) => SetPassword(e.target.value)}
          />
          <span className='errorMessage ps-3' id='Passwordrrorhandle'>Invalid Entry</span>
        </div>


        <button type="submit" class="btn btn-primary form-control ">Submit</button>
      </form>
    </div>
  )
}

export default Login
