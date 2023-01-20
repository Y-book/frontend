import React, { useContext } from 'react';
import { CircularProgress, Fab, InputAdornment, List, TextField } from '@mui/material';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from 'axios';
import { UserAccountContext } from '../../provider/UserProvider';
import { useNavigate } from 'react-router-dom';
import { a11yProps, TabPanel } from '../profile/Profile';
import { blue } from '@mui/material/colors';
import "./Friendship.css";
import { User } from '../../interfaces/Types';
import FriendDemandItem from './FriendDemandItem';
import FriendsListItem from './FriendsListItem';

const Friendship: React.FC = () => {
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const [friendDemands, setFriendDemands] = React.useState<User[]>([]);
    const [friendList, setFriendList] = React.useState<User[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [text, setText] = React.useState('');

    React.useEffect(() => {
        axios.get('/friendships')
            .then(function (response) {
                const requests = response.data.filter((friendship: any) => friendship.status === 'PENDING');
                const friends = response.data.filter((friendship: any) => friendship.status === 'ACCEPTED');
                setFriendDemands(requests);
                setFriendList(friends);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    function changeText(event: React.ChangeEvent<HTMLInputElement>) {
        setText(event.target.value);
    }

    return (
        <div>
            {loading && <div className="loading"><CircularProgress /></div>}
            {!loading &&
            <div className='main-container'>
                {!loading && <div className='add-new-publication-container'>
                    <TextField fullWidth label="Recherche" id="quickPost"
                    onChange={changeText}
                    value={text}
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                            <Fab color="inherit" aria-label="add" size='small'>
                                <span className='add-button-text'> {'>'} </span>
                            </Fab>
                        </InputAdornment>
                        ),
                    }} />
                </div>}
                <div className="page">
                    <div>

                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: blue[50]}}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Mes amis" {...a11yProps(0)} sx={{ width: '50%' }} />
                                <Tab label="Demandes" {...a11yProps(1)} sx={{ width: '50%' }} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                {friendList.map((value, index) =>    
                                    <div className='feed-card' key={index}>
                                        <FriendsListItem value={value} ></FriendsListItem>
                                    </div>
                                )}
                            </List>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                {friendDemands.map((value, index) =>    
                                    <div className='feed-card' key={index}>
                                        <FriendDemandItem value={value} ></FriendDemandItem>
                                    </div>
                                )}
                            </List>
                        </TabPanel>
                    </Box>

                    </div>
                </div>
            </div>
            }
        </div>
    );
};

export default Friendship;


