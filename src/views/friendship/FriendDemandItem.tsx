import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { User } from "../../interfaces/Types";
import { UserAccountContext } from "../../provider/UserProvider";
import jwt_decode from "jwt-decode";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { blue } from '@mui/material/colors';

const FriendDemandItem: React.FC<{value: any}> = (props) => {
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

    function accept () {
        console.log("accept");
    }

    function refuse () {
        console.log("refuse");
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