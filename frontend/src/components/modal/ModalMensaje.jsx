/* eslint-disable react/prop-types */
import {  Box, Button,  Dialog, DialogActions, DialogContent, DialogTitle,  IconButton,  Typography} from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import SaveIcon from '@mui/icons-material/Save';

import 'react-toastify/dist/ReactToastify.css';






const ModalMensaje = ({handleClose,open,name,code}) => {
 
    // const {user} = useAuth({middleware:'auth'});
    // const token = localStorage.getItem("AUTH_TOKEN");


    const handlePrint = () => {
        window.print();
      };

  return (
    <Dialog open={open} onClose={handleClose} >

            <DialogTitle>Código de Formulario: {new Date().getFullYear()}-{code}</DialogTitle>
            <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <GridCloseIcon />
        </IconButton>
            <DialogContent  dividers>
            
           
            
            <Box   display={'flex'} flexDirection={'column'} alignItems={'center'}>
              
               
            <Box  >
                   <img src="img/escudo.jpg" alt="" width={50} />  
            </Box>
            <Typography textAlign={'right'} fontSize={16}>
                Municipalidad Distrital de Chaccho
            </Typography>
            <Typography textAlign={'right'} fontSize={12}>
               Sistema de trámite documentario
            </Typography>
         
            </Box>
            
        <Box mt={2}>
        <Typography fontSize={16}> Estimado  <b>{name}</b>,
                    su solicitud esta en proceso de atención,
                    el código de seguimiento es: <b>{new Date().getFullYear()}-{code}.</b>
            </Typography>
            <Typography fontSize={16} mt={1}> Guarde el documento o copie el codigo, para su posterior seguimiento en el sistema.
            </Typography>
              
        </Box>
           
            

            </DialogContent>
            <DialogActions>


                {/* <Button  color='error' onClick={handleClose}   >
                    Cerrar
                </Button> */}
            
                <Button endIcon={<SaveIcon/>}   onClick={handlePrint}>
                    Guardar
                </Button>
            </DialogActions>


        </Dialog>

  );
};

export default ModalMensaje;
