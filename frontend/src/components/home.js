import { Axios } from 'axios';
import {React,useEffect, useState} from 'react';
import Axiosinstance from './Axios';
import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import { Box, IconButton } from '@mui/material'
import {Link} from 'react-router-dom';


const Home = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const getData = () => {
    Axiosinstance.get('projects/').then((res)=>{
      console.log(res.data)
      setData(res.data)
      setLoading(false)
    })
  }

  
    //should be memoized or stable
    const columns = useMemo(
      () => [
        {
          accessorKey: 'name', //access nested data with dot notation
          header: 'name',
          size: 150,
        },

        {
          accessorKey: 'comment', //normal accessorKey
          header: 'Comments',
          size: 200,
        },

        {
          accessorKey: 'start_date',
          header: 'Start Date',
          size: 150,
        },
        {
          accessorKey: 'end_date',
          header: 'End Date',
          size: 150,
        },
        {
          accessorKey: 'status',
          header: 'Status',
          size: 150,
        }

      ],
      [],
    );
  
    const table = useMaterialReactTable({
      columns,
      data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
      
    });
  
   
  

  useEffect(()=>{
    getData()
  },[])
  
    if(loading){
      return <div>Loading...</div>
    }
    else{
      return (
    <div>
      <MaterialReactTable 
      columns={columns}
      data={data}
      layoutMode="grid"
      displayColumnDefOptions={{
        'mrt-row-actions': {
          size: 180, //if using layoutMode that is not 'semantic', the columns will not auto-size, so you need to set the size manually
          grow: false,
        },
      }}
      enableRowActions
      renderRowActions={({ row, table }) => (
        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
          <IconButton
            color="secondary"
            component={Link} to={`/edit/${row.original.id}`}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            component={Link} to={`/delete/${row.original.id}`}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
       />;
    </div>
      )
    }

};

export default Home;
