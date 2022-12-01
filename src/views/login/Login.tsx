import React from 'react';
import "./Login.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function changeMail(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    function changePassword(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    function connection() {
        console.log(email);
        console.log(password);
    }

    return (
        <div className='main-container'>
            <p>Login</p>
            <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
                <div>
                    <TextField label="E-mail" id="outlined-size-normal" onChange={changeMail} />
                </div>
                <div>
                    <TextField label="Mot de passe" id="outlined-size-normal" onChange={changePassword} />
                </div>
            </Box>
            <Button color='inherit' variant="contained" onClick={connection}>Se connecter</Button>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                <div className='connexion-other'>
                    <a href='/'>Mot de passe oublié</a>
                </div>
                <div className='connexion-other'>
                    <Link to="/signup"> S'enregistrer </Link>
                </div>
            </Box>
        </div>
    );
};

export default Login;