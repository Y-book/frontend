import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { SearchPeopleItemProps } from "../../interfaces/Types";
import { UserAccountContext } from "../../provider/UserProvider";
import jwt_decode from "jwt-decode";
import { blue } from '@mui/material/colors';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';

const SearchPeopleItem: React.FC<SearchPeopleItemProps> = (props) => {
    const {getSession} = useContext(UserAccountContext)
    const [connectedUser, setConnectedUser] = React.useState('');
    const [letter, setLetter] = React.useState<string | undefined>('');

    const friendShipRequest = props.value;    
    
    useEffect(() => {
        const session = getSession()
        if (session) {                
            const token = session.idToken.jwtToken;
            const decoded: {email: string} = jwt_decode(token);
            setConnectedUser(decoded?.email)
        }
        setLetter(friendShipRequest.firstname[0].toUpperCase());
    }, [friendShipRequest, connectedUser, getSession])

    function sendRequest () {        
        axios.post('/friendships', {toId: friendShipRequest.id})
            .then(() => {
                props.getFriends(props.setTotalFriendsList, props.setFriendDemands, props.setFriendList, props.setLoading);
                props.setSearchResponse(props.searchResponse.filter((user) => user.id !== friendShipRequest.id));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div className="friend-search-item">
            <ListItem
                key={0}
                secondaryAction={
                    <div>
                      <IconButton aria-label="accept" onClick={sendRequest}>
                            <PersonAddIcon />
                      </IconButton>
                    </div>
                }
                disablePadding
            >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: 'black' }} aria-label="recipe">
                    {letter}
                </Avatar>
              </ListItemAvatar>
              <ListItemText id={friendShipRequest?.email} primary={friendShipRequest?.firstname + " " + friendShipRequest?.lastname} />
            </ListItemButton>
          </ListItem>
        </div>
    );
}

export default SearchPeopleItem;