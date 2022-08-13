import { useEffect, useState } from "react";
import React from 'react';
import "./addvehicle.css";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";


const Addvehicle = () => {

    const [data, setdata] = useState({
		Name: "",
		Company: "",
		Milage: "",
		Launchyear: "",
	});
    // const [update, setUpdate] = useState('');
    const [reg , setreg] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();


    const handleChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setdata({...data,[name]:value })
        // console.log(data)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(id){
            if(id){
                axios.put(`http://localhost:8080/update/${id}`, data)
                .then(res => {
                    navigate("/allvehicle");
                //   setUpdate(res.data)
                }).catch(err => {
                    throw err;
                }).finally(() => {
                  setdata({
                    Name: '',
                    Company: '',
                    Milage: '',
                    Launchyear: ''
                  })
                }
                )
              }
        }
        else{
            axios.post('http://localhost:8080/addvehicle', data).then(res => {navigate("/allvehicle");
            }).catch(err => { 
                                throw err;
                            }
                    ).finally(() => {
                        setdata({
                            Name: '',
                            Company: '',
                            Milage: '',
                            Launchyear: ''
                        })
                        }
                    )
        }

    }

    const getexistdata = async () => {
        var data = await fetch(`http://localhost:8080/singlevehicle/${id}`);
        var result = await (data.json());
        setreg(result);
    }

    useEffect(()=>{
        getexistdata();
    },[])
    return (
        <div>
            <form className="signupform" onSubmit={handleSubmit}>
				<h1 id="top">ADD VEHICLE</h1>
				<input
					type="text"
					placeholder= {reg[0]?.Name || "Vehicle Name"}
					name="Name"
					onChange={handleChange}
					value={data.Name || ""}
					required
					className="signupinputs"
				/><br></br>
				<input
					type="text"
                    placeholder={reg[0]?.Company || "Company Name"}
					name="Company"
					onChange={handleChange}
					value={data.Company || ""}
					required
					className="signupinputs"
				/><br></br>
				<input
					type="text"
					placeholder={reg[0]?.Milage || "Enter Milage"}
					name="Milage"
					onChange={handleChange}
					value={data.Milage || ""}
					required
					className="signupinputs"
				/><br></br>
				<input
                	type="text"
					placeholder={reg[0]?.Launchyear || "Launch Year"}
					name="Launchyear"
					onChange={handleChange}
					value={data.Launchyear || ""}
					required
                    className="signupinputs"
				/><br></br>
				<button type="submit" className="submitbtn">
					ADD
				</button>
			</form>
        </div>
    );
};

export default Addvehicle;