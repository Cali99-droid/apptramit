/* eslint-disable react/prop-types */
import {  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText,  TextField} from "@mui/material";
import { useState } from "react";

import 'react-toastify/dist/ReactToastify.css';
import clienteAxios from "../../config/axios";
import { toast } from "react-toastify";





const ModalCerrar = ({handleClose,open,oficina}) => {
 
    // const {user} = useAuth({middleware:'auth'});
    // const token = localStorage.getItem("AUTH_TOKEN");


  const [obs, setObs] = useState('');
  const onObsChange = (event) => {
   
    setObs(event.target.value);
}
const handleCerrar =async()=>{

  
   const token = localStorage.getItem("AUTH_TOKEN");
  
     // Realizar acciones cuando el formulario se envíe con éxito
     
     try {
      
        await clienteAxios.put(`/api/history/${oficina.pivot.id}`,{
        obs
        },{
            headers: {
            Authorization: `Bearer ${token}`,
            },
        })
        toast.success('Cerrado Correctamente', {theme:'colored'})
    

       
       
     } catch (error) {
       console.log(error)
     
   }

 
}
  return (
    <Dialog open={open} onClose={handleClose}  maxWidth={'lg'}>

            <DialogTitle >¿Esta seguro de cerrar el documento? </DialogTitle>
            <DialogContent  >
             <Box width={400} mt={1}>
             
             <FormControl fullWidth sx={{ mt: 2 }}>
                 <TextField
                id="filled-multiline-flexible"
                label="Observación"
                multiline
                maxRows={4}
                variant="outlined"
                onChange={onObsChange}
                value={obs}
                 />
                 <FormHelperText id="component-helper-text">
                    Opcional
                 </FormHelperText>
              </FormControl>
              
             </Box>
            

            </DialogContent>
            <DialogActions>


                <Button variant='outlined' color='error' onClick={handleClose}   >
                    Cancelar
                </Button>
                <Button variant='outlined'  onClick={handleCerrar}>
                    Aceptar
                </Button>
            </DialogActions>


        </Dialog>

  );
};

export default ModalCerrar;
