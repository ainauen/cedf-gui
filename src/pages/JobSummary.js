import React, {useEffect, useState} from "react";
import ApiService from "../services/ApiService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const JobSummary = () => {
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);
    const [jobs, setJobs]= useState([]);
    const navigate = useNavigate();

    useEffect(() =>{
        if(!user || !['admin','developer','interface'].includes(user.role)){
            navigate('/');
            return;
        }
        // const fetchJobs = async () =>{
        //     try{
        //         const data = await ApiService.get('/jobMonitor', token);
        //         setJobs(data);
        //     } catch {
        //         console.error('failed job fetch')
        //     }
        // };
        // fetchJobs();
    }, [token, user, navigate]);

    return(
        <div className='d-flex justify-content-center align-items-center'>
            <div>
                <h3>Job Summary</h3>
            </div>
        </div>
    );
};

export default JobSummary;