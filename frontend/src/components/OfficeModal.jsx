import  { useState } from 'react';
import {
  Button,
  Modal,
  TextField,
  FormControl,
  FormHelperText,

} from '@mui/material';

// eslint-disable-next-line react/prop-types
const OfficeModal = ({ open, onClose }) => {
  const [officeName, setOfficeName] = useState('');
  const [error, setError] = useState('');

  const handleClose = () => {
    setOfficeName('');
    setError('');
    onClose();
  };

  const handleSubmit = () => {
    // Validar el nombre de la oficina
    if (officeName.trim() === '') {
      setError('El nombre de la oficina es requerido');
    } else {
      // Realizar acciones cuando el formulario se envíe con éxito
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
