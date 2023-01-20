import "./Comments.css";
import React, { useEffect } from 'react';
import axios from 'axios';
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { grey } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { Comment, CommentsProps, User } from "../../interfaces/Types";

const Comments: React.FC<CommentsProps> = (props) => { 
    const navigate = useNavigate();
    const [letter, setLetter] = React.useState('');
    const [edit, setEdit] = React.useState(false);
    const [user, setUser] = React.useState<User>();
    const [text, setText] = React.useState(props.comment.text);
    const [comment] = React.useState<Comment>(props.comment);

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
            props.getPosts(props.setPosts, props.profile, props.type);
            props.setComments(props.comments.filter((item) => item.id !== comment.id));
        })
    }

    function confirmEdit () {
        const data = {
            text: text,
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