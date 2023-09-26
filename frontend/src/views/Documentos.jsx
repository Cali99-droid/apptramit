import { Button, Chip, Link, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { blue,  cyan,  grey,  orange } from '@mui/material/colors';
import ReplyIcon from '@mui/icons-material/Reply';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DoneIcon from '@mui/icons-material/Done';
import useSWR from 'swr';
import clienteAxios from '../config/axios';
import * as dayjs from 'dayjs'
import 'dayjs/locale/es' // load on demand
import ModalTracking from '../components/modal/ModalTracking';
import { useState } from 'react';
import ModalDerivar from '../components/modal/ModalDerivar';
dayjs.locale('es')
const download = async(docName)=>{
  // const token = localStorage.getItem("AUTH_TOKEN");
  try {
    const downloadUrl = `http://localhost/api/download/${docName}`;
       // Abre el enlace en una nueva ventana o pestaña
       window.open(downloadUrl, '_blank');
  } catch (error) {
    console.log(error)
  }
}

  


export default function Documentos() {
  const token = localStorage.getItem("AUTH_TOKEN");
  const fetcher = () => clienteAxios('/api/documento',{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(datos => datos.data)
  const { data,isLoading } = useSWR('/api/documento', fetcher, {refreshInterval: 10000})
const [open, setOpen] = useState(false);
const handleCloseTrack = ()=>{
  setOpen(false);
}

const [openDerivar, setOpenDerivar] = useState(false);
const [documentoId, setDocumentoId] = useState()
const handleCloseDerivar = ()=>{
  setOpenDerivar(false);
}

const [oficinas, setOficinas] = useState([])
const handleOpenTracking = (oficinas )=>{

setOficinas(oficinas)
setOpen(true)
}

const handleOpenDerivar=(id)=>{
  setOpenDerivar(true);
  setDocumentoId(id);
}

const columns = [
  {
    field:'id',
    headerName:'ID',
    width:50
  },
  {
    field: 'dir',
    headerName: 'Documento',
    width: 200,
    renderCell: ({ row }) => {
        return (
                <Link underline='always' sx={{cursor:'pointer'}} component={Link} onClick={()=>download(row.dir)}>
                    {row.dir}
                </Link>  
        )
    }
  },
  {
    field: 'dni',
    headerName: 'DNI',
    width: 100,
    editable: true,
  },
  {
    field: 'nombre_interesado',
    headerName: 'Nombre',
    // type: 'number',
    width: 250,
    editable: true,
  },
  {
    field: 'tipo_persona',
    headerName: 'Tipo',
    // type: 'number',
    renderCell: ({row}) => {
    // console.log(row.oficinas)
        if (row.tipo_persona ===1) {
          return (<Chip label={'Natural'} variant='outlined' color='info'/>);
        }
        if (row.tipo_persona ===2) {
          return (<Chip label={'Jurídica'}variant='outlined' color='secondary' />);
        }   
  }
  },
  {
    field: 'asunto',
    headerName: 'Asunto',
    // description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 200,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
   },
   {
    field: 'estado_id',
    headerName: 'Estado',
    // type: 'number',
    width: 110,
    
  },
  {
    field: 'created_at',
    headerName: 'Fecha Registro',
    // type: 'number',
    width: 200,
   
    valueFormatter: (params) => {
     
      return dayjs(params.value).locale('zh-cn').format('DD/MM/YYYY HH:mm:ss A');
    },
  },
  {
    field: 'actions', 
    headerName: 'Acciones', 
    sortable: false,
    type: 'actions',
    width: 110,  getActions: (params) => [
    
      <GridActionsCellItem
      sx={{ color: blue[800] }}
      key={params.row.id}
      icon={<AccountTreeIcon />}
      label="Rastrear"
      onClick={() => { handleOpenTracking(params.row.oficinas) }}
      />,
      <GridActionsCellItem
        sx={{ color: cyan[800] }}
        key={params.row.id}
        icon={<ReplyIcon />}
        label="Derivar"
        disabled={params.row.oficinas.length>1}
         onClick={() => {handleOpenDerivar(params.row.id) }}
      />,
      <GridActionsCellItem
      sx={{ color: orange[800] }}
      key={params.row.id}
      icon={<DoneIcon />}
      label="Atender o Cerrar"
      // onClick={() => { hadleOpenCalificacion(params.row.calificaciones) }}TaskAltIcon
    />,
     
      // <GridActionsCellItem
      //   disabled={params.row.estadoId !== 2 || params.row.puntajeEntr > 0}
      //   key={params.row.id}
      //   icon={<AddTaskIcon />}
      //   label="Entrevistar"
      //   onClick={() => { handleOpenClase(params.row.idPos) }}

      //   showInMenu
      // />
   
    ]

  }
];
  return (
    <>
    <Paper elevation={1} sx={{display:'flex', justifyContent:'space-between', padding:2,marginBottom:2, bgcolor:grey[200]}}>
    <Typography variant='h6'>Lista de Documentos</Typography>
    <Button startIcon={<AddCircleIcon/>} component={Link}
      to="/admin/nuevo">
         Nuevo
        </Button>
    </Paper>
    <Paper sx={{display:'flex', justifyContent:'center', alignItems:'center',bgcolor:grey[100]}}  elevation={1}>
            <Box sx={{ height: 400, width: '100%' }} padding={4}>
            {!isLoading &&(
              <DataGrid
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
                  slots={{ toolbar: GridToolbar }}
                 
                  // disableRowSelectionOnClick
                />
            )}
        
            </Box>
    </Paper>
      <ModalTracking open={open} handleClose={handleCloseTrack} oficinas={oficinas} /> 
      <ModalDerivar open={openDerivar} handleClose={handleCloseDerivar} documentoId={documentoId}/>
    </>
    
  )
}
