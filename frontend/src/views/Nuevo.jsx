import { Container, Typography } from "@mui/material";
import DocumentRequestForm from "../components/DocumentRequestForm";


export default function Nuevo() {
  return (
    <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Formulario de Solicitud de Documento
        </Typography>
        <DocumentRequestForm />
      </Container>
  )
}
