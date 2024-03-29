import React, { useContext } from 'react';
import "./Login.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { UserAccountContext } from '../../provider/UserProvider';

const Login: React.FC<{setConnectedUser: React.Dispatch<React.SetStateAction<boolean>>}> = (props) => {
    const navigate = useNavigate();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const {authenticate} = useContext(UserAccountContext)

    function changeMail(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    function changePassword(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    async function connection() {
        if (email !== '' && password !== '') {
            const login = await authenticate(email, password)
            if (login) {
                props.setConnectedUser(true);
                setTimeout(() => {
                    navigate('/')
                }, 1000)
            }
        } else {
            alert("Merci de renseigner tous les champs");
        }
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
                    <TextField type="password" label="Mot de passe" id="outlined-password-input" onChange={changePassword} />
                </div>
            </Box>
            <Button color='inherit' variant="contained" onClick={connection}>Se connecter</Button>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                <div className='connexion-other'>
                    <a href='/reset-password'>Mot de passe oublié</a>
                </div>
                <div className='connexion-other'>
                    <Link to="/signup"> S'enregistrer </Link>
                </div>
            </Box>
        </div>
    );
};

export default Login;