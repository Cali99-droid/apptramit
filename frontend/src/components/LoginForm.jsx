import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";

import { createRef, useState } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useAuth } from "../hooks/useAuth";
import { blue } from "@mui/material/colors";
const LoginForm = () => {
  const emailRef = createRef();
  const passwordRef = createRef();
  const [loading, setLoading] = useState(false);
  // const [errores, setErrores] = useState([])
  // const { login } = useAuth({
  //     middleware: 'guest',
  //     url: '/'
  // })
  const [errores, setErrores] = useState([]);
  const { login } = useAuth({
    middleware: "guest",
    url: "/oficina",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const datos = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    login(datos, setErrores, setLoading);
  };

  return (
    <Container maxWidth="xs">
      <div className="mt-20">
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Box>
            <img src="/img/escudo-removebg.png" width={90} />
          </Box>

          {/* <AdbIcon  */}
          <Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                fontFamily: "fantasy  ",
                // fontWeight: 700,

                color: "inherit",
                textDecoration: "none",
              }}
            >
              Municipalidad Distrital de Chaccho
            </Typography>
            <Typography
              fontSize={22}
              sx={{
                fontFamily: "Satisfy",
                // fontWeight: 700,

                color: "inherit",
                textDecoration: "none",
              }}
              align="center"
            >
              Servicio, compromiso y comunidad.
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: "fantasy ",
            }}
            variant="h6"
            align="center"
            gutterBottom
            marginTop={4}
          >
            Iniciar sesión
          </Typography>
        </Box>

        <Box
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          gap={1}
        >
          {errores
            ? errores.map((error, i) => (
                <Chip
                  icon={<ErrorOutlineIcon />}
                  color="error"
                  key={i}
                  label={error}
                />
              ))
            : null}
        </Box>

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Correo electrónico"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            inputRef={emailRef}
            autoComplete="true"
          />
          <TextField
            label="Contraseña"
            fullWidth
            margin="normal"
            variant="outlined"
            type="password"
            inputRef={passwordRef}
            autoComplete="true"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            Ingresar
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: blue[500],
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default LoginForm;
