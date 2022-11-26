import React from "react";
import {Link} from 'react-router-dom';
const About = () =>{
    
    return (
        <div>
            <div class="card text-center mx-auto col-md-10">
                <div class="card-header">
                    iNotebook
                </div>
                <div class="card-body">
                    <h5 class="card-title">Your notes are secured in the cloud</h5>
                    <p class="card-text mx-2">iNotebook provides different ways to take notes and capture your thoughts. <br /> Create checklists to get stuff done with the dedicated checklist note.</p>
                    {!localStorage.getItem('token') && <Link to="/login" class="btn btn-primary">Login</Link>}
                </div>
                <div class="card-footer text-muted">
                    Created by Aditya Kumar. &#169; 2022 
                </div>
                </div>
        </div>
    )
}

export default About;