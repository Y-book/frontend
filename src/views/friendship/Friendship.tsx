import React, { useContext } from 'react';
import { } from '@mui/material';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from 'axios';
import { UserAccountContext } from '../../provider/UserProvider';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

interface LinkTabProps {
    label: string;
    link: string;
}

type User = {
    id: number;
    firstname: string;
    lastname: string;
}

const Friendship: React.FC = () => {
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const [connectedUser, setConnectedUser] = React.useState('');
    const {getSession} = useContext(UserAccountContext)
    const navigate = useNavigate();
    const [user, setUser] = React.useState<User>();

    React.useEffect(() => {
        axios.get('/friendships/')
            .then(function (response) {
                setUser(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <Card sx={{ margin: 2}}>
                <CardContent>

                <Box>
                    <Tabs
                    value={value}
                    onChange={handleChange}
                    >
                        {/* <LinkTab link='/friendship' label="Liste d'ami(s)" />
                        <LinkTab link='/request' label="Demande(s) d'ami" /> */}
                    </Tabs>
                    <CardContent>
                        <div>
                            <h1>Amis</h1>
                            <ul>
                                {/* {user?.map((user: User) => (
                                    <li key={user.firstname}>
                                        {user.firstname}
                                    </li>
                                ))} */}
                            </ul>
                        </div>
                    </CardContent>
                </Box>
                </CardContent>
            </Card>
        </div>
    );
};

export default Friendship;


