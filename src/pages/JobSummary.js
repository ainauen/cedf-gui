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



        const fetchJobs = async () => {
            try {
                const response = await fetch('/fake_job_summary.json'); 
                const data = await response.json();
              setJobs(data);
            } catch {
              console.error('failed to load job summary');
            }
          };

          fetchJobs();


    }, [token, user, navigate]);

    return (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-6 text-gray-800">Job Monitor - Summary</h1>

    <div className="flex gap-4 mb-6">
      <input className="border rounded p-2 w-48" placeholder="Job Name" />
      <input className="border rounded p-2" type="date" placeholder="Start Date Begin" />
      <input className="border rounded p-2" type="date" placeholder="Start Date End" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Search</button>
      <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">CSV</button>
    </div>

    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 rounded-md shadow-sm text-sm text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="border px-4 py-2">Job Name</th>
            <th className="border px-4 py-2">Executions</th>
            <th className="border px-4 py-2">Start Time</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center text-gray-500 py-6">
                No records found
              </td>
            </tr>
          ) : (
            jobs.map((job, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{job.name}</td>
                <td className="border px-4 py-2">{job.executions}</td>
                <td className="border px-4 py-2">{new Date(job.startTime).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);

};

export default JobSummary;