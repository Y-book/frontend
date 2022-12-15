import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import "./Signup.css";
import { Link, useNavigate } from 'react-router-dom';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { userPool } from '../../index';

const Signup: React.FC = () => {
    const navigate = useNavigate();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');

    function changeFirstname(event: React.ChangeEvent<HTMLInputElement>) {
        setFirstName(event.target.value);
    }

    function changeLastname(event: React.ChangeEvent<HTMLInputElement>) {
        setLastName(event.target.value);
    }

    function changeMail(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    function changePassword(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    function changePasswordConfirm(event: React.ChangeEvent<HTMLInputElement>) {
        setPasswordConfirm(event.target.value);
    }

    function connection() {
        if (password === passwordConfirm) {
            console.log(firstName);
            console.log(lastName);
            console.log(email);
            console.log(password);
            console.log(passwordConfirm);
            const name = lastName;
            const given_name = firstName;
            const user_name=new CognitoUserAttribute({Name:"name",Value:name});
            const user_given_name=new CognitoUserAttribute({Name:"given_name",Value:given_name});
            const user_email=new CognitoUserAttribute({Name:"email",Value:email});
            console.log(email, password, name, given_name, email);
            userPool.signUp(email, password, [user_name,user_given_name,user_email], [], (err, data) => {
                      if (err) {
                        console.error(err);
                      } else {
                        console.log(data);
                        navigate('/code', { state: { email: email } });
                      }
                    });
            navigate('/code', { state: { email: email } });
        } else {
            alert("Les mots de passe ne correspondent pas");
        }
    }

    return (
        <div className='main-container'>
            <p>Sign Up</p>
            <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
                <div>
                    <TextField label="Prénom" id="outlined-size-normal" onChange={changeFirstname} />
                </div>
                <div>
                    <TextField label="Nom" id="outlined-size-normal" onChange={changeLastname} />
                </div>
                <div>
                    <TextField label="E-mail" id="outlined-size-normal" onChange={changeMail} />
                </div>
                <div>
                    <TextField label="Mot de passe" id="outlined-size-normal" onChange={changePassword} />
                </div>
                <div>
                    <TextField label="Mot de passe" id="outlined-size-normal" onChange={changePasswordConfirm} />
                </div>
            </Box>
            <Button color='inherit' variant="contained" onClick={connection}>S'enregistrer</Button>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                <div className='connexion-other'>
                    <Link to="/login"> Se connecter </Link>
                </div>
            </Box>
        </div>
    );
};

export default Signup;