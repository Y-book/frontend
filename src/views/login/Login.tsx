import React from 'react';
import "./Login.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { userPool } from '../../index';

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
        if (email !== '' && password !== '') {
            const authenticationData = {
                Username: email,
                Password: password,
            };
            const authenticationDetails = new AuthenticationDetails(
                authenticationData
            );
            const userData = {
                Username: email,
                Pool: userPool,
            };

            const cognitoUser = new CognitoUser(userData);

            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result) {
                    const accessToken = result.getAccessToken().getJwtToken();
                    console.log("accessToken", accessToken);

                    const refresh = result.getRefreshToken().getToken();
                    console.log("RefreshToken: " + refresh);
                    
                    /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer */
                    // var idToken = result.idToken.jwtToken;
                },
        
                onFailure: function(err) {
                    alert(err);
                },
            });
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
                    <TextField label="Mot de passe" id="outlined-size-normal" onChange={changePassword} />
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