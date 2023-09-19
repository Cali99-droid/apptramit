import { Box, Container, Typography } from "@mui/material";

import SolicitudRequestForm from "../components/SolicitudRequestForm";


export default function Registro() {
  return (
    <Container maxWidth="md">
       <Box mt={10}>
       <Typography variant="h4" align="center" gutterBottom>
          Solicitud de trámite
        </Typography>
        <SolicitudRequestForm />
       </Box>
      </Container>
  )
}
