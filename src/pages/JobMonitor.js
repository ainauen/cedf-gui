import React, {useEffect, useState} from "react";
import ApiService from "../services/ApiService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Table, InputGroup } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const JobMonitor = () => {
    const [tableTheme, setTableTheme] = useState('light');
    const [dropdownTitle, setDropdownTitle] = useState('Status');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
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
              const response = await fetch('/fake_json_files/fake_jobs.json'); 
              const data = await response.json();
              setJobs(data);
            } catch {
              console.error('failed to load local job data');
            }
          };



        fetchJobs();
    }, [token, user, navigate]);

    const changeTheme = () =>{
      if (tableTheme === 'light') {
        setTableTheme('dark');
      } else {
        setTableTheme('light');


      }
    }

    const handleChangeEndDate = (date, event) =>{
      setEndDate(date)
    }

    const handleCSVButtonClick = () =>{
      console.log("did something");
    }

    return (
        <div className=' justify-content-center align-items-center'>
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Job Monitor</h2>
      
          {/* Filter Inputs (Optional enhancement: useState to track values) */}
          <div className='d-flex'>
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-sm" >Job Name</InputGroup.Text>
              <Form.Control
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm" className='me-2'
                style={{borderColor:'black'}}
              />

              <DropdownButton
                variant="outline-secondary"
                title={dropdownTitle}
                id="input-group-dropdown-1"
                className='me-2'
              >
                <Dropdown.Item href="#">C</Dropdown.Item>
                <Dropdown.Item href="#">E</Dropdown.Item>
                <Dropdown.Item href="#">N</Dropdown.Item>
                <Dropdown.Item href="#">P</Dropdown.Item>
                <Dropdown.Item href="#">S</Dropdown.Item>

              </DropdownButton>

              <InputGroup.Text id="inputGroup-sizing-sm" className='ms-2' >Start Date Begin</InputGroup.Text>
              <DatePicker
                    selected={startDate}
                    onChange={handleChangeEndDate}
                    className='me-2'
                  />

              <InputGroup.Text id="inputGroup-sizing-sm" >Start Date End</InputGroup.Text>
              <DatePicker
                selected={endDate}
                onChange={handleChangeEndDate}
                className='me-2'
              />
              </InputGroup>
            <Button onClick={changeTheme} size='sm' variant='danger' style={{height:'30px'}}  className='me-2'>Search</Button>
            <Button onClick={handleCSVButtonClick} size='sm' variant='danger' style={{height:'30px'}} >CVS</Button>
          </div>
      
          {/* Job Data Table */}
          <div className="overflow-x-auto">
            <Table striped shadow-lg bordered hover className='min-vw-90 shadow' variant={tableTheme}> 
              <thead>
                <tr>
                  {[
                    "Job Name", "Start Time", "Job ID", "Status",
                    "Complete Time", "Load", "Fail", "Warning", "Error", "File Name"
                  ].map((col) => (
                    <th key={col} style={{fontSize:'small'}}>{col}</th>
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
                    <tr key={index} >
                      <td >{job.name}</td>
                      <td >{job.startTime}</td>
                      <td >{job.jobId}</td>
                      <td >{job.status}</td>
                      <td >{job.completeTime}</td>
                      <td >{job.load}</td>
                      <td >{job.fail}</td>
                      <td >{job.warning}</td>
                      <td >{job.error}</td>
                      <td >{job.fileName}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
            <Button onClick={changeTheme} size='sm' variant='danger' style={{float: 'right'}}>Table Theme</Button>

          </div>
        </div>
      );
      
};

export default JobMonitor;