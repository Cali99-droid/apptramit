/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import  { useEffect, useState } from 'react';
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
import clienteAxios from '../config/axios';
// import useSWR from 'swr'; 
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

// eslint-disable-next-line react/prop-types
const UserCreationModal = ({ open, onClose,user }) => {

  const token = localStorage.getItem("AUTH_TOKEN");
  // const fetcher = () => clienteAxios('/api/oficina',{
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // }).then(datos => datos.data)
  // const { data, isLoading } = useSWR('/api/oficina', fetcher, {refreshInterval: 5000})
  const [datos, setDatos] = useState([]);
  useEffect(() => {
    clienteAxios('/api/oficina',{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setDatos(response.data.data);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [userData, setUserData] = useState({
    id:null,
    name: '',
    email: '',
    password: '',
    office:'',
    status:'',  
  });
  // const [offi, setOffi] = useState();
  

  useEffect(() => {


    setUserData(user)

  }, [user])
  
 




  const [errors, setErrors] = useState({});



  const handleChange = (e) => {
  
    const { name, value } = e.target;  
    

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async() => {

    // Validar el formulario

    const newErrors = {};
    if (!userData.name ) {
      newErrors.name = 'El nombre es requerido';
    }
    if (!userData.email) {
      newErrors.email = 'El email es requerido';
    }
    if (!userData.password && userData.id === null) {
      newErrors.password = 'La contraseña es requerida';
    }
    if (!userData.office) {
      newErrors.office = 'La oficina es requerida';
    }
    // if (userData.status ==! 0 || userData.status ==! 1) {
    //   newErrors.status = 'el estado es requerido';
    // }

    if (Object.keys(newErrors).length === 0) {
      // if(id){
      //     setUserData({
      //     ...userData,
      //     ['id']: id,
      //   }); }
        
       
      // Realizar acciones cuando el formulario se envíe con éxito
      console.log('Datos del usuario:', userData);
      console.log(userData.id);
      try {
        if(userData.id){
          const resp = await clienteAxios.put(`/api/users/${userData.id}`,userData,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          console.log(resp)
          toast.success('Actualizado correctamente');
          onClose();
          return;
        }
        const resp = await clienteAxios.post('/api/registro',userData,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setErrors({});
        toast.success('Creado correctamente');
        onClose();
        console.log(resp)
       
      } catch (error) {
        const {email} = error.response.data.errors
        toast.error(email[0]);
       
        console.log(error.response.data.errors)
      }
      setErrors({});

      onClose();
    } else {
      setErrors(newErrors);
    }
  };


  return (
    <Modal open={open} onClose={()=>{
      onClose();
      setErrors({});
    
      }}>
      <div className="modal-container flex flex-col justify-center items-center gap-3">
        <h2>Datos del Usuario</h2>
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
          <FormHelperText>*Dejar en blanco si no cambiará</FormHelperText>
        </FormControl>
        
        <FormControl fullWidth error={Boolean(errors.office)}>
          <InputLabel>Oficina</InputLabel>
          <Select
            label="Oficina"
            name="office"
            // value={userData.office}
           value={userData.office}
            onChange={handleChange}
            disabled={datos.length<=0}
            defaultValue={user.office}
          >
            {datos.map((office,index) => (
              <MenuItem key={index} value={office.id}>
                {office.nombre}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.office}</FormHelperText>
        </FormControl>
        <FormControl fullWidth error={Boolean(errors.status)}>
          <InputLabel>Estado</InputLabel>
          <Select
            label="Estado"
            name="status"
            value={userData.status}
            onChange={handleChange}
            defaultValue={user.status}
          >
      
            <MenuItem key={1} value={0}>
               INACTIVO
              </MenuItem>
              <MenuItem  key={2} value={1} >
               ACTIVO
              </MenuItem>
             
         
          </Select>
          <FormHelperText>{errors.status}</FormHelperText>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Guardar
        </Button>
      </div>
    </Modal>
  );
};

export default UserCreationModal;
