import { Grid, Paper, TextField, Button } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const bodyRequest = {
        email: username,
        password: password,
      }
      const response = await axios.post(`http://localhost:8000/login`, bodyRequest);

      localStorage.setItem('bearerToken', response.data.token)
      swal({
        title: "Successfully Login",
        icon: "success"
      }).then(() => {
        navigate('/')
      })

    } catch (error) {
      const err = error.response.data;
      swal(`${err.code} ${err.status}`, err.message, "error");
    }
  }

  return (
    <Grid
      container
      justifyContent="center"  // Membuat kontainer berada di tengah
      alignItems="center"
      style={{ height: '75vh' }}
    >
      <Paper elevation={3} style={{ padding: '2rem', width: '400px', }}>
        <h2 className='text-center'>Masuk</h2>
        <form onSubmit={handleLogin} method="POST">
          <TextField
            onChange={(e) => setUsername(e.target.value)}
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
          />
          <div className="text-center mt-3">
            <Button type="submit" className='p-2' variant="contained" color="primary" fullWidth> {/* Menambahkan prop fullWidth */}
              Masuk
            </Button>
          </div>
        </form>
        <p className='text-primary mt-4 text-sm'>Belum Mempunyai Akun?, <a href="register">Register</a> </p>
      </Paper>
    </Grid>
  );
};

export default Login;
