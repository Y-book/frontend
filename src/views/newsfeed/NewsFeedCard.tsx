import React, { useContext, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { blue } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { UserAccountContext } from '../../provider/UserProvider';
import jwt_decode from "jwt-decode";
import { Divider, Fab, InputAdornment, TextField } from '@mui/material';
import Comments from '../comments/Comments';
import { useNavigate } from 'react-router-dom';
import "./NewsFeed.css";
import parse from 'html-react-parser';
import { ExpandMoreProps, Like, PostsProps } from '../../interfaces/Types';
  
  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  function dateCompare(createdAt: string){
    const today = new Date();
    const postDate = new Date(createdAt);

    const todayDate = today.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    const postDateFormat = postDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })

    if (todayDate === postDateFormat) {
        const todayHours = today.getHours();
        const postHours = postDate.getHours();
        if (todayHours === postHours) {
            return "il y a quelques minutes";
        } else {
            return `il y a ${todayHours - postHours} heures`;
        }
    } else {
        return `le ${postDateFormat}`;
    }
}

const NewsFeedCard: React.FC<PostsProps> = (props) => {
    const navigate = useNavigate();
    const {getSession} = useContext(UserAccountContext)
    const [expanded, setExpanded] = React.useState(false);
    const [connectedUser, setConnectedUser] = React.useState('');
    const [edit, setEdit] = React.useState(false);
    const [text, setText] = React.useState(props.post.htmlContent);
    const [like, setLike] = React.useState(false);
    const [likeCount, setLikeCount] = React.useState(props.post._count.postLikes);
    const [likeData, setLikeData] = React.useState<Like | any>({});
    const [comments, setComments] = React.useState([...props.post.postComments]);
    const [comment, setComment] = React.useState('');
    const post = props.post;
    const user = props.post.user;
    const letter = user.firstname[0].toUpperCase();
    const date = dateCompare(props.post.createdAt);   

    useEffect(() => {
        const session = getSession()
            if (session) {                
                const token = session.idToken.jwtToken;
                const decoded: {email: string} = jwt_decode(token);
                setConnectedUser(decoded?.email)
            } else {
                navigate('/login');
            }
        axios.get('/likes/' + post.id)
        .then(function (response) {
            if (response.data[0]) {
                setLike(true);
                setLikeData(response.data[0]);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [getSession, post.createdAt, post.userId, user, post.id, comments, navigate])

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const openEdit = () => {
        setEdit(true);
    }

    const deleteItem = async () => {
        axios.delete('/posts/' + post.id)
        .then(function (response) {
            props.getPosts(props.setPosts, props.profile, props.type);
        })
    }
    
    function changeText(event: React.ChangeEvent<HTMLInputElement>) {
        setText(event.target.value);
    }

    function changeCommentText(event: React.ChangeEvent<HTMLInputElement>) {
        setComment(event.target.value);
    }

    function confirmEdit () {
        const data = {
            htmlContent: text,
        };
        
        axios.patch('/posts/' + post.id, data)
        .then(function () {
            setEdit(false);
            post.htmlContent = text;
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    function closeEdit () {
        setEdit(false);
    }

    function sendComment() {
        if (comment === '') {
            return alert('Veuillez écrire un commentaire');
        }
        const data = {
            text: comment,
            postId: post.id
        };
        axios.post('/comments', data)
          .then(function (response) {
            setComment('');
            setComments([...comments, response.data])
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    function handleLike () {
        const data = {
            postId: post.id,
        };

        if (like) {
            axios.delete('/likes/' + likeData.id)
            .then(function (response) {
                setLike(false);
                setLikeCount(likeCount - 1);
                setLikeData({});
            })
            .catch(function (error) {
                console.log(error);
            });
        } else {
            axios.post('/likes', data)
            .then(function (response) {
                setLike(true);
                setLikeCount(likeCount + 1);
                setLikeData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    function handleKeyPressToEditPost (event: React.KeyboardEvent<HTMLDivElement>) {
        if(event.key === 'Enter'){
            confirmEdit();
        }
    }

    function handleKeyPressToSendComment (event: React.KeyboardEvent<HTMLDivElement>) {
        if(event.key === 'Enter'){
            sendComment();
        }
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: blue[100], color: 'black' }} aria-label="recipe">
                    {letter}
                </Avatar>
                }
                action={connectedUser && user && connectedUser === user.email ? 
                <div>
                    {!edit ? 
                    <div>
                        <IconButton aria-label="edit" onClick={openEdit}>
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={deleteItem}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                    : 
                    <div>
                        <IconButton aria-label="confirm" onClick={confirmEdit}>
                            <DoneIcon />
                        </IconButton>
                        <IconButton aria-label="close" onClick={closeEdit}>
                            <CloseIcon />
                        </IconButton>
                    </div>}
                </div>
                : <div></div>}
                title={user && user.firstname && user.lastname ? user.firstname + ' ' + user.lastname : ''}
                subheader={date ? "Publié " + date : ''}
            />
            <CardContent>
                
            {edit ? <div>
                <TextField fullWidth value={text} id="quickEditPost"
                onKeyPress={handleKeyPressToEditPost}
                onChange={changeText} />
            </div> : 
            <div color="text.secondary">
                {parse(post.htmlContent)}
            </div>
            }
                
            </CardContent>
            <CardActions disableSpacing>
                {connectedUser && user && connectedUser !== user.email ?
                <IconButton aria-label="add to favorites" onClick={handleLike}>
                    {like ? <FavoriteIcon style={{ color: 'red' }} /> :
                    <FavoriteIcon />} <span className='comments-count'>{likeCount}</span>
                </IconButton> :
                <IconButton aria-label="add to favorites">
                    {like ? <FavoriteIcon style={{ color: 'red' }} /> :
                    <FavoriteIcon />} <span className='comments-count'>{likeCount}</span>
                </IconButton>}
                <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <div className='add-new-publication-container'>
                    <TextField fullWidth label="Commentaire" id="quickComment"
                    onChange={changeCommentText}
                    onKeyPress={handleKeyPressToSendComment}
                    value={comment}
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end" onClick={sendComment}>
                            <Fab color="inherit" aria-label="add" size='small'>
                                <span className='add-button-text'> {'>'} </span>
                            </Fab>
                        </InputAdornment>
                        ),
                    }} />
                </div>
                <CardContent>
                    {comments.map((value, index) =>    
                            <div key={index}>
                                <Divider />
                                <Comments comment={value} connectedUser={connectedUser} setComments={setComments} comments={comments}></Comments>
                            </div>
                        )}
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default NewsFeedCard;