import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = ({setloginuser}) => {
    const [data, setdata] = useState({email : "", password : ""})
    const Navigate = useNavigate();
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setdata({...data, [name]:value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const url = "http://localhost:8080/login";
        await axios.post(url, {Email : data.email, Password : data.password})
        .then(res => {
            const user = res.data.user;
            if(user){
                Navigate("/allvehicle");
            }
            else{
                alert(res.data);
            }
        })


    }

    return (
        <div>
            <div id="container">
            <form className="loginform" onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className="inputs"
						/><br></br>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className="inputs"
						/><br></br>
						
						{/* <Link to ="/home"> */}
							<button type="submit" className="submitbtn">
								Sing In
							</button><br></br>
						{/* </Link> */}
                        <p>New Here ?</p>
                        <Link to="/signup">
                            <button type="button" className="signupbtn">
                                Sing Up
                            </button>
                        </Link>
					</form>
            </div>
        </div>
    );
};

export default Login;