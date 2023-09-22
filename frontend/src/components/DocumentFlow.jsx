/* eslint-disable react/prop-types */


import {  Box, Chip, Paper, Step,   StepLabel,   Stepper,   Typography } from '@mui/material';
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
        return <Chip  label='Derivado' color='info' onDelete={handleDelete} deleteIcon={<PriorityHighIcon />}/>
      case 2:
        return <Chip label='Revisado' color='success' onDelete={handleDelete} deleteIcon={<DoneIcon />}/>  
      case 3:
        return <Chip label='Cerrado' color='error'/>   
      default:
        break;
    }
  }
  return (
    <div className='w-full'>
     
     <Paper elevation={6} sx={{overflow:'auto'}}>
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
          </Step>
        ))}
      </Stepper>
      </Box>
     
     </Paper>
     
    
    </div>
  );
};

export default DocumentFlow;
