import { Box, Button, Paper, TextField, Typography } from "@mui/material";

export default function Inicio() {
  return (
    <Box mt={5}>
      <Typography
        variant="h1"
        fontSize={30}
        fontWeight={"bold"} 
        textAlign={"center"}
      >
        Bienvenido al Sistema de trámite documentario
      </Typography>
      <Typography
        mt={2}
        variant="h2"
        fontSize={20}
        textAlign={"center"}
        className="text-gray-500"
      >
        Rastrea tu documento desde aqui
      </Typography>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"40vh"}
      >
        <Paper
          className="p-8"
          elevation={12}
          sx={{ height: "200px", width: "400px" }}
        >
          <Box>
            <form action="">
              <TextField
                label="Código"
                fullWidth
                margin="normal"
                variant="outlined"
                helperText="Ingrese código de seguimiento"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Rastrear
              </Button>
            </form>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
