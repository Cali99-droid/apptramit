import { Backdrop, Button, CircularProgress, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import useSWR from 'swr'
import '../App.css'
import { useState } from 'react';
import UserCreationModal from '../components/UserCreationModal';
import { cyan, grey } from '@mui/material/colors';
import clienteAxios from '../config/axios';
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Nombres',
    width: 150,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Correo',
    width: 150,
    editable: true,
  },
  {
    field: 'oficina',
    headerName: 'Oficina',
    type: 'number',
    width: 200,

    valueGetter: (params) =>
      params.row.oficina.nombre 
  }
  ,{
    field: 'actions', 
    headerName: 'Editar', 
    sortable: false,
    type: 'actions',
    width: 110,  getActions: (params) => [
      
   
      <GridActionsCellItem
        sx={{ color: cyan[800] }}
        key={params.row.id}
        icon={<ModeEditIcon />}
        label="Editar"
        //  onClick={() => { handleEdit(params.row.id, params.row.nombre) }}
      />
   
    ]

  }
 
];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];
export default function Usuarios() {
  const token = localStorage.getItem("AUTH_TOKEN");
  const [modalOpen, setModalOpen] = useState(false);
  const fetcher = () => clienteAxios('/api/users',{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(datos => datos.data)
  const { data,  isLoading } = useSWR('/api/users', fetcher, {refreshInterval: 10000})
//error,
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
