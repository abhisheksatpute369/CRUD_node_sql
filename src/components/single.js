import React, { useEffect, useState } from 'react';
import { useParams,useNavigate} from 'react-router-dom';
import "./single.css";

const Single = () => {

    const [vehicle, setvehicle] = useState([]);
    const {id} = useParams()
    const navigate = useNavigate();
    
    const getsingle = async ()=>{
        var data = await fetch(`http://localhost:8080/singlevehicle/${id}`);
        var result = await (data.json());
        setvehicle(result);
    }

    const handleupdate = (id) => {
        // console.log(id);
        navigate(`/update/${id}`);
    }
    useEffect(()=>{
        getsingle();
    },[])
    return (
        <div>
        <div id="main">
            <div id="vehiclename">
                <p id="">{vehicle[0]?.Name}</p>
            </div>
            <div id="vehicleinfo">
                <div id="title">
                    <p className='titles'>Company</p>
                    <p className='titles'>Milage</p>
                    <p className='titles'>Launchyear</p>
                </div>
                <div id="info">
                    <p className='titles'>{vehicle[0]?.Company}</p>
                    <p className='titles'>{vehicle[0]?.Milage}</p>
                    <p className='titles'>{vehicle[0]?.Launchyear}</p>
                </div>
            </div>
        </div>
        <button id="singleupdate" className='submitbtn' onClick={()=>handleupdate(id)}>Update</button>
        </div>
    );
};

export default Single;