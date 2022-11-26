import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: '', password: ''});
    let navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json= await response.json();
        if (json.success) {
            console.log(json);
            localStorage.setItem('token', json.authToken)
            navigate('/')
            props.showAlert('Login Successfully', 'success');
        } else {
            props.showAlert('Invalid Credentials', 'danger');
        }
        
    }
    const onChange = (e) =>{
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }
    return (
        <div className='container'>
            <div className='row col-md-8 mx-auto'>
            <h2>Login to access to iNotebook</h2>
            
           <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input onChange={onChange} name="email" type="email" className="form-control" id="eamil"  />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" onChange={onChange} name="password" className="form-control" id="password" />
                </div> 
                <button type="submit"  className="btn btn-primary">Submit</button>
        </form>
        </div>
        </div>
    )
}

export default Login;