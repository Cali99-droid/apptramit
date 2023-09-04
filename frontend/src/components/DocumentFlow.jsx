

import {  Box, Chip, Paper, Step,   StepLabel,   Stepper,   Typography } from '@mui/material';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
// eslint-disable-next-line react/prop-types
const DocumentFlow = ({ offices, currentOffice }) => {
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };
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
                   {office.oficina}
                   
                  </StepLabel>
               </Box>
              <Box display={'flex'} justifyContent={'center'} alignContent={'center'} mt={2}>
              <Chip  onDelete={handleDelete} deleteIcon={<PriorityHighIcon />} label={office.estado} size="small" color={office.estado==='Derivado'? 'info':'warning'}variant='outlined' />
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
