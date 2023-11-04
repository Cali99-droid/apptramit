import { Alert, AlertTitle, Box, Container, Typography } from "@mui/material";

import SolicitudRequestForm from "../components/SolicitudRequestForm";


export default function Registro() {
  return (
    <Container maxWidth="md">
       <Box mt={10}>
       <Typography variant="h4" align="center" gutterBottom>
          Solicitud de trámite
        </Typography>
        <Alert severity="info">
        <AlertTitle>Importante</AlertTitle>
        Al finalizar el envio el sistema le asignará un codigo para que pueda dar seguimiento a su documento <strong>copie</strong> el codigo y guárdelo en un lugar seguro
      </Alert>
      <br />
        <SolicitudRequestForm />
       </Box>
      </Container>
  )
}
