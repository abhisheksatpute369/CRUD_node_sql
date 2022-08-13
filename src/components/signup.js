import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./signup.css";

const Signup = () => {

    const [data, setdata] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
    const [Error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setdata({...data,[name]:value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {firstName,lastName,email,password} = data;
            if(firstName && lastName && email && password)
            {
                try {
                    const url = "http://localhost:8080/adduser";
                    await axios.post(url, {firstName : data.firstName, lastName : data.lastName, Email : data.email, Password : data.password})
                    .then((res) =>{
                        if(res.data === "User already exists")
                        {
                            alert(res.data);
                        }
                        else{
                            navigate("/")
                        }
                        
                    })
                    
                } catch (error) {
                    console.log(error);
                }
            }
            else{
                alert("Check all input fields")
            }
        
    }
    return (
        <div>
            <form className="signupform" onSubmit={handleSubmit}>
				<h1>Create Account</h1>
				<input
					type="text"
					placeholder="First Name"
					name="firstName"
					onChange={handleChange}
					value={data.firstName}
					required
					className="signupinputs"
				/><br></br>
				<input
					type="text"
                    placeholder="Last Name"
					name="lastName"
					onChange={handleChange}
					value={data.lastName}
					required
					className="signupinputs"
				/><br></br>
				<input
					type="email"
					placeholder="Email"
					name="email"
					onChange={handleChange}
					value={data.email}
					required
					className="signupinputs"
				/><br></br>
				<input
                	type="password"
					placeholder="Password"
					name="password"
					onChange={handleChange}
					value={data.password}
					required
                    className="signupinputs"
				/><br></br>
				<button type="submit" className="submitbtn">
					Sing Up
				</button><br></br>
                <p>Have a account  ?</p>
					<Link to="/">
						<button type="button" className="signupbtn">
							Sing In
						</button>
					</Link>
			</form>
        </div>
    );
};

export default Signup;