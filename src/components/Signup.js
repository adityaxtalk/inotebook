import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const Signup = (props) => {
  const [user, setUser] = useState({name: '', email: '', password: '', confirmPassword: ''});
  const onChange=(e)=>{
    setUser({...user, [e.target.name]: e.target.value});
  }
  const navigate =useNavigate();
  const handleSubmit = async (e) =>{
      e.preventDefault();
      const response = await fetch('http://localhost:5000/api/auth/createuser', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({email : user.email, password: user.password, name: user.name})
      })
      const json= await response.json();
      if (json.success) {
        localStorage.setItem('token', json.authtoken);
        navigate('/login');
        props.showAlert('Account created successfully', 'success');
      } else {
        props.showAlert('Invalid Details', 'danger');
      }
      
  }
    return (
        <div className="container">
            <div className="row col-md-6 mx-auto">
            <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" onChange={onChange} className="form-control" id="name" name="name"  required/>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email address</label>
                      <input type="email" onChange={onChange} className="form-control" id="email"  name="email" required/>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input type="password" onChange={onChange} className="form-control" id="password" name="password" required/>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                      <input type="password" onChange={onChange} className="form-control" id="confirmPassword" name="confirmPassword" required/>
                    </div>
                      <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Signup;