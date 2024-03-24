import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

export default function Register() {
  const [user, setUser] = useState({
    name: '',
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
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/user/register', { ...user })
      localStorage.setItem('firstRegister', true)
      window.location.href = '/'
    } catch (error) {
      alert(error.response.data.msg)
    }
    
  }

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input type="text" name="name" value={user.name} onChange={handleInputChange} required placeholder="Name" />
        <input type="email" name="email" value={user.email} onChange={handleInputChange} required placeholder="Email" />
        <input type="password" name="password" value={user.password} onChange={handleInputChange} required placeholder="Password" />
        <button type="submit">Register</button>
        <p>Already have an account? 
            <Link to="/login">Login Now</Link>
          </p>
      </form>
    </div>
  )
}
