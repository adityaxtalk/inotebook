import React, { useEffect, useState } from "react";

const User = ()=> {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({name: '', email: '', date: ''});
    useEffect(()=>{
        (async ()=> {
            const response=await fetch('http://localhost:5000/api/auth/getuser', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            });
            const data= await response.json();
            setUser({name: data.name, email: data.email, date: new Date(data.date).toUTCString()})
            setLoading(false)
    
        })()
    }, [])
    return (
        <>
            {
                loading ? <h2>Fetching user details...</h2> : 
                <div className="container">
                    <div className="row col-md-8 mx-auto">
                        <div className="card mb-4">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" className="img-fluid rounded-circle" alt="..." />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{user.name}</h5>
                                        <p className="card-text">{user.email}</p>
                                        <p className="card-text"><small className="text-muted">Profile created {user.date}</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        }
        </>
    )
}

export default User;