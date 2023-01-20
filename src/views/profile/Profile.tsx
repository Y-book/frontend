import { Avatar, Box, CircularProgress, Tab, Tabs } from "@mui/material";
import React, { useContext, useEffect } from "react";
import "./Profile.css";
import { blue } from '@mui/material/colors';
import { UserAccountContext } from "../../provider/UserProvider";
import jwt_decode from "jwt-decode";
import axios from 'axios';
import NewsFeed from "../newsfeed/NewsFeed";
import { useNavigate } from "react-router-dom";
import { TabPanelProps, User } from "../../interfaces/Types";

export function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box sx={{ p: 0 }}>
                <div>{children}</div>
            </Box>
        )}
        </div>
    );
}

export function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Profile: React.FC = () => { 
    const {getSession} = useContext(UserAccountContext)
    const navigate = useNavigate();
    const [connectedUser, setConnectedUser] = React.useState('');
    const [user, setUser] = React.useState<User>();
    const [letter, setLetter] = React.useState('');
    // const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [loading, setLoading] = React.useState(true);

    
    useEffect(() => {
        const session = getSession()
        if (session) {                
            const token = session.idToken.jwtToken;
            const decoded: {email: string} = jwt_decode(token);
            setConnectedUser(decoded?.email)
        }
        if (!user) {
            axios.get('/users/')
            .then(function (response) {
                setUser(response.data);
                setLetter(response.data.firstname[0].toUpperCase());
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }, [getSession, connectedUser, setConnectedUser, user])

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
      };

    const goToFriends = () => {
        navigate('/friendship')
    }

    return (
        <div>
            {loading && <div className="loading"><CircularProgress /></div>}
            {!loading &&
            <div className='main-container'>
                <div className="header-black"></div>
                <div className="header-image"></div>
                <div className="header-profile">
                    <div className="avatar">
                        <Avatar sx={{ bgcolor: blue[100], width: 70, height: 70, color: 'black' }} aria-label="recipe">
                            {letter}
                        </Avatar>
                    </div>
                    <div>
                        <p>{user?.firstname} {user?.lastname}</p>
                        <p className="link" onClick={goToFriends}>0 Amis</p>
                    </div>
                    {/* <div className="edit-icon">
                        <IconButton aria-label="edit" sx={{ color: grey[50] }}>
                            <EditIcon />
                        </IconButton>
                    </div> */}
                </div>
                <div className="page">
                    <div>

                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: blue[50]}}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Posts" {...a11yProps(0)} sx={{ width: '33.3%' }} />
                                <Tab label="Likes" {...a11yProps(1)} sx={{ width: '33.3%' }} />
                                <Tab label="Comments" {...a11yProps(2)} sx={{ width: '33.3%' }} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <NewsFeed profile={true} type={'posts'} />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <NewsFeed profile={true} type={'likes'} />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <NewsFeed profile={true} type={'comments'} />
                        </TabPanel>
                    </Box>

                    </div>
                </div>
            </div>
            }
        </div>
    );
};

export default Profile;