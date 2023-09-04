
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
const LoginForm = () => {
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
        <form>
          <TextField
            label="Correo electrónico"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Contraseña"
            fullWidth
            margin="normal"
            variant="outlined"
            type="password"
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
