import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { User } from "../../interfaces/Types";
import { UserAccountContext } from "../../provider/UserProvider";
import jwt_decode from "jwt-decode";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { blue } from '@mui/material/colors';

const FriendsListItem: React.FC<{value: any}> = (props) => {
    const {getSession} = useContext(UserAccountContext)
    const [friend, setFriend] = React.useState<User>();
    const [received, setReceived] = React.useState<boolean>(false);
    const [connectedUser, setConnectedUser] = React.useState('');
    const [letter, setLetter] = React.useState<string | undefined>('');

    const friendShip = props.value;
    
    useEffect(() => {
        const session = getSession()
        if (session) {                
            const token = session.idToken.jwtToken;
            const decoded: {email: string} = jwt_decode(token);
            setConnectedUser(decoded?.email)
        }
        if (friendShip.from.email !== connectedUser) {
            setFriend(friendShip.from);
            setReceived(true);
            setLetter(friendShip.from.firstname[0].toUpperCase());
        } else {
            setFriend(friendShip.to);
            setReceived(false);
            setLetter(friendShip.to.firstname[0].toUpperCase());
        }
    }, [friendShip, connectedUser, getSession])

    function remove () {
        console.log("delete");
    }

    return (
        <div className="friend-demand-item">
            <ListItem
                key={0}
                secondaryAction={
                    <div>
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

export default FriendsListItem;