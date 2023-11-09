import { Backdrop, Button, CircularProgress, FormControl, FormHelperText, Modal, Paper, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, esES } from '@mui/x-data-grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useState } from 'react';

import '../App.css'
import { cyan, grey } from '@mui/material/colors';
import clienteAxios from '../config/axios';
import useSWR from 'swr';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';



export default function Oficinas() {
  const {user} = useAuth({middleware:'auth'});
  console.log(user)
  const token = localStorage.getItem("AUTH_TOKEN");
  const fetcher = () => clienteAxios('/api/oficina',{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(datos => datos.data)
  const { data,isLoading } = useSWR('/api/oficina', fetcher, {refreshInterval: 10000})


  const [officeName, setOfficeName] = useState('');
  const [id, setId] = useState('');
  const [modalOpen, setModalOpen] = useState(false)
  const [error, setError] = useState('');

  const handleClose = () => {
  setModalOpen(false)
    setOfficeName('');
    setError('');
    setId(null)
  };



  const handleSubmit = async() => {
    // Validar el nombre de la oficina 
     const token = localStorage.getItem("AUTH_TOKEN");
    if (officeName.trim() === '') {
      setError('El nombre de la oficina es requerido');
    } else {
      // Realizar acciones cuando el formulario se envíe con éxito
      try {
       
        if(id){
          await clienteAxios.put(`/api/oficina/${id}`,{
            officeName
          },{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        }else{
           await clienteAxios.post('/api/oficina',{
          officeName
        },{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        }
        
       
        handleClose();
        toast.success('Guardado Correctamente')
      } catch (error) {
        console.log(error)
      }

     
     
    }
  };

const handleOpenModal = ()=>{
setModalOpen(true)
}
const handleEdit = (id,nombre)=>{
  setModalOpen(true)
  setOfficeName(nombre);
  setId(id)

  }




  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'nombre',
      headerName: 'Oficina',
      width: 400,
     
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
          label="Editar"
           onClick={() => { handleEdit(params.row.id, params.row.nombre) }}
        />
     
      ]
  
    }
    
   
  ];
  if(isLoading) return( <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={true}
  
  >
    <CircularProgress color="inherit" />
  </Backdrop>)
  return (
    <> 
    <Paper elevation={1} sx={{display:'flex', justifyContent:'space-between', padding:2,marginBottom:2, bgcolor:grey[200]}}>
    <Typography variant='h6'>Lista de Oficinas</Typography>
    <Button startIcon={<AddCircleIcon/>} variant='contained' onClick={handleOpenModal}>
         Nuevo
        </Button>
    </Paper>
    
    <Paper sx={{display:'flex', justifyContent:'center', alignItems:'center',bgcolor:grey[100]}}  elevation={1}>
<Box sx={{ height: 500, width: 'auto',bgcolor:grey[50] }} padding={4}>
      <Box display={'flex'} justifyContent={'end'} >
      
        

      </Box>
    <DataGrid
    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
      rows={data.data}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
     
      pageSizeOptions={[10]}
      // checkboxSelection
      // disableRowSelectionOnClick
    />
   
  </Box>
    </Paper>
    <Modal open={modalOpen} onClose={handleClose}>
      <div className="modal-container flex flex-col justify-center items-center gap-3" >
        <h2 className='font-bold'>Agregar Oficina</h2>
      
        <FormControl fullWidth>
          <TextField
            label="Nombre de Oficina"
            variant="outlined"
            value={officeName}
            onChange={(e) => setOfficeName(e.target.value)}
            error={error !== ''}
          />
          <FormHelperText error>{error}</FormHelperText>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Guardar
        </Button>
      </div>
    </Modal>
    </>
   
    
  )
}
