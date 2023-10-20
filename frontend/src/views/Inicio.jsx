import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'

import withReactContent from 'sweetalert2-react-content'
import ModalTracking from "../components/modal/ModalTracking";
const MySwal = withReactContent(Swal);
export default function Inicio() {
  const [oficinas, setOficinas] = useState([])
  const [open, setOpen] = useState(false);
const handleCloseTrack = ()=>{
  setOpen(false);
}
const [code, setCode] = useState('');
const onCodeChange = (event) => {
  if (event.target.value.length <= 0) {
      toast.error('ingrese un valor válido')
  }
  setCode(event.target.value);

}
  const onSubmit = async()=>{
    if(!code){
      toast.info('Ingrese el código')
      return;
    }
    if(code.length!==6){
      toast.warning('El codigo debe tener 6 dígitos')
      return;
    }
   
    try {
      toast.info('Procesando')
      const {data} =   await axios.get(`http://localhost/api/consulta/${code}`)
      console.log(data.data[0].oficinas)
     if(data.data.length===0){
      
      MySwal.fire({
        title: 'No existen registros para el código ingresado',
  
        icon: 'warning',
       
      })
    
      setCode('')
      return;
     } 

     const ofic = data.data[0].oficinas;
     setOficinas(ofic);
     setOpen(true)

   



     
    } catch (error) {
      
      console.log(error)
    }
  }
  return (
    <Box mt={5}>
      <Typography
        variant="h1"
        fontSize={30}
        fontWeight={"bold"} 
        textAlign={"center"}
      >
        Bienvenido al Sistema de trámite documentario
      </Typography>
      <Typography
        mt={2}
        variant="h2"
        fontSize={20}
        textAlign={"center"}
        className="text-gray-500"
      >
        Rastrea tu documento desde aqui
      </Typography>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"40vh"}
      >
        <Paper
          className="p-8"
          elevation={12}
          sx={{ height: "200px", width: "400px" }}
        >
          <Box>
           
              <TextField
                label="Código"
                fullWidth
                name="code"
                margin="normal"
                variant="outlined"
                helperText="Ingrese código de seguimiento"
                value={code}
                onChange={onCodeChange}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={onSubmit}
              >
                Rastrear
              </Button>
            
          </Box>
        </Paper>
      </Box>
      <ModalTracking open={open} handleClose={handleCloseTrack} oficinas={oficinas} /> 
    </Box>
  );
}
