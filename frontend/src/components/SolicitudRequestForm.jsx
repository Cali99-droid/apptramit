// DocumentRequestForm.js
import * as yup from 'yup';
import { useFormik } from 'formik';
import Swal from 'sweetalert2'
// import Swal from 'sweetalert2'
import ReCAPTCHA from "react-google-recaptcha";
import withReactContent from 'sweetalert2-react-content'
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Input,
  CircularProgress,
} from '@mui/material';
// import clienteAxios from '../config/axios';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ModalMensaje from './modal/ModalMensaje';
import { green } from '@mui/material/colors';

const MySwal = withReactContent(Swal);
const validationSchema = yup.object().shape({
    personaType: yup.string().required('El tipo de persona es requerido'),
    direccion: yup.string().required('La dirección es requerida'),
    asunto: yup.string().required('El asunto es requerido'),
    email: yup.string().email('Debe ser un email válido').required('El email  es requerido'),
    telefono: yup.string().length(9, 'El telefono debe ser de 9 digitos').required('El teléfono o celular es requerido'),
    // office: yup.string().required('La oficina es requerida'),
    name: yup.string().required('El nombre del interesado es requerido'),
    dni: yup.string().required('El DNI del interesado es requerido'),
    documentName: yup.string().required('El nombre del documento es requerido'),
    folio: yup.string().required('El folio es requerido'),
    documentType: yup.string().required('El tipo de documento es requerido'),
    pdfFile: yup
      .mixed()
      .required('El archivo PDF es requerido')
      .test('fileType', 'Solo se permiten archivos PDF', (value) => {
        return value && value.type === 'application/pdf';
      }),
  });
  const initialValues = {
    asunto:'',
    direccion:'',
    telefono:'',
    email:'',
    personaType:'',
  
    name: '',
    dni: '',
    documentName: '',
    folio: '',
    documentType: '',
    pdfFile: null,
  };
  
const SolicitudRequestForm = () => {
  const api = import.meta.env.VITE_API_URL;
  const [code, setCode] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(false);
const handleClose= ()=>{
  setOpen(false);
}
const [loading, setLoading] = useState(false);
  // const token = localStorage.getItem("AUTH_TOKEN");
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async(values,{resetForm}) => {
         
          const formData = new FormData();
          formData.append('asunto', values.asunto);
          formData.append('direccion', values.direccion);
          formData.append('telefono', values.telefono);
          formData.append('email', values.email);
          formData.append('personaType', values.personaType);
          formData.append('name', values.name);
          formData.append('dni', values.dni);
          formData.append('documentName', values.documentName);
          formData.append('folio', values.folio);
          formData.append('documentType', values.documentType);
          formData.append('pdfFile', values.pdfFile);
        

          // Realizar acciones cuando el formulario se envíe con éxito
          try {
            if(!captcha){
              toast.warning('Marca la casilla para comprobar que no eres un robot')
              return
            }
            formData.append('captcha', captcha);
            // toast.info('Guardando')
            setLoading(true)
            const {data} =   await axios.post(`${api}/api/solicitud`,
                    formData
                  ,{
                    headers: {
                      // Authorization: `Bearer ${token}`,
                      'Content-Type': 'multipart/form-data',
                    },
                  })
            setCode(data.code)
            console.log(code)
            console.log(data) 
            setName(values.name)
            setOpen(true)
            resetForm();
           setLoading(false)
          //   MySwal.fire({
          //     icon:'success',
          //     title: 'Registro Exitoso!',
            
          //     html: `
          //           Estimado <b>${values.name}</b>,
          //           su solicitud esta en proceso de atención,
          //           el codigo de seguimiento es: <b>${data.code}</b> y
          //           puede consultarlo desde  <a href="http://127.0.0.1:5173/consulta">aqui</a>
          //     `,
          //     footer: '<a href="#">Sistema de trámite documentario - Municipalidad de Chaccho?</a>',
          //     showCloseButton: true,
          //     showCancelButton: true,
          //     focusConfirm: false,
          //     confirmButtonText: `
          //  Aceptar!
          //     `,
          //     confirmButtonAriaLabel: "Thumbs up, great!",
          //     cancelButtonText: `
          //       Imprimir Cargo
          //     `,
          //     cancelButtonAriaLabel: "Cargo"
             
          //   }).then((result)=>{
          //     // if (result.isConfirmed) {
          //     //   handlePrint()
          //     //   // resetForm();
          //     //   // window.location.reload(true);
          //     // } else if (result.isDenied) {
          //     //   console.log('impr')
          //     //   handlePrint()
          //     //   // Swal.fire("Changes are not saved", "", "info");
          //     // }
            

          //   })
           
          } catch (error) {
            MySwal.fire({
              icon:'error',
              title: 'Hubo un error ',
              text: `${error.response.data.message}`,
             
            })
            setLoading(false)
            console.log(error.response.data.message)
          }

          // console.log('Formulario enviado con éxito:', values);
        },
      });
   
  const handleRecaptchaChange = (value) => {
   
   setCaptcha(value);
  }
  return (
    <form onSubmit={formik.handleSubmit} noValidate encType="multipart/form-data">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Tipo de Persona</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                name="personaType"
                value={formik.values.personaType}
                onChange={formik.handleChange}
                error={formik.touched.personaType && Boolean(formik.errors.personaType)}
                // helperText={formik.touched.personaType && formik.errors.personaType}
                required
            >
                <MenuItem value={1}>Natural</MenuItem>
                <MenuItem value={2}>Jurídica</MenuItem>
        
            </Select>
        </FormControl>
        </Grid>
        {/* <Grid item xs={12} sm={6}>

          <TextField
            label="Oficina que recepciona"
            fullWidth
            variant="outlined"
            name="office"
            value={formik.values.office}
            onChange={formik.handleChange}
            error={formik.touched.office && Boolean(formik.errors.office)}
            helperText={formik.touched.office && formik.errors.office}
            required
          />
        </Grid> */}
         <Grid item xs={12} sm={6}>
          <TextField
            label="DNI del interesado"
            fullWidth
            variant="outlined"
            name="dni"
            value={formik.values.dni}
            onChange={formik.handleChange}
            error={formik.touched.dni && Boolean(formik.errors.dni)}
            helperText={formik.touched.dni && formik.errors.dni}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nombre del interesado"
            fullWidth
            variant="outlined"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Telefono / Celular"
            fullWidth
            variant="outlined"
            name="telefono"
            type='tel'
            value={formik.values.telefono}
            onChange={formik.handleChange}
            error={formik.touched.telefono && Boolean(formik.errors.telefono)}
            helperText={formik.touched.telefono && formik.errors.telefono}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            name="email"
            type='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Dirección"
            fullWidth
            variant="outlined"
            name="direccion"
            multiline
            value={formik.values.direccion}
            onChange={formik.handleChange}
            error={formik.touched.direccion && Boolean(formik.errors.direccion)}
            helperText={formik.touched.direccion && formik.errors.direccion}
            required
          />
        </Grid>
       
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nombre del documento"
            fullWidth
            variant="outlined"
            name="documentName"
            value={formik.values.documentName}
            onChange={formik.handleChange}
            error={formik.touched.documentName && Boolean(formik.errors.documentName)}
            helperText={formik.touched.documentName && formik.errors.documentName}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Número de Folios"
            fullWidth
            variant="outlined"
            name="folio"
            type='number'
            value={formik.values.folio}
            onChange={formik.handleChange}
            error={formik.touched.folio && Boolean(formik.errors.folio)}
            helperText={formik.touched.folio && formik.errors.folio}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}> 
          <TextField
            label="Tipo de documento(solicitud, carta, etc)"
            fullWidth
            variant="outlined"
            name="documentType"
            value={formik.values.documentType}
            onChange={formik.handleChange}
            error={formik.touched.documentType && Boolean(formik.errors.documentType)}
            helperText={formik.touched.documentType && formik.errors.documentType}
            required
          /> 
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            label="Asunto"
            multiline
            fullWidth
            variant="outlined"
            name="asunto"
            value={formik.values.asunto}
            onChange={formik.handleChange}
            error={formik.touched.asunto && Boolean(formik.errors.asunto)}
            helperText={formik.touched.asunto && formik.errors.asunto}
            required
          />
        </Grid>
        <Grid item xs={12}>
        <FormControl fullWidth>
            {formik.values.pdfFile ? (
                <InputLabel htmlFor="pdf-file-input" style={{ marginBottom: '8px' }}>
                Archivo PDF
                </InputLabel>
            ) : null}
            <Input
            variant={'outlined'}
                id="pdf-file-input"
                type="file"
                inputProps={{ accept: '.pdf' }} 
                name="pdfFile"
                onChange={(e) => {
                formik.setFieldValue('pdfFile', e.currentTarget.files[0]);
                }}
                error={formik.touched.pdfFile && Boolean(formik.errors.pdfFile)}
                required
            />
            </FormControl>
        </Grid>
        <Grid item xs={12}>
        <ReCAPTCHA
          sitekey="6LcpWf4oAAAAACNgA6kHAO6LV31f9H1EFCHV5gzW"
          onChange={handleRecaptchaChange}
        />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            Enviar Solicitud
            {loading && (
                                        <CircularProgress
                                            size={24}
                                            sx={{
                                                color: green[500],
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                marginTop: '-12px',
                                                marginLeft: '-12px',
                                            }}
                                        />
                                    )}
          </Button>
        </Grid>
      </Grid>
      <ModalMensaje open={open} handleClose={handleClose}name={name} code={code}>

      </ModalMensaje>
    </form>
  );
};

export default SolicitudRequestForm;
