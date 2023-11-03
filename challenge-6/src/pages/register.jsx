import { Paper, TextField, Button, Grid } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const bodyRequest = {
                name: username,
                email: email,
                password: password,
                phone: phoneNumber,
            }
            const response = await axios.post(`http://localhost:8000/register`, bodyRequest);
            response && swal({
                title: "Successfully Register",
                icon: "success",
            }).then(() => {
                axios.post('http://localhost:8000/login', {
                    email: email,
                    password: password
                })
                    .then((response) => {
                        localStorage.setItem('bearerToken', response.data.token);
                        navigate('/')
                    })
                    .catch((error) => {
                        console.log(error)
                        // const err = error.response.data;
                        // swal(`${err.code} ${err.status}`, err.message, "error");
                    });
            });
        } catch (error) {
            const err = error.response.data;
            swal(`${err.code} ${err.status}`, err.message, "error");
        }
    }

    return (
        <Grid container>
            <Grid item md={6}>
                <img style={{ width: "100%", height: "99.89vh", objectFit: "cover" }} src="https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&q=80&w=1770&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            </Grid>
            <Grid item md={6}>
                <Paper elevation={3} style={{ padding: '6.3rem 2.5rem' }}>
                    <h2 className='text-center mb-4'>Daftar</h2>
                    <form method='POST' onSubmit={handleRegister}>
                        <Grid container> {/* Menggunakan Grid */}
                            <Grid item xs={12}>
                                <TextField
                                    label="Nama Lengkap"
                                    onChange={(e) => setUsername(e.target.value)}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    type="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    variant="outlined"
                                    margin="normal"
                                    type="password"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Nomor Handphone"
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    type="text"
                                />
                            </Grid>
                        </Grid>
                        <div className='text-end mt-4'>
                            <Button type="submit" variant="contained" color="primary">
                                Daftar
                            </Button>
                        </div>
                    </form>
                    <p className='text-primary mt-2 text-sm'>Sudah Mempunyai Akun?, <a href="login">Login</a></p>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Register;
