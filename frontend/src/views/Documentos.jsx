import { Button, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from 'react-router-dom';
import { blue, cyan,  grey,  orange } from '@mui/material/colors';
import ReplyIcon from '@mui/icons-material/Reply';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DoneIcon from '@mui/icons-material/Done';
const columns = [
  // { field: 'id', headerName: 'ID', width: 50 },
  {
    field: 'codigo',
    headerName: 'Código de Seguimiento',
    width: 200,
    editable: true,
  },
  {
    field: 'dni',
    headerName: 'DNI',
    width: 100,
    editable: true,
  },
  {
    field: 'nombre',
    headerName: 'Nombre',
    // type: 'number',
    width: 200,
    editable: true,
  },
  {
    field: 'documento',
    headerName: 'Documento',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
   },
   {
    field: 'estado',
    headerName: 'Estado',
    // type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fecha',
    headerName: 'Fecha Registro',
    // type: 'number',
    width: 110,
    editable: true,
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
      label="Restrear"
      // onClick={() => { handleOpenMessage(params.row.idCp, params.row.comentario, params.row.fechaComentario, params.row.telefono, params.row.messages) }}
      />,
      <GridActionsCellItem
        sx={{ color: cyan[800] }}
        key={params.row.id}
        icon={<ReplyIcon />}
        label="Derivar"
        // onClick={() => { hadleOpenCalificacion(params.row.calificaciones) }}TaskAltIcon
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
  
  const rows = [
    { id: 1,codigo:'323532',dni:23432343, nombre: 'Snow', documento: 'Jon', estado: 'Revisado', fecha:'2020-04-11' },
    { id: 2,codigo:'323532',dni:23432343, nombre: 'Snow', documento: 'Jon', estado: 'Revisado', fecha:'2020-04-11' },
    { id: 3,codigo:'323532',dni:23432343, nombre: 'Snow', documento: 'Jon', estado: 'Revisado', fecha:'2020-04-11' },
    
  ];

export default function Documentos() {
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
  </Box>
    </Paper>
    
    </>
    
  )
}
