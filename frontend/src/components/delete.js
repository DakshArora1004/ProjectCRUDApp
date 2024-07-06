import {React, useState, useEffect} from 'react'
import { Box, Button, Typography } from '@mui/material';
import MyTextField from './forms/MyTextField';
import MyMultiLineField from './forms/MyMultilineField';
import MySelectField from './forms/MySelectField';
import MyDatePickerField from './forms/MyDatePickerField';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { Axios } from 'axios';
import Axiosinstance from './Axios';
import {Navigate, useNavigate, useParams} from 'react-router-dom';


const Delete = () => {
  const navigate = useNavigate();
  const Params = useParams();
  const id = Params.id;
  const defaultValues = {
    name: '',
    comment: '',
    status: {id:1, name:'Active'}
  }
  const {handleSubmit, control, reset, setValue} = useForm({defaultValues: defaultValues});
  const submission = () => {
    Axiosinstance.delete(`projects/${id}/`)
    .then((res) =>{
      navigate(`/`)
    })
  }
  const [loading, setLoading] = useState(true)
  const getData = () => {
    Axiosinstance.get('projects/').then((res)=>{

      setLoading(false)
    })
  }
  useEffect(()=>{
    Axiosinstance.get(`projects/${id}/`).then((res)=>{
      console.log(res.data)
      setValue('name', res.data.name)
      setValue('comment', res.data.comment)
      setValue('status', res.data.status)
      setValue('start_date', dayjs(res.data.start_date))
      setValue('end_date', dayjs(res.data.end_date))
    })
  },[])


  return (
    <form onSubmit={handleSubmit(submission)}>
    <Box>
      <Box sx={{display:'flex', width:"100%", backgroundColor: 'black', marginBottom:'10px'}}>
        <Typography  sx={{color:'white', margin:'auto'}}>DELETE</Typography>
      </Box>

      <Box sx={{display:'flex', width:"100%", boxShadow:3, padding:4, flexDirection:'column'}}>
      <Box sx={{display:'flex', justifyContent: 'space-evenly'}}><MyTextField width='30%' label="Project Name" name="name" control={control} placeholder="Please Provide Project Name">  
      </MyTextField>
      
      <MyDatePickerField width='30%' label="Start Date" name="start_date" control={control} />
      <MyDatePickerField width='30%' label="End Date" name="end_date" control={control} /></Box>

      <Box sx={{display:'flex', justifyContent: 'space-evenly'}}>
        <MyMultiLineField width='30%' label="Comment" name="comment" control={control} placeholder="Please Comment"></MyMultiLineField>
        <MySelectField width='30%' label="Status" name="status" control={control} options={[{id:1, name:'Active'},{id:2, name:'Inactive'}]}></MySelectField>
        <Box sx={{width:'30%'}}>
          <Button sx={{width:'100%'}} type="submit" variant="contained" color="primary">Delete</Button>
        </Box>
      </Box>
      </Box>
      </Box>
      </form>
    
  )
}

export default Delete;