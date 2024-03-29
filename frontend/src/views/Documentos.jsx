/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardContent,
  Chip,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar,
  esES,
} from "@mui/x-data-grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { blue, cyan, grey, orange } from "@mui/material/colors";
import ReplyIcon from "@mui/icons-material/Reply";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DoneIcon from "@mui/icons-material/Done";
import useSWR from "swr";
import clienteAxios from "../config/axios";
import dayjs from "dayjs";
import "dayjs/locale/es"; // load on demand
import ModalTracking from "../components/modal/ModalTracking";
import { useEffect, useState } from "react";
import ModalDerivar from "../components/modal/ModalDerivar";
import { useAuth } from "../hooks/useAuth";
// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'
import ModalCerrar from "../components/modal/ModalCerrar";
const api = import.meta.env.VITE_API_URL;
dayjs.locale("es");
// const MySwal = withReactContent(Swal);
const download = async (docName) => {
  // const token = localStorage.getItem("AUTH_TOKEN");
  try {
    const downloadUrl = `${api}/api/download/${docName}`;
    // Abre el enlace en una nueva ventana o pestaña
    window.open(downloadUrl, "_blank");
  } catch (error) {
    console.log(error);
  }
};

export default function Documentos() {
  const { user } = useAuth({ middleware: "auth" });

  const token = localStorage.getItem("AUTH_TOKEN");
  const fetcher = () =>
    clienteAxios("/api/documento", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((datos) => datos?.data);
  const { data, isLoading } = useSWR("/api/documento", fetcher, {
    refreshInterval: 60000,
  });

  // if(!isLoading){
  //   const rows = data.data.filter(doc=>{
  //    const res= doc.oficinas.filter(ofi=>ofi.id === user?.oficina_id);
  //     if(res.length>0){
  //       return doc;
  //     }
  //   })
  // console.log(rows)
  // }
  const isAnother = (data) => {
    const rows = data.filter((doc) => {
      const res = doc.oficinas.filter((ofi) => ofi.id === user?.oficina_id);
      if (res.length > 0) {
        return doc;
      }
    });

    return rows;
  };
  const [open, setOpen] = useState(false);
  const handleCloseTrack = () => {
    setOpen(false);
  };

  const [openDerivar, setOpenDerivar] = useState(false);
  const [documentoId, setDocumentoId] = useState();
  const [oficinaOrigenId, setOficinaOrigenId] = useState();
  const handleCloseDerivar = () => {
    setOpenDerivar(false);
  };

  const [oficinas, setOficinas] = useState([]);
  const handleOpenTracking = (oficinas) => {
    setOficinas(oficinas);
    setOpen(true);
  };

  const handleOpenDerivar = (id, oficinas) => {
    setOficinaOrigenId(oficinas[oficinas.length - 1]);
    setOpenDerivar(true);
    setDocumentoId(id);
  };
  const CustomChip = ({ oficinas }) => {
    const oficinaAct = oficinas.filter((o) => o.id == user?.oficina_id).shift();
    const estado = oficinaAct?.pivot.estado_id;
    switch (estado) {
      case 1:
        return <Chip label="Recibido" color="info" />;
      case 2:
        return <Chip label="Revisado" color="success" />;
      case 3:
        return <Chip label="Derivado" color="error" />;
      case 4:
        return <Chip label="Observado" color="error" />;
      case 5:
        return <Chip label="Atendido" color="success" />;
      default:
        break;
    }
  };

  const [openClose, setOpenClose] = useState(false);
  const [oficinaAct, setOficinaAct] = useState({});

  const handleCloseClose = () => {
    setOpenClose(false);
  };
  const handleOpenClose = (oficinas) => {
    const oficinaAct = [...oficinas].pop();
    setOficinaAct(oficinaAct);
    setOpenClose(true);
  };

  const activeButton = (oficinas) => {
    const oficinaAct = oficinas.filter((o) => o.id == user?.oficina_id).shift();
    if (
      oficinaAct?.pivot.estado_id === 5 ||
      oficinaAct?.pivot.estado_id === 3
    ) {
      return true;
    } else {
      return false;
    }
  };
  const getEstado = (oficinas) => {
    const oficinaAct = oficinas.filter((o) => o.id == user?.oficina_id).shift();
    const estado = oficinaAct?.pivot.estado_id;
    switch (estado) {
      case 1:
        return "Recibido";
      case 2:
        return "Revisado";
      case 3:
        return "Derivado";
      case 4:
        return "Observado";
      case 5:
        return "Atendido";
      default:
        break;
    }
  };
  // const [historyId, setHistoryId] = useState();
  // const handleFin = (oficinas)=>{
  //   const oficinaAct = [...oficinas].pop();

  //   // setHistoryId(oficinaAct?.pivot.id);
  // console.log(oficinaAct?.pivot.id)
  //   MySwal.fire({
  //     title: 'Esta seguro de marcar como antendido el documento?',
  //     showDenyButton: true,
  //     showCancelButton: true,
  //     confirmButtonText: 'Si',
  //     denyButtonText: `No`,
  //   }).then((result) => {

  //     /* Read more about isConfirmed, isDenied below */
  //     if (result.isConfirmed) {
  //       handleCerrar(oficinaAct?.pivot.id)
  //       Swal.fire('Saved!', '', 'success')
  //     } else if (result.isDenied) {
  //       Swal.fire('Changes are not saved', '', 'info')
  //     }
  //   })
  // }
  // const handleCerrar =async(id)=>{

  //    const token = localStorage.getItem("AUTH_TOKEN");

  //      // Realizar acciones cuando el formulario se envíe con éxito
  //      try {
  //        await clienteAxios.put(`/api/history/${id}`,{
  //            documentoId,id

  //        },{
  //          headers: {
  //            Authorization: `Bearer ${token}`,
  //          },
  //        })

  //        alert('creado correcamente')

  //      } catch (error) {
  //        console.log(error)

  //    }

  // }

  const renderStatus = ({ row }) => {
    return <CustomChip oficinas={row.oficinas} />;
  };

  const columns = [
    {
      field: "id",
      headerName: "N°",
      width: 50,
    },
    {
      field: "dir",
      headerName: "Documento",
      width: 200,
      renderCell: ({ row }) => {
        return (
          <Link
            underline="always"
            sx={{ cursor: "pointer" }}
            component={Link}
            onClick={() => download(row.dir)}
          >
            {row.dir}
          </Link>
        );
      },
    },

    {
      field: "code",
      headerName: "Código",
      width: 100,
    },
    {
      field: "tipo",
      headerName: "Tipo",
      width: 100,
    },
    {
      field: "folios",
      headerName: "N° Folios",
      width: 100,
    },
    {
      field: "dni",
      headerName: "DNI",
      width: 100,
    },
    {
      field: "nombre_interesado",
      headerName: "Nombre",
      // type: 'number',
      width: 250,
    },
    {
      field: "telefono",
      headerName: "Telefono",
      // type: 'number',
      width: 150,
    },
    {
      field: "email",
      headerName: "Correo",
      // type: 'number',
      width: 150,
    },

    {
      field: "direccion",
      headerName: "Dirección",
      // type: 'number',
      width: 150,
    },
    {
      field: "tipo_persona",
      headerName: "Tipo",
      // type: 'number',
      renderCell: ({ row }) => {
        // console.log(row.oficinas)
        if (row.tipo_persona === 1) {
          return <Chip label={"Natural"} variant="outlined" color="info" />;
        }
        if (row.tipo_persona === 2) {
          return (
            <Chip label={"Jurídica"} variant="outlined" color="secondary" />
          );
        }
      },
    },
    {
      field: "companyName",
      headerName: "Razón Social",
      // description: 'This column has a value getter and is not sortable.',
      sortable: true,
      width: 200,
      //   valueGetter: (params) =>
      //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: "ruc",
      headerName: "RUC",
      // description: 'This column has a value getter and is not sortable.',
      sortable: true,
      width: 200,
      //   valueGetter: (params) =>
      //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: "asunto",
      headerName: "Asunto",
      // description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 200,
      //   valueGetter: (params) =>
      //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: "estado_id",
      headerName: "Estado",
      type: "string",
      width: 110,
      valueGetter: ({ row }) => {
        return getEstado(row.oficinas);
      },
      renderCell: renderStatus,
    },
    {
      field: "created_at",
      headerName: "Fecha Registro",
      type: "date",
      width: 200,

      valueFormatter: (params) => {
        return dayjs(params.value).format("DD/MM/YYYY hh:mm");
      },
    },
    {
      field: "actions",
      headerName: "Acciones",
      sortable: false,
      type: "actions",
      width: 110,
      getActions: (params) => [
        <GridActionsCellItem
          sx={{ color: blue[800] }}
          key={params.row.id}
          icon={<AccountTreeIcon />}
          label="Rastrear"
          onClick={() => {
            handleOpenTracking(params.row.oficinas);
          }}
        />,
        <GridActionsCellItem
          sx={{ color: cyan[800] }}
          key={params.row.id}
          icon={<ReplyIcon />}
          label="Derivar"
          disabled={activeButton(params.row.oficinas)}
          onClick={() => {
            handleOpenDerivar(params.row.id, params.row.oficinas);
          }}
        />,
        <GridActionsCellItem
          sx={{ color: orange[800] }}
          key={params.row.id}
          icon={<DoneIcon />}
          label="Atender o Cerrar"
          disabled={activeButton(params.row.oficinas)}
          onClick={() => {
            handleOpenClose(params.row.oficinas);
          }}
        />,

        // <GridActionsCellItem
        //   disabled={params.row.estadoId !== 2 || params.row.puntajeEntr > 0}
        //   key={params.row.id}
        //   icon={<AddTaskIcon />}
        //   label="Entrevistar"
        //   onClick={() => { handleOpenClase(params.row.idPos) }}

        //   showInMenu
        // />
      ],
    },
  ];

  const [contador, setContador] = useState(60);

  useEffect(() => {
    if (contador >= 0) {
      const temporizador = setTimeout(() => {
        setContador(contador - 1);
      }, 1000);
      return () => clearTimeout(temporizador);
    } else {
      setContador(60);
    }
  }, [contador]);

  let rows = [];
  if (!isLoading) {
    rows = user?.oficina_id === 1 ? data.data : isAnother(data?.data);
  }

  // if(isLoading) return( <Backdrop
  //   sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  //   open={true}

  // >
  //   <CircularProgress color="inherit" />
  // </Backdrop>)

  return (
    <>
      <Box mb={2}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Actualizando en {contador} segundos
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Los documentos enviados a la oficina se actualizarán cada 60
              segundos
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Paper
        elevation={1}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: 2,
          marginBottom: 2,
          bgcolor: grey[200],
        }}
      >
        <Typography variant="h6">Lista de Documentos</Typography>
        <Button
          startIcon={<AddCircleIcon />}
          component={Link}
          to="/admin/nuevo"
        >
          Nuevo
        </Button>
      </Paper>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: grey[100],
        }}
        width={"100%"}
        elevation={1}
      >
        <Box sx={{ height: 500, maxWidth: { xs: 200, md: 1400 } }} padding={2}>
          <DataGrid
            loading={isLoading}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
              columns: {
                columnVisibilityModel: {
                  telefono: false,
                  dni: false,
                  direccion: false,
                  asunto: false,
                  folios: false,
                  email: false,
                  code: false,
                  ruc: false,
                  companyName: false,
                },
              },
            }}
            pageSizeOptions={[5, 10, 25, 50]}
            slots={{ toolbar: GridToolbar }}

            // disableRowSelectionOnClick
          />
        </Box>
      </Paper>
      <ModalTracking
        open={open}
        handleClose={handleCloseTrack}
        oficinas={oficinas}
      />
      <ModalDerivar
        open={openDerivar}
        handleClose={handleCloseDerivar}
        documentoId={documentoId}
        oficinaOrigenId={oficinaOrigenId}
      />
      <ModalCerrar
        open={openClose}
        handleClose={handleCloseClose}
        oficina={oficinaAct}
      ></ModalCerrar>
    </>
  );
}
