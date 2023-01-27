import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { FriendsListAndDemandItemProps, User } from "../../interfaces/Types";
import { UserAccountContext } from "../../provider/UserProvider";
import jwt_decode from "jwt-decode";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { blue } from '@mui/material/colors';
import axios from 'axios';

const FriendDemandItem: React.FC<FriendsListAndDemandItemProps> = (props) => {
    const {getSession} = useContext(UserAccountContext)
    const [friend, setFriend] = React.useState<User>();
    const [received, setReceived] = React.useState<boolean>(false);
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
        if (friendShipRequest.from.email !== connectedUser) {
            setFriend(friendShipRequest.from);
            setReceived(true);
            setLetter(friendShipRequest.from.firstname[0].toUpperCase());
        } else {
            setFriend(friendShipRequest.to);
            setReceived(false);
            setLetter(friendShipRequest.to.firstname[0].toUpperCase());
        }
    }, [friendShipRequest, connectedUser, getSession])

    function accept() {
        if (!friend) return alert('Une erreur est survenue !')
        axios.patch('/friendships', {fromId: friend.id, status: 'ACCEPTED'})
            .then(function (response) {
                props.getFriends(props.setTotalFriendsList, props.setFriendDemands, props.setFriendList, props.setLoading);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function refuse() {
        if (!friend) return alert('Une erreur est survenue !')
        axios.patch('/friendships', {fromId: friend.id, status: 'IGNORED'})
            .then(function (response) {
                props.getFriends(props.setTotalFriendsList, props.setFriendDemands, props.setFriendList, props.setLoading);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function remove () {
        if (!friendShipRequest) return alert('Une erreur est survenue !')
        axios.delete('/friendships/' + friendShipRequest.id)
        .then(function (response) {
            props.getFriends(props.setTotalFriendsList, props.setFriendDemands, props.setFriendList, props.setLoading);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div className="friend-demand-item">
            <ListItem
                key={0}
                secondaryAction={received ?
                    <div>
                      <IconButton aria-label="accept" onClick={accept}>
                            <DoneIcon />
                      </IconButton>
                      <IconButton aria-label="refuse" onClick={refuse}>
                            <CloseIcon />
                      </IconButton>
                    </div>
                    :
                    <div>
                        En attente...
                        <IconButton aria-label="delete" onClick={remove}>
                                <CloseIcon />
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
              <ListItemText id={friend?.email} primary={friend?.firstname + " " + friend?.lastname} />
            </ListItemButton>
          </ListItem>
        </div>
    );
}

export default FriendDemandItem;