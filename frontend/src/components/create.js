import React from 'react'
import { Box, Button, Typography } from '@mui/material';
import MyTextField from './forms/MyTextField';
import MyMultiLineField from './forms/MyMultilineField';
import MySelectField from './forms/MySelectField';
import MyDatePickerField from './forms/MyDatePickerField';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { Axios } from 'axios';
import Axiosinstance from './Axios';
import {Navigate, useNavigate} from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate();
  const defaultValues = {
    name: '',
    comment: '',
    status: {id:1, name:'Active'}
  }
  const {handleSubmit, control, reset, setValue} = useForm({defaultValues: defaultValues});
  const hardcoded_options = [
    {id:'', name:'None'}, 
    {id:'Open', name:'Open'}, 
    {id:'In progress', name:'In progress'}, 
    {id:'Completed', name:'Completed'}, 
  ]
  const submission = (data) => {
    const startDate= dayjs(data.start_date["$d"]).format('YYYY-MM-DD');
    const endDate= dayjs(data.end_date["$d"]).format('YYYY-MM-DD');
    Axiosinstance.post('projects/', {name: data.name, start_date: startDate, end_date: endDate, comment: data.comment, status: data.status})
    .then((res) =>{
      navigate(`/`)
    })
  }

  return (
    <form onSubmit={handleSubmit(submission)}>
    <Box>
      <Box sx={{display:'flex', width:"100%", backgroundColor: 'black', marginBottom:'10px'}}>
        <Typography  sx={{color:'white', margin:'auto'}}>Create</Typography>
      </Box>

      <Box sx={{display:'flex', width:"100%", boxShadow:3, padding:4, flexDirection:'column'}}>
      <Box sx={{display:'flex', justifyContent: 'space-evenly'}}><MyTextField width='30%' label="Project Name" name="name" control={control} placeholder="Please Provide Project Name">  
      </MyTextField>
      
      <MyDatePickerField width='30%' label="Start Date" name="start_date" control={control} />
      <MyDatePickerField width='30%' label="End Date" name="end_date" control={control} /></Box>

      <Box sx={{display:'flex', justifyContent: 'space-evenly'}}>
        <MyMultiLineField width='30%' label="Comment" name="comment" control={control} placeholder="Please Comment"></MyMultiLineField>
        <MySelectField
                label="Status"
                name="status"
                control={control}
                width={'30%'}
                options = {hardcoded_options}
              />
        <Box sx={{width:'30%'}}>
          <Button sx={{width:'100%'}} type="submit" variant="contained" color="primary">Submit</Button>
        </Box>
      </Box>
      </Box>
      </Box>
      </form>
    
  )
}

export default Create;