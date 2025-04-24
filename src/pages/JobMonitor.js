import React, {useEffect, useState} from "react";
import ApiService from "../services/ApiService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const JobMonitor = () => {
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
        //         //const data = await ApiService.get('/jobMonitor', token);
        //         const data = 
        //         setJobs(data);
        //     } catch {
        //         console.error('failed job fetch')
        //     }
        // };


        const fetchJobs = async () => {
            try {
              const response = await fetch('/fake_jobs.json'); 
              const data = await response.json();
              setJobs(data);
            } catch {
              console.error('failed to load local job data');
            }
          };



        fetchJobs();
    }, [token, user, navigate]);

    return (
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Job Monitor</h1>
      
          {/* Filter Inputs (Optional enhancement: useState to track values) */}
          <div className="flex flex-wrap gap-4 mb-6">
            <input className="border rounded p-2 w-48" placeholder="Job Name" />
            <input className="border rounded p-2 w-32" placeholder="Status" />
            <input className="border rounded p-2" type="date" />
            <input className="border rounded p-2" type="date" />
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Search</button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">CSV</button>
          </div>
      
          {/* Job Data Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    "Job Name", "Start Time", "Job ID", "Status",
                    "Complete Time", "Load", "Fail", "Warning", "Error", "File Name"
                  ].map((col) => (
                    <th key={col} className="border px-4 py-2 text-left text-sm text-gray-700">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {jobs.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="text-center text-gray-500 py-6">No records found</td>
                  </tr>
                ) : (
                  jobs.map((job, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{job.name}</td>
                      <td className="border px-4 py-2">{job.startTime}</td>
                      <td className="border px-4 py-2">{job.jobId}</td>
                      <td className="border px-4 py-2">{job.status}</td>
                      <td className="border px-4 py-2">{job.completeTime}</td>
                      <td className="border px-4 py-2">{job.load}</td>
                      <td className="border px-4 py-2">{job.fail}</td>
                      <td className="border px-4 py-2">{job.warning}</td>
                      <td className="border px-4 py-2">{job.error}</td>
                      <td className="border px-4 py-2">{job.fileName}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
      
};

export default JobMonitor;