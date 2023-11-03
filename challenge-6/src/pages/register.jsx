import { Container, Paper, TextField, Button, Grid } from '@mui/material';

const Register = () => {
    return (
        <Grid
            className='m-3'
            justifyContent="center" // Membuat kontainer berada di tengah secara horizontal
            alignItems="center" // Membuat kontainer berada di tengah secara vertikal
            style={{ height: '75vh' }}
        >
            <Grid item>
                <Paper elevation={3} style={{ padding: '2rem' }}>
                    <h2 className='text-center'>Register</h2>
                    <Grid container spacing={2}> {/* Menggunakan Grid */}
                        <Grid item xs={6}>
                            <TextField
                                label="Nama Lengkap"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Password"
                                variant="outlined"
                                margin="normal"
                                type="password"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Nomor Handphone"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <div className='text-end mt-4'>
                        <Button variant="contained" color="primary">
                            Daftar
                        </Button>
                    </div>
                    <p className='text-primary mt-2 text-sm'>Sudah Mempunyai Akun?, <a href="login">Login</a></p>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Register;
