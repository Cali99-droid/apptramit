
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import { createRef, useState } from 'react';

import { useAuth } from '../hooks/useAuth';
const LoginForm = () => {
  const emailRef = createRef();
  const passwordRef = createRef();

  // const [errores, setErrores] = useState([])
  // const { login } = useAuth({
  //     middleware: 'guest',
  //     url: '/'
  // })
  const [errores, setErrores] = useState([])
  const {login} = useAuth({
    middleware:'guest',
    url:'/oficina'

  });
  const handleSubmit = async e => {
      e.preventDefault();

      const datos = {
          email: emailRef.current.value,
          password: passwordRef.current.value,
      }
 
      login(datos, setErrores)
  }

  return (
    <Container maxWidth="xs" >
     
      <div className='mt-20'>
      
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <AdbIcon fontSize='large' sx={{ mr: 1 }} />
          <Link
            
           
            
            to="/"
           
          >
            <Typography variant='h4'  sx={{
              mr: 2,
              // display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>
              SISTRA
            </Typography>
            
          </Link>
    </Box>
    <Typography variant="h6" align="center" gutterBottom>
          Iniciar sesión
        </Typography>
        {errores ? errores.map((error, i) => <p key={i}>{error}</p>)  : null }
        <form   onSubmit={handleSubmit}
                    noValidate>
          <TextField
            label="Correo electrónico"
            type='email'
            fullWidth
            margin="normal"
            variant="outlined"
            inputRef={emailRef}
          autoComplete='true'
          />
          <TextField
            label="Contraseña"
            fullWidth
            margin="normal"
            variant="outlined"
            type="password"
            inputRef={passwordRef}
            autoComplete='true'
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Ingresar
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default LoginForm;
