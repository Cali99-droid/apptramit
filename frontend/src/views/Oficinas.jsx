import {Button,  FormControl, FormHelperText, Modal, Paper, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, esES } from '@mui/x-data-grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useState,useEffect } from 'react';

import '../App.css'
import { cyan, grey } from '@mui/material/colors';
import clienteAxios from '../config/axios';
// import useSWR from 'swr';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';



export default function Oficinas() {
  const {user} = useAuth({middleware:'auth'});

const [datos, setDatos] = useState([]);
  const token = localStorage.getItem("AUTH_TOKEN");
  // const fetcher = () => clienteAxios('/api/oficina',{
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // }).then(datos => datos.data)
  // const { data,isLoading } = useSWR('/api/oficina', fetcher, {refreshInterval: 1000})


  useEffect(() => {
    clienteAxios('/api/oficina',{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setDatos(response.data.data);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          const respuesta = await clienteAxios.put(`/api/oficina/${id}`,{
            officeName
          },{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          const ofi = respuesta.data.oficina;
          const newData = datos.map(d=>{
            if(d.id==ofi.id){
              d.nombre = ofi.nombre
            }
            return d;
          })
          console.log(newData)
           setDatos(newData)
          console.log(respuesta)

        }else{
         const respuesta =  await clienteAxios.post('/api/oficina',{
          officeName
        },{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log(respuesta.data.oficina)
        setDatos([...datos,respuesta.data.oficina ])
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
console.log(id)
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
  // if(datos.length<=0) return( <Backdrop
  //   sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  //   open={true}

  // >
  //   <CircularProgress color="inherit" />
  // </Backdrop>)
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
      rows={datos}
      columns={columns}
      loading={datos.length<=0}

  
      // checkboxSelection
      // disableRowSelectionOnClick
    />
    <Box display={'flex'} justifyContent={'end'} padding={1}>
      <Typography size={8} >{user?.name}</Typography>
    </Box>

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
