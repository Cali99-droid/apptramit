/* eslint-disable react/prop-types */
import {  Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import DocumentFlow from "../DocumentFlow";



const ModalTracking = ({oficinas ,handleClose,open}) => {



  return (
    <Dialog open={open} onClose={handleClose}  maxWidth={'lg'}>

            <DialogTitle >Rastreando  </DialogTitle>
            <DialogContent  >
            <DocumentFlow
            offices={oficinas}
            currentOffice={oficinas.length-1}
            />


            </DialogContent>
            <DialogActions>


                {/* <Button variant='outlined' color='error' onClick={handleClose}   >
                    Cancelar
                </Button> */}
                <Button variant='outlined' onClick={handleClose}  >
                    Aceptar
                </Button>
            </DialogActions>


        </Dialog>

  );
};

export default ModalTracking;
