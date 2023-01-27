import React, { useContext } from 'react';
import { CircularProgress, List, TextField } from '@mui/material';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from 'axios';
import { a11yProps, TabPanel } from '../profile/Profile';
import { blue } from '@mui/material/colors';
import "./Friendship.css";
import { Friend, User } from '../../interfaces/Types';
import FriendDemandItem from './FriendDemandItem';
import FriendsListItem from './FriendsListItem';
import SearchPeopleItem from './SearchPeopleItem';
import jwt_decode from "jwt-decode";
import { UserAccountContext } from '../../provider/UserProvider';

const getFriends = (setTotalFriendsList: React.Dispatch<React.SetStateAction<[] | Friend[]>> , setFriendDemands: React.Dispatch<React.SetStateAction<[] | Friend[]>>, setFriendList: React.Dispatch<React.SetStateAction<[] | Friend[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    axios.get('/friendships')
    .then(function (response) {
        setTotalFriendsList(response.data);
        const requests = response.data.filter((friendship: Friend) => friendship.status === 'PENDING');
        const friends = response.data.filter((friendship: Friend) => friendship.status === 'ACCEPTED');
        setFriendDemands(requests);
        setFriendList(friends);
        setLoading(false);
    })
    .catch(function (error) {
        console.log(error);
    });
}

const Friendship: React.FC = () => {
    const {getSession} = useContext(UserAccountContext)
    const [value, setValue] = React.useState(0);
    const [totalFriendsList, setTotalFriendsList] = React.useState<Friend[]>([]);
    const [friendDemands, setFriendDemands] = React.useState<Friend[]>([]);
    const [friendList, setFriendList] = React.useState<Friend[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [text, setText] = React.useState('');
    const [searchResponse, setSearchResponse] = React.useState<User[]>([]);
    const [searchDone, setSearchDone] = React.useState(false);
    const [connectedUser, setConnectedUser] = React.useState('');

    React.useEffect(() => {
        const session = getSession()
        if (session) {                
            const token = session.idToken.jwtToken;
            const decoded: {email: string} = jwt_decode(token);
            setConnectedUser(decoded?.email)
        }
        getFriends(setTotalFriendsList, setFriendDemands, setFriendList, setLoading);
    }, [getSession]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    function search(event: React.ChangeEvent<HTMLInputElement>) {
        const searchText = event.target.value;
        setText(event.target.value);        
        if (searchText === '') {
            setSearchDone(false);
            setSearchResponse([]);
            setText('');
        } else {
            const data = {
                research: searchText,
            };
            axios.post('/users/search-users', data)
              .then(function (response) {
                const users = response.data;
                const totalFriendsListIdFrom = totalFriendsList.filter((friend: Friend) => friend.status !== 'IGNORED').map((friendship: Friend) => friendship.fromId);
                const totalFriendsListIdTo = totalFriendsList.filter((friend: Friend) => friend.status !== 'IGNORED').map((friendship: Friend) => friendship.toId);
                const totalFriendsListId = totalFriendsListIdFrom.concat(totalFriendsListIdTo);
                for (let i = 0; i < users.length; i++) {
                    if (users[i].email === connectedUser) {
                        users.splice(i, 1);
                    }
                    if (totalFriendsListId.includes(users[i].id)) {
                        users.splice(i, 1);
                    }
                }
                setSearchResponse(users);
                setSearchDone(true);
              })
              .catch(function (error) {
                console.log(error);
              });
        }
        
    }

    return (
        <div>
            {loading && <div className="loading"><CircularProgress /></div>}
            {!loading &&
            <div className='main-container'>
                {!loading && <div className='add-new-publication-container'>
                    <TextField fullWidth label="Recherche" id="quickPost"
                    onChange={search}
                    value={text}
                />
                </div>}
                {!loading && searchDone &&<div className='search-result-container'>
                    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {searchResponse.map((value, index) =>    
                            <div className='feed-card' key={index}>
                                <SearchPeopleItem value={value} getFriends={getFriends} setTotalFriendsList={setTotalFriendsList} setFriendDemands={setFriendDemands} setFriendList={setFriendList} setLoading={setLoading} setSearchResponse={setSearchResponse} searchResponse={searchResponse} ></SearchPeopleItem>
                            </div>
                        )}
                    </List>
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
                                        <FriendsListItem value={value} getFriends={getFriends} setTotalFriendsList={setTotalFriendsList} setFriendDemands={setFriendDemands} setFriendList={setFriendList} setLoading={setLoading} ></FriendsListItem>
                                    </div>
                                )}
                            </List>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                {friendDemands.map((value, index) =>    
                                    <div className='feed-card' key={index}>
                                        <FriendDemandItem value={value} getFriends={getFriends} setTotalFriendsList={setTotalFriendsList} setFriendDemands={setFriendDemands} setFriendList={setFriendList} setLoading={setLoading} ></FriendDemandItem>
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


