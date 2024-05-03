import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

// import './Register.css'

export default function Register() {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  async function register (e) {
    e.preventDefault()

    try {
      const user =  await axios.post('https://calculator-f1l7.onrender.com/api/register',{
        username: username,
        email: email,
        password: password
      })

      console.log(user)

      if (user.data.status === 'ok') {
        alert('Successfully registered')
        navigate('/login')
      } else {
        alert(user.data.error)
      }

    } catch (error) {
      if(error.response) {
        console.log(error.response.data)
      }
    }
  }

  return (
    <div className="p-5">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">Register Form</div>
              <div className="card-body">
                <form>
                  <div className="mb-4">
                    <label htmlFor="username" className="form-label">Enter your Name</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" id='username' placeholder='Name' required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label">Enter your Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" id='email' placeholder='Email' required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">Enter your password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id='password' placeholder='password' required />
                  </div>
                  <div>
                    <button type="submit" className="btn btn-primary btn-block" onClick={register}>Sign Up</button>
                    <div className="card-body">
                      <a href="/login" class="card-link">Login</a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
