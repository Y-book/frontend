import { CircularProgress, Fab, InputAdornment, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Conversation, Message } from "../../interfaces/Types";
import './Messages.css';
import axios from 'axios';
import connect from 'socket.io-client';

const socket = connect("http://127.0.0.1:8000")

const getConversation = (conversationId: number, setConversation: React.Dispatch<Conversation>, setMessages: React.Dispatch<Message[]>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    axios.get('/conversations/' + conversationId)
    .then(function (response) {
        setConversation(response.data);
        setMessages(response.data.messages)
        setLoading(false);
    })
    .catch(function (error) {
    console.log(error);
    });
}

const Messages: React.FC = () => {
    const location = useLocation();
    const { user } = location.state;
    const [conversation, setConversation] = React.useState<Conversation | any>({});
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [text, setText] = React.useState('');
    const lastsentMessageReference = React.useRef<any>(null);

    useEffect(() => {
        getConversation(location.state.conversation.id, setConversation, setMessages, setLoading)
        socket.emit('conv', conversation.id);
        socket.on('receive_message', () => {
            getConversation(location.state.conversation.id, setConversation, setMessages, setLoading)
        });
        lastsentMessageReference.current?.scrollIntoView({ behavior: 'smooth' })
    }, [location.state.conversation, conversation.id, messages]);

    function changeText(event: React.ChangeEvent<HTMLInputElement>) {
        setText(event.target.value);
    }

    function handleKeyPressToSend (event: React.KeyboardEvent<HTMLDivElement>) {
        if(event.key === 'Enter'){
            send();
        }
    }

    function send() {
        if (text === '') {
            return alert('Veuillez écrire un commentaire');
        }

        const data = {
            content: text,
            conversationId: conversation.id,
        };

        axios.post('/messages', data)
          .then(async function (response) {
            await socket.emit('send_message', response.data);
            getConversation(location.state.conversation.id, setConversation, setMessages, setLoading)
            setText('');
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    
    return (
        <div>
            {loading && <div className="loading"><CircularProgress /></div>}
            {!loading &&
                <div className="chat-container">
                    <ul className="chat">
                        {messages.map((value: Message, index: number) =>
                            value.from.id === user.id ? ( 
                            <li className="message right" key={index}>
                                <p className="name">{value.from.firstname} {value.from.lastname}</p>
                                <p>{value.content}</p>
                            </li>
                            ) : (
                                <li className="message left" key={index}>
                                <p className="name">{value.from.firstname} {value.from.lastname}</p>
                                <p>{value.content}</p>
                            </li>
                            )
                        )}
                        <div ref={lastsentMessageReference}></div>
                    </ul>
                    
                </div>
            }
            <div className='text_input'>
                <TextField fullWidth label="Message" id="quickComment"
                onChange={changeText}
                onKeyPress={handleKeyPressToSend}
                value={text}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end" onClick={send}>
                        <Fab color="inherit" aria-label="add" size='small'>
                            <span className='add-button-text'> {'>'} </span>
                        </Fab>
                    </InputAdornment>
                    ),
                }} />
            </div>
        </div>
    );
}

export default Messages;