import { Grid, Paper, TextField, Button } from '@mui/material';
import { height } from '@mui/system';

const Login = () => {
  return (
    <Grid
      container
      justifyContent="center"  // Membuat kontainer berada di tengah
      alignItems="center"
      style={{ height: '75vh' }}
    >
      <Paper elevation={3} style={{ padding: '2rem', width: '400px',}}>
        <h2 className='text-center'>Masuk</h2>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
        />
        <div className="text-center mt-3">
          <Button className='p-2' variant="contained" color="primary" fullWidth> {/* Menambahkan prop fullWidth */}
            Masuk
          </Button>
        </div>
        <p className='text-primary mt-4 text-sm'>Belum Mempunyai Akun?, <a href="register">Register</a> </p>
      </Paper>
    </Grid>
  );
};

export default Login;
