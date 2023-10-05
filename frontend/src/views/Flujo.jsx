import { Container, CssBaseline, Typography } from "@mui/material";
import DocumentFlow from "../components/DocumentFlow";


export default function Flujo() {
    const documentFlowData = {
        offices: [
          {oficina:'Oficina A',estado:'Derivado',pivot:{
            estado_id:2
          }},
          {oficina:'Oficina B',estado:'Derivado',pivot:{
            estado_id:2
          }},
          {oficina:'Oficina C',estado:'Derivado',pivot:{
            estado_id:2
          }},
          {oficina:'Oficina D',estado:'Por revisar',pivot:{
            estado_id:2
          }},
         
          
        ],
        currentOffice: '3', // Debes obtener la oficina actual de tus datos o estado de la aplicación.
      };
  return (
    <>
    <CssBaseline />
    <Container maxWidth="lg" className="mt-10">
      <Typography variant="h4" align="center" gutterBottom>
        Documento en Trámite
      </Typography>
      <DocumentFlow
        offices={documentFlowData.offices}
        currentOffice={documentFlowData.offices.length-1}
      />
    </Container>
  </>
  )
}
