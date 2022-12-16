import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { userPool } from '../../index';
import { useNavigate, useLocation } from 'react-router-dom';

const SignupCode: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state.email;
    const [code, setCode] = React.useState('');

    function changeCode(event: React.ChangeEvent<HTMLInputElement>) {
        setCode(event.target.value);
    }

    function confirm() {
        if (code !== '') {
            const userData = {
                Username: email,
                Pool: userPool
            };

            const cognitoUser = new CognitoUser(userData);

            cognitoUser.confirmRegistration(code, true, function (err, result) {
                if (err) {
                    alert(err.message || JSON.stringify(err));
                    return;
                } else {
                    navigate('/login');
                }
            });
        } else {
            alert("Merci de renseigner le code reçu par mail");
        }
    }

    return (
        <div className='main-container'>
            <p>Veuillez saisir le code reçu par mail.</p>
            <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
                <div>
                    <TextField label="Code" id="outlined-size-normal" onChange={changeCode} />
                </div>
            </Box>
            <Button color='inherit' variant="contained" onClick={confirm}>Confirmer</Button>
        </div>
    );
};

export default SignupCode;