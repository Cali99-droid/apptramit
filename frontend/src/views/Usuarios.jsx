import { Backdrop, Button, CircularProgress, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import useSWR from 'swr'
import '../App.css'
import { useState } from 'react';
import UserCreationModal from '../components/UserCreationModal';
import { grey } from '@mui/material/colors';
import clienteAxios from '../config/axios';
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'oficina_id',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];
export default function Usuarios() {
  const [modalOpen, setModalOpen] = useState(false);
  const fetcher = () => clienteAxios('/api/users').then(datos => datos.data)
  const { data, error, isLoading } = useSWR('/api/productos', fetcher, {refreshInterval: 10000})

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };



  
  if(isLoading) return( <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={true}

>
  <CircularProgress color="inherit" />
</Backdrop>)
  return (
    <>
     <Paper elevation={1} sx={{display:'flex', justifyContent:'space-between', padding:2,marginBottom:2, bgcolor:grey[200]}}>
     <Typography variant='h6'>Lista de Usuarios</Typography>
    <Button startIcon={<AddCircleIcon/>} variant='contained' onClick={handleOpenModal}>
         Nuevo
        </Button>
    </Paper>
    <Paper sx={{display:'flex', justifyContent:'center', alignItems:'center',bgcolor:grey[100]}}  elevation={1}>
       <Box sx={{ height: 400, width: '100%' }} padding={4}>
       {/* <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={!isLoading}

>
  <CircularProgress color="inherit" />
</Backdrop> */}
    <DataGrid
    loading={isLoading}
      rows={data.data}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[5]}
      // checkboxSelection
      // disableRowSelectionOnClick
    />
     <UserCreationModal open={modalOpen} onClose={handleCloseModal} />
  </Box>
    </Paper>
   
    </>
    
  )
}
