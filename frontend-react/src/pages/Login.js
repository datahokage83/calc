import React, { useState } from 'react'
import axios from 'axios'
import './Login.css'

export default function Login() {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function login (e) {
    e.preventDefault()
    
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email: email,
        password: password,
        loginAt: new Date().toISOString()
      })

      if (response.data.status === 'ok') {
        console.log(response.data)
        localStorage.setItem('token', response.data.user)
        alert('Login berhasil')
        window.location.href = '/dashboard'
      } else {
        alert('Email atau Password Salah')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    
    <div className="p-5">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">Login Form</div>
              <div className="card-body">
                <form onSubmit={login}>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" id='email' placeholder='Email' required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">Kata Sandi</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id='password' placeholder='Kata Sandi' required />
                  </div>
                  <div>
                    <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                    <div className="card-body">
                      <a href="/register" class="card-link">Register</a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div>
    // <div className='form-signin mt-5'>
    //   <form onSubmit={login}>
    //     <h1 className="h3 mb-3 fw-normal">Login Form</h1>
    //     <div className="form-floating">
    //       <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id='email' placeholder='name@example.com' required/>
    //       <label htmlFor="email">Email address</label>
    //     </div>
    //     <div className="form-floating">
    //       <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id='password' placeholder='Password' required/>
    //       <label htmlFor="password">Password</label>
    //     </div>
    //     <div className='gap-2'>
    //       <button className="w-100 btn btn-lg btn-primary" type='submit'>Sign In</button>
    //     </div>
    //   </form>
    // </div>
    // </div>
  )
}
