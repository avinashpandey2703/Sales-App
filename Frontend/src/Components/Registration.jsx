import React, { useState } from 'react'
import './Registration.css'
import sweetAlert from 'sweetalert2'
import { SaleApp_API } from '../Config'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Registration() {
  const [Firstname, SetFirstname] = useState("")
  const [Lastname, SetLastname] = useState("")
  const [email, SetEmail] = useState("")
  const [password, SetPassword] = useState("")

  const Navigate = useNavigate();

  const HandleSubmit = (e) => {
    e.preventDefault();
    try {
      if (Firstname !== '' && Lastname !== '' && email !== '' && password !== '') {
        const body = { Firstname, Lastname, email, password }
        axios.post(SaleApp_API + "/userregister", body)
          .then((data) => {
            console.log(data)
            if (data.status===200){
              sweetAlert.fire({
                icon: 'success',
                title: "User Registration Successful"
              })
              Navigate('/login')
            }
          

          })

          .catch(err => {
            sweetAlert.fire({
              icon: 'error',
              title: err.response.data.userError
            
            })
            Navigate('/login')
          })


      }
      else {
        if (Firstname === '') {
          document.getElementById('Firstnameerrorhandle').style.display = 'block'
        }
        if (Lastname === '') {
          document.getElementById('Lastnameerrorhandle').style.display = 'block'
        }
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
      <form className="w-50 m-auto" onSubmit={HandleSubmit} >
        <div className="mb-3 ">
          <h1 className="text-center"> Registration Form</h1>
          <label htmlFor="exampleInputFirstname " className="form-label customtext  "  >First Name</label>
          <input type="text" className="form-control" id="exampleInputFirstname" aria-describedby="emailHelp"
            name="Firstname" onChange={(e) => SetFirstname(e.target.value)}
          />
          <span className='errorMessage ps-3' id='Firstnameerrorhandle'>Invalid Entry</span>

        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputLastname" className="form-label customtext">Last Name</label>
          <input type="text" className="form-control" id="exampleInputLastname"

            name="Lastname" onChange={(e) => SetLastname(e.target.value)}
          />
          <span className='errorMessage ps-3' id='Lastnameerrorhandle'>Invalid Entry</span>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputemail" className="form-label customtext">Email</label>
          <input type="email" className="form-control" id="exampleInputemail"
            name="email" onChange={(e) => SetEmail(e.target.value)}
          />
          <span className='errorMessage ps-3' id='Emailerrorhandle'>Invalid Entry</span>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label customtext">password</label>
          <input type="password" className="form-control" id="exampleInputPassword1"
            name="password" onChange={(e) => SetPassword(e.target.value)}
          />
          <span className='errorMessage ps-3' id='Passwordrrorhandle'>Invalid Entry</span>
        </div>

        <button type="submit" className="btn btn-primary form-control ">Submit</button>
      </form>

    </div>
  )
}

export default Registration
