/* eslint-disable react/prop-types */


import {  Alert, AlertTitle, Box, Chip,  Step,   StepLabel,   Stepper,   Typography } from '@mui/material';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import DoneIcon from '@mui/icons-material/Done';
// eslint-disable-next-line react/prop-types
const DocumentFlow = ({ offices, currentOffice }) => {
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

   const CustomChip = ({estado})=>{

    switch (estado) {
      case 1:
        return <Chip  label='Recibido' color='info' onDelete={handleDelete} deleteIcon={<PriorityHighIcon />}/>
      case 2:
        return <Chip label='Revisado' color='success' onDelete={handleDelete} deleteIcon={<DoneIcon />}/>  
      case 3:
        return <Chip label='Derivado' color='error'/>   
        case 4:
          return <Chip label='Observado' color='error'/>   
          case 5:
          return <Chip label='Atendido' color='success'/> 
      default:
        break;
    }
  }
  return (
    <div className='w-full'>
     
     <Box  sx={{overflow:'auto'}}>
       <Box className={'text-center'}>
         <Typography variant="h6">Flujo del Documento</Typography>
      </Box>
      <Box minWidth={850}>
         <Stepper activeStep={currentOffice} sx={{ padding: 4 }}>
        { 
        // eslint-disable-next-line react/prop-types
        offices.map((office, index) => (
          
          <Step key={index}  sx={{ padding: 4 }}>
               <Box display={'flex'} flexDirection={'column'} alignItems={'center'} >
                <Box className={currentOffice == index ? 'bg-sky-400' : 'bg-sky-800'}  width={'50px'} height={'50px'} padding={3} display={'flex'} justifyContent={'center'} alignItems={'center'} borderRadius={'50%'} >
                  <BeenhereIcon sx={{ color: '#FFF' }} />
                </Box>
                  <StepLabel>
                   {office.nombre}
                   
                  </StepLabel>
               </Box>
              <Box display={'flex'} justifyContent={'center'} alignContent={'center'} mt={2}>
              <CustomChip   estado={office.pivot.estado_id}   />
              </Box>
              <Box mt={2} width={200}>
                {office.pivot.obs === null ? '':(
                   <Alert severity="info"> <AlertTitle><strong>Comentario</strong></AlertTitle>{office.pivot.obs}</Alert>
                )}
             
              </Box>
          </Step>
        ))}
      </Stepper>
      </Box>
     
     </Box>
     
    
    </div>
  );
};

export default DocumentFlow;
