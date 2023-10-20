// DocumentRequestForm.js
import * as yup from 'yup';
import { useFormik } from 'formik';

import {
  TextField,
  Button,
  FormControl,
  InputLabel,

  Grid,
  Input,
} from '@mui/material';

const validationSchema = yup.object().shape({
    office: yup.string().required('La oficina es requerida'),
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
    office: '',
    name: '',
    dni: '',
    documentName: '',
    folio: '',
    documentType: '',
    pdfFile: null,
  };
  
const DocumentRequestForm = () => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
          // Realizar acciones cuando el formulario se envíe con éxito
          console.log('Formulario enviado con éxito:', values);
        },
      });

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
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
            label="Folio"
            fullWidth
            variant="outlined"
            name="folio"
            value={formik.values.folio}
            onChange={formik.handleChange}
            error={formik.touched.folio && Boolean(formik.errors.folio)}
            helperText={formik.touched.folio && formik.errors.folio}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}> 
          <TextField
            label="Tipo de documento"
            fullWidth
            variant="outlined"
            name="folio"
            value={formik.values.documentType}
            onChange={formik.handleChange}
            error={formik.touched.documentType && Boolean(formik.errors.documentType)}
            helperText={formik.touched.documentType && formik.errors.documentType}
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Enviar Solicitud
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default DocumentRequestForm;
