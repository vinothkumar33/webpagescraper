import axios from 'axios';
import { useState,useEffect } from 'react';

import { Button} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';

function DataTable(){
  const [data,setData]=useState();
  useEffect(()=>{
    axios.get("http://localhost:4000/getdata")
    .then(res=>{
      setData(res.data.data)  
    })
 })

 const options = {
  headers: {
    "Content-Type": "application/json",
    "Accept":"application/json",
  }
}

const addFavourite=async(_id,favourite)=>{
  const id=_id;
  const isfavourite=!favourite;
  await axios.post("http://localhost:4000/addfavourite",{
    id:id,
    favourite:isfavourite
  },options)
  .then(res =>{console.log(res.data.message);})
 }

 const deleteUrl=async(_id)=>{
  let id=_id;
  await axios.post("http://localhost:4000/deleteurl",{
    id:id
  },options)
  .then(res =>{console.log(res.data.message);})
 }

 return(
    <>
      <div className='text-field'>
       <TableContainer component={Paper}>
          <Table aria-label="simple table">
             <TableHead>
               <TableRow>
                  <TableCell align="center">S.No</TableCell>
                  <TableCell align="center">URL</TableCell>
                  <TableCell align="center">WordCount</TableCell>
                  <TableCell align="center">Favourite</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
             </TableHead>
             <TableBody>
                {data?<>{data.map((item,index) => (
                   <TableRow key={index+1}>
                     <TableCell align="center" component="th" scope="row">{index+1}</TableCell>
                     <TableCell align="center"><a href={item.url}>{item.url}</a></TableCell>
                     <TableCell align="center">{item.wordcount}</TableCell>
                     <TableCell align="center">{item.favourite ?<p>True</p>:<p>False</p>}</TableCell>
                     <TableCell align="center">
                         {item.favourite
                           ?<Button variant="text" color="error" onClick={()=>{addFavourite(item._id,item.favourite)}}><FavoriteIcon /></Button>
                           :<Button variant="text" color="error" onClick={()=>{addFavourite(item._id,item.favourite)}}><FavoriteBorderOutlinedIcon  /></Button>}
                         <Button  variant="text" onClick={()=>{deleteUrl(item._id)}}><HighlightOffOutlinedIcon /></Button>
                      </TableCell>

                    </TableRow>
                    ))}</>:<><h1>NO data</h1></>}
               </TableBody>
             </Table>
         </TableContainer>
      </div>

    </>
 )
}

export default DataTable;