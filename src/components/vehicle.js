import React, { useEffect, useState } from 'react';
import "./vehicle.css"
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const Vehicle = () => {
    const [vehicles, setvehicles] = useState([]);
    const [dltpass , setdltpass] = useState("");
    const [dltid, setdltid] = useState("");
    const navigate = useNavigate();

    // for getting all vehicle data 
    const getdata = async () =>{
        var result = await fetch("http://localhost:8080/getall");
        var res = await result.json();
        setvehicles([...res]);
    }

    // for delete perticular vehicle
    const handledelete = (id) => {
        document.getElementById("confdlt").style.visibility = "visible";
        setdltid(id);
        // axios.delete(`http://localhost:8080/delete/${id}`).then(()=>{
        //     getdata();
        // }).catch((err)=>{
        //     console.log(err);
        // })
    }
    const password = "9423782429";
    const passvalidate = (id) =>{
        if(password === dltpass)
        {
            axios.delete(`http://localhost:8080/delete/${id}`).then(()=>{
                getdata();
            }).catch((err)=>{
                console.log(err);
            })
            document.getElementById("confdlt").style.visibility = "hidden";
            setdltpass("");

        }
        else{
            alert("wrong password")
        }
    }

    // for send id of preticular obj to single vehicle page 
    const handleview = (id) => {
        // console.log(id);
        navigate(`/single/${id}`);
    }

    // update existing data 
    const handleupdate = (id) => {
        // console.log(id);
        navigate(`/update/${id}`);
    }

    // for getting password to delete vehicle 
    const getpassword = (e) => {
        const val = e.target.value;
        setdltpass(val);
        
    }

    const handlecancle = () => {
        document.getElementById("confdlt").style.visibility = "hidden";
        setdltpass("");
    }
    useEffect(()=>{
        getdata();
    },[]);
    return (
        <div>
            <table>
                <thead id="heading">
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Company</th>
                        <th>Milage</th>
                        <th>Launchyear</th>
                        <th colSpan={3}>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                    vehicles.map((ele)=>{
                        return(
                            <tr key={ele.id} id="rows">
                                <td>{ele.id}</td>
                                <td>{ele.Name}</td>
                                <td>{ele.Company}</td>
                                <td>{ele.Milage}</td>
                                <td>{ele.Launchyear}</td>
                                <td onClick={()=>handleview(ele.id)} style={{cursor:'pointer'}}>View</td>
                                <td onClick={()=>handleupdate(ele.id)} style={{cursor:'pointer'}}>Update</td>
                                <td onClick={()=>handledelete(ele.id)} style={{cursor:'pointer'}}>Delete</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            <Link to="/newvehicle"><button id="btn">ADD VEHICLE</button></Link>
            <div id="confdlt">
                <p id="ptitle">Enter Password</p>
                <input id ="pinput" type="password" placeholder='password' onChange={getpassword} value={dltpass}></input><br></br>
                <button id="pbtn1" onClick={()=>passvalidate(dltid)}>Submit</button>
                <button id="pbtn2" onClick={handlecancle}>Cancle</button>
            </div>
        </div>
    );
};

export default Vehicle;