/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
// import useSWR from "swr";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ModalDerivar = ({ handleClose, open, documentoId, oficinaOrigenId }) => {
  const origenId = oficinaOrigenId?.id;
  const navigate = useNavigate();
  const { user } = useAuth({ middleware: "auth" });
  const token = localStorage.getItem("AUTH_TOKEN");
  // const fetcher = () => clienteAxios('/api/oficina',{
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // }).then(datos => datos.data)
  // const { data,isLoading } = useSWR('/api/oficina', fetcher, {refreshInterval: 10000})
  const [datos, setDatos] = useState([]);
  useEffect(() => {
    clienteAxios("/api/oficina", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setDatos(response.data.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [error, setError] = useState("");
  const [oficinaId, setOficinaId] = useState(0);
  const handleChange = (event) => {
    console.log(event.target.value);
    if (event.target.value > 0) {
      setError(false);
    }
    setOficinaId(event.target.value);
  };

  const [obs, setObs] = useState("");
  const onObsChange = (event) => {
    setObs(event.target.value);
  };
  const handleSubmit = async () => {
    const token = localStorage.getItem("AUTH_TOKEN");
    if (oficinaId === 0 || oficinaId < 1) {
      setError("seleccione una oficina");
    } else {
      // Realizar acciones cuando el formulario se envíe con éxito
      try {
        await clienteAxios.post(
          "/api/history",
          {
            oficinaId,
            documentoId,
            origenId,
            obs,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Derivado Correctamente", { theme: "colored" });
        navigate(0);
        handleClose();
      } catch (error) {
        console.log(error);
        toast.error("Hubo un error", { theme: "colored" });
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={"lg"}>
      <DialogTitle>Seleccione Oficina </DialogTitle>
      <DialogContent>
        <Box width={400} mt={1}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Oficina</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={oficinaId}
              label="oficina"
              onChange={handleChange}
              error={error}
            >
              <MenuItem value={0}>--Seleccione--</MenuItem>
              {datos.map((e) => (
                <MenuItem
                  key={e.id}
                  value={e.id}
                  disabled={user?.oficina_id === e.id}
                >
                  {e.nombre}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText error>{error}</FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <TextField
              id="filled-multiline-flexible"
              label="Observación"
              multiline
              maxRows={4}
              variant="outlined"
              onChange={onObsChange}
              value={obs}
            />
            <FormHelperText id="component-helper-text">Opcional</FormHelperText>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="outlined" onClick={handleSubmit}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDerivar;
