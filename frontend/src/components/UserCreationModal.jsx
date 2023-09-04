import  { useState } from 'react';
import {
  Button,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';

// eslint-disable-next-line react/prop-types
const UserCreationModal = ({ open, onClose }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    office: '',
  });

  const [errors, setErrors] = useState({});

  const offices = ['Oficina 1', 'Oficina 2', 'Oficina 3']; // Lista de oficinas

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Validar el formulario
    const newErrors = {};
    if (!userData.name) {
      newErrors.name = 'El nombre es requerido';
    }
    if (!userData.email) {
      newErrors.email = 'El email es requerido';
    }
    if (!userData.password) {
      newErrors.password = 'La contraseña es requerida';
    }
    if (!userData.office) {
      newErrors.office = 'La oficina es requerida';
    }

    if (Object.keys(newErrors).length === 0) {
      // Realizar acciones cuando el formulario se envíe con éxito
      console.log('Datos del usuario:', userData);
      setErrors({});
      onClose();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-container flex flex-col justify-center items-center gap-3">
        <h2>Crear Usuario</h2>
        <FormControl fullWidth error={Boolean(errors.name)}>
          <TextField
            label="Nombre"
            variant="outlined"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
          <FormHelperText>{errors.name}</FormHelperText>
        </FormControl>
        <FormControl fullWidth error={Boolean(errors.email)}>
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
          <FormHelperText>{errors.email}</FormHelperText>
        </FormControl>
        <FormControl fullWidth error={Boolean(errors.password)}>
          <TextField
            label="Contraseña"
            variant="outlined"
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
          <FormHelperText>{errors.password}</FormHelperText>
        </FormControl>
        <FormControl fullWidth error={Boolean(errors.office)}>
          <InputLabel>Oficina</InputLabel>
          <Select
            label="Oficina"
            name="office"
            value={userData.office}
            onChange={handleChange}
          >
            {offices.map((office) => (
              <MenuItem key={office} value={office}>
                {office}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.office}</FormHelperText>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Crear Usuario
        </Button>
      </div>
    </Modal>
  );
};

export default UserCreationModal;
