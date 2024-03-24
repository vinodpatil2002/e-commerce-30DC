import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";



export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = e => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    })
  }

  const handleLoginSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/user/login', { ...user })
      localStorage.setItem('firstLogin', true)
      window.location.href = '/'
      
    } catch (error) {
        alert(error.response.data.msg)
    }
    
  }

  return (
    <div className="login-page">
      <form onSubmit={handleLoginSubmit}>
        <h2>Login</h2>
        <input type="email" name="email" value={user.email} required onChange={handleInputChange} placeholder="Email" />
        <input type="password" name="password" value={user.password} onChange={handleInputChange} required placeholder="Password" />
        <button type="submit">Login</button>
        <p>Don't have an account? 
            <Link to="/register">Register Now</Link>
          </p>
      </form>
    </div>
  )
}
