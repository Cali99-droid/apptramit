/* eslint-disable react/prop-types */
import {  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import clienteAxios from "../../config/axios";
import useSWR from "swr";




const ModalDerivar = ({handleClose,open,documentoId, oficinaOrigenId}) => {
const origenId = oficinaOrigenId?.id;
    const token = localStorage.getItem("AUTH_TOKEN");
    const fetcher = () => clienteAxios('/api/oficina',{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(datos => datos.data)
    const { data,isLoading } = useSWR('/api/oficina', fetcher, {refreshInterval: 10000})

    const [error, setError] = useState('');
     const [oficinaId, setOficinaId] = useState(0);
    const handleChange = (event) => {
        console.log(event.target.value)
        setOficinaId(event.target.value);
      };
const handleSubmit=async()=>{
   console.log(oficinaId,documentoId)
    
    const token = localStorage.getItem("AUTH_TOKEN");
    if (oficinaId === 0) {
      setError('seleccione una oficina');
    } else {
      // Realizar acciones cuando el formulario se envíe con éxito
      try {
        await clienteAxios.post('/api/history',{
            oficinaId,documentoId,origenId

        },{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        alert('creado correcamente')
        
      } catch (error) {
        console.log(error)
      }
    }

  
        }

  return (
    <Dialog open={open} onClose={handleClose}  maxWidth={'lg'}>

            <DialogTitle >Seleccione Oficina  </DialogTitle>
            <DialogContent  >
             <Box width={400} mt={1}>
             {
                isLoading?(
                    <p>cargando..</p>
                ):(
                <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Oficina</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={oficinaId}
                            label="oficina"
                            onChange={handleChange}
                            error={error !== ''}
                        >
                            <MenuItem  value={0}>--Seleccione--</MenuItem>
                            {data?.data.map(e=>(
                            <MenuItem key={e.id} value={e.id}>{e.nombre}</MenuItem>
                            )
                                
                            )}
                            
                        
                        </Select>
                        <FormHelperText error>{error}</FormHelperText>
                </FormControl>
                )
              }  
             </Box>
            

            </DialogContent>
            <DialogActions>


                <Button variant='outlined' color='error' onClick={handleClose}   >
                    Cancelar
                </Button>
                <Button variant='outlined' onClick={handleSubmit} >
                    Guardar
                </Button>
            </DialogActions>


        </Dialog>

  );
};

export default ModalDerivar;
