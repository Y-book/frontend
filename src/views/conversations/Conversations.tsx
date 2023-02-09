import React, {useEffect} from "react";
import axios from "axios";
import { blue } from '@mui/material/colors';
import { Conversation } from "../../interfaces/Types";
import ConversationItem from "./ConversationItem";
import { CircularProgress, List } from "@mui/material";

const Conversations: React.FC = () => {
    const [conversations, setConversations] = React.useState<[] | Conversation[]>([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        if (conversations.length === 0) {
            axios.get('/conversations')
            .then(function (response) {
                setConversations(response.data);
                setLoading(false);
            })
            .catch(function (error) {
            console.log(error);
            });
        }
    }, [conversations.length]);

    return (
        <div className='main-container' style={{width: '100%'}}>
            {loading && <div className="loading"><CircularProgress /></div>}
            {!loading &&
            <div className='conversation-block' style={{backgroundColor: 'background.paper', position: 'fixed', top: "50px", width: "100%"}}>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {conversations.map((value, index) =>    
                        <ConversationItem conversation={value} key={index} />
                    )}
                </List>
            </div>}
        </div>
    );
}

export default Conversations;