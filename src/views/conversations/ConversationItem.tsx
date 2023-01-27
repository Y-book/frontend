import React, { useContext, useEffect } from 'react';
import { Conversation, User } from "../../interfaces/Types";
import { blue } from '@mui/material/colors';
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { UserAccountContext } from '../../provider/UserProvider';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const ConversationItem: React.FC<{conversation: Conversation}> = (props) => {
    const navigate = useNavigate();
    const {getSession} = useContext(UserAccountContext)
    const [user, setUser] = React.useState<User>();
    const [friend, setFriend] = React.useState<User>();
    const [letter, setLetter] = React.useState<string | undefined>('');

    const { conversation } = props;
    const { messages } = conversation;

    useEffect(() => {
        const session = getSession()
        if (session) {                
            const token = session.idToken.jwtToken;
            const decoded: {email: string} = jwt_decode(token);
            if (conversation.from.email === decoded.email) {
                setFriend(conversation.to);
                setUser(conversation.from);
                setLetter(conversation.to.firstname[0].toUpperCase());
            } else {
                setFriend(conversation.from);
                setUser(conversation.to);
                setLetter(conversation.from.firstname[0].toUpperCase());
            }
        }
        messages.sort((a, b) => {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        })
    }, [getSession, conversation.from, conversation.to, messages])
    
    function goToMessages () {
        navigate('/conversation', {state: {conversation: conversation, user: user}})
    }
    
    return (
        <ListItem alignItems="flex-start" sx={{borderBottom: '1px solid grey'}} onClick={goToMessages}>
            <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: 'black' }} aria-label="recipe">
                        {letter}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={friend?.firstname + ' ' + friend?.lastname}
                secondary={
                    <React.Fragment>
                    <Typography
                        sx={{ display: 'inline', width: '100%' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                    </Typography>
                    {conversation.messages.length > 0 ?
                        messages[messages.length -1].from.firstname + " " + messages[messages.length -1].from.lastname + " - " + messages[messages.length -1].content :
                        "Vous n'avez pas encore échangé avec " + friend?.firstname + ' ' + friend?.lastname
                    }
                    </React.Fragment>
                }
            />
        </ListItem>
    )
}

export default ConversationItem;