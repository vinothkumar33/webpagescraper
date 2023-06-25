import './App.css';
import './style.css'
import { useState} from 'react';
import axios from 'axios';
import { TextField } from '@mui/material';
import { Button} from '@mui/material';

import DataTable from './datatable';


function App() {
   const [url,setUrl]=useState("");
   
  const options = {
    headers: {
      "Content-Type": "application/json",
      "Accept":"application/json",
    }
  }
   const handleClick=async()=>{
    await axios.post("http://localhost:4000/url",{
      url:url
    },options)
    .then(data =>{console.log(data);})
   }
   

  return (
    <>
      <div className='text-field'>
        <h1>Webpage Scraper</h1>
           <TextField label="URL" placeholder='Enter your URL' type='text' fullWidth value={url} onChange={(e)=>{setUrl(e.target.value)}}  />
      </div>
      <div className='text-field'>
        <Button variant="outlined" onClick={handleClick}  >Get insights</Button>
      </div>
      <DataTable />
    </>
  );
}

export default App;
