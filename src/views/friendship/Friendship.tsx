import React from 'react';
import { } from '@mui/material';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from 'axios';

interface LinkTabProps {
    label: string;
    link: string;
}

function LinkTab(props: LinkTabProps) {
    return (
        <Tab
            component="a"
            onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

const Friendship: React.FC = () => {

    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const userId=29;

    const [friendship, setFriendship] = React.useState([]);
    // let friend = "";

    // const friendship = props.value;

    React.useEffect(() => {
        axios.get('/friendships/' + userId)
            .then(function (response) {
                const friend = response.data;
                if (friend.length > 0) {
                    friend.sort((friend1: any, friend2: any) => {
                        return friend2.id - friend1.id;
                    });
                    console.log(response.data)
                    setFriendship(response.data);
                }
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
                        <LinkTab link='/friendship' label="Liste d'ami(s)" />
                        <LinkTab link='/' label="Demande(s) d'ami" />
                    </Tabs>
                </Box>
                </CardContent>
            </Card>
        </div>
    );
};

export default Friendship;