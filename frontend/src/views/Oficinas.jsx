import { Button, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useState } from 'react';
import OfficeModal from '../components/OfficeModal';
import '../App.css'
import { cyan, grey } from '@mui/material/colors';
const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'oficina',
      headerName: 'Oficina',
      width: 800,
      editable: true,
    },{
      field: 'actions', 
      headerName: 'Editar', 
      sortable: false,
      type: 'actions',
      width: 110,  getActions: (params) => [
        
     
        <GridActionsCellItem
          sx={{ color: cyan[800] }}
          key={params.row.id}
          icon={<ModeEditIcon />}
          label="Derivar"
          // onClick={() => { hadleOpenCalificacion(params.row.calificaciones) }}TaskAltIcon
        />
     
    
     
      ]
  
    }
    
   
  ];
  
  const rows = [
    { id: 1, oficina: 'Snow' },
    { id: 2, oficina: 'Lannister' },
    { id: 3, oficina: 'Lannister' },
    { id: 4, oficina: 'Stark'},

  ];

export default function Oficinas() {

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <> 
    <Paper elevation={1} sx={{display:'flex', justifyContent:'space-between', padding:2,marginBottom:2, bgcolor:grey[200]}}>
    <Typography variant='h6'>Lista de Oficinas</Typography>
    <Button startIcon={<AddCircleIcon/>} variant='contained' onClick={handleOpenModal}>
         Nuevo
        </Button>
    </Paper>
    
    <Paper sx={{display:'flex', justifyContent:'center', alignItems:'center',bgcolor:grey[100]}}  elevation={1}>
<Box sx={{ height: 400, width: '100%',bgcolor:grey[50] }} padding={4}>
      <Box display={'flex'} justifyContent={'end'} >
      
        

      </Box>
    <DataGrid
      rows={rows}
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
     <OfficeModal open={modalOpen} onClose={handleCloseModal} />
  </Box>
    </Paper>
    </>
   
    
  )
}
