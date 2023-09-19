import  { useState } from 'react';
import {
  Button,
  Modal,
  TextField,
  FormControl,
  FormHelperText,

} from '@mui/material';
import clienteAxios from '../config/axios';
// eslint-disable-next-line react/prop-types
const OfficeModal = ({ open, onClose }) => {
  const [officeName, setOfficeName] = useState('');
  const [error, setError] = useState('');

  const handleClose = () => {
    setOfficeName('');
    setError('');
    onClose();
  };

  const handleSubmit = async() => {
    // Validar el nombre de la oficina 
     const token = localStorage.getItem("AUTH_TOKEN");
    if (officeName.trim() === '') {
      setError('El nombre de la oficina es requerido');
    } else {
      // Realizar acciones cuando el formulario se envíe con éxito
      try {
        await clienteAxios.post('/api/oficina',{
          officeName
        },{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        
      } catch (error) {
        console.log(error)
      }

      console.log('Nombre de la oficina:', officeName);
      handleClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
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
          Agregar
        </Button>
      </div>
    </Modal>
  );
};

export default OfficeModal;
