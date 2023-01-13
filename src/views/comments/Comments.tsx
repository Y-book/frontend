import "./Comments.css";
import React, { useContext, useEffect } from 'react';
import { UserAccountContext } from '../../provider/UserProvider';
import axios from 'axios';
import { Comment, Post, User } from '../newsfeed/NewsFeedCard';
import { Avatar, Card, CardContent, CardHeader, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from "@mui/material";
import { grey } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';


type Props = {
    value: Comment,
    connectedUser: string,
    getComments: (post: Post, setComments: React.Dispatch<React.SetStateAction<[] | Comment[]>>, comments: Comment[]) => void,
    post: Post,
    setComments: React.Dispatch<React.SetStateAction<[] | Comment[]>>,
    comments: Comment[],
}

const Comments: React.FC<Props> = (props) => { 
    const navigate = useNavigate();
    const [letter, setLetter] = React.useState('');
    const [edit, setEdit] = React.useState(false);
    const [user, setUser] = React.useState<User>();
    const [text, setText] = React.useState(props.value.text);

    const comment = props.value;

    // const comment = {   
    //     id: 1,
    //     createdAt: "2021-09-01T15:00:00.000Z",
    //     updatedAt: "2021-09-01T15:00:00.000Z",
    //     userId: 15,
    //     postId: 21,
    //     text: "Finally !",
    // };

    const connectedUser = props.connectedUser;
    if (connectedUser === '') {
        navigate('/login');
    }

    useEffect(() => {
        if (!user) {
            axios.get('/users/' + comment.userId)
            .then(function (response) {
                setUser(response.data);
                setLetter(response.data.firstname[0].toUpperCase());
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        
    }, [user, comment.userId])

    function changeText(event: React.ChangeEvent<HTMLInputElement>) {
        setText(event.target.value);
    }

    const openEdit = () => {
        setEdit(true);
    }

    const deleteItem = () => {
        axios.delete('/comments/' + comment.id)
        .then(function (response) {
            props.getComments(props.post, props.setComments, props.comments);
        })
    }

    function confirmEdit () {
        const data = {
            text: text,
            userId: 15,
            postId: comment.postId,
        };
        
        axios.patch('/comments/' + comment.id, data)
        .then(function (response) {
            setEdit(false);
            comment.text = text;
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    function closeEdit () {
        setEdit(false);
    }

    return (        
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
                <Avatar sx={{ bgcolor: grey[500] }} aria-label="recipe">
                {letter}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
            secondary={
                <React.Fragment>
                <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                >
                    {user && user.firstname && user.lastname ? user.firstname + ' ' + user.lastname : ''}
                    <span style={{float: 'right'}}>
                        {!edit ? 
                        <span>
                            <IconButton aria-label="edit" onClick={openEdit}>
                                <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete" onClick={deleteItem}>
                                <DeleteIcon />
                            </IconButton>
                        </span>
                        : 
                        <span>
                            <IconButton aria-label="confirm" onClick={confirmEdit}>
                                <DoneIcon />
                            </IconButton>
                            <IconButton aria-label="close" onClick={closeEdit}>
                                <CloseIcon />
                            </IconButton>
                        </span>}
                    </span>
                </Typography>
                <br />
                {edit ? 
                    <input type="text" value={text} id="quickEditComment"
                    onChange={changeText} />
                     : 
                <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                >
                    {`${comment.text}`}
                </Typography>   
            }             
                </React.Fragment>
            }
            />
        </ListItem>
        
    );
};

export default Comments;