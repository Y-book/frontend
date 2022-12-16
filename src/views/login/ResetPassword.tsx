import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { userPool } from '../../index';

const ResetPassword: React.FC = () => {
    const navigate = useNavigate();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [code, setCode] = React.useState('');
    const [mailSent, setMailSent] = React.useState(false);

    function changeMail(event: React.ChangeEvent<HTMLInputElement>) {      
        setEmail(event.target.value);
    }

    function changePassword(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    function changeCode(event: React.ChangeEvent<HTMLInputElement>) {
        setCode(event.target.value);
    }

    function getCognitoUser() {
        const userData = {
            Username: email,
            Pool: userPool,
        };

        return new CognitoUser(userData);
    }

    function follow() {
        if (email === '') {
            alert('Merci de renseigner votre adresse mail');
        } else {
            const cognitoUser = getCognitoUser();
    
            cognitoUser.forgotPassword({
                onSuccess: function() {
                    setMailSent(true);
                },
                onFailure: function(err) {
                    alert(err);
                },
            });
        }
    }

    function confirm() {
        if (email === '' || code === '' || password === '') {
            alert('Merci de renseigner tous les champs');
        } else {
            const cognitoUser = getCognitoUser();

            cognitoUser.confirmPassword(code, password, {
                onFailure: function(err) {
                    alert(err);
                },
                onSuccess: function() {
                    navigate('/login');
                },
            });
        }
    }

    return (
        <div className='main-container'>
            <p>Mot de passe oublié</p>
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
                { mailSent ? (<div>
                    <div>
                        <TextField label="Code" id="outlined-size-normal" onChange={changeCode} />
                    </div>
                    <div>
                        <TextField label="Mot de passe" id="outlined-size-normal" onChange={changePassword} />
                    </div>
                </div>) : (<div></div>) }
                
            </Box>
            { !mailSent ? (<div>
                <Button color='inherit' variant="contained" onClick={follow}>Continuer</Button>
                    </div>) : (<div>
                <Button color='inherit' variant="contained" onClick={confirm}>Confirmer</Button>
                    </div>) }
            
        </div>
    );
};

export default ResetPassword;