import React, { useContext, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
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

type Props = {
    post: Post,
    getPosts: (setPosts: React.Dispatch<React.SetStateAction<[] | Post[]>>) => void,
    setPosts: React.Dispatch<React.SetStateAction<[] | Post[]>>,
    posts: Post[],
}

export type Post = {
    id: number,
    createdAt: string,
    updatedAt: string,
    userId: number,
    htmlContent: string,
    _count: {
        postComments: number,
        postLikes: number,
    },
    _liked: boolean,
    postComments: Comment[],
}

export type User = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
}

export type Comment = {
    id: number,
    createdAt: string,
    updatedAt: string,
    userId: number,
    postId: number,
    text: string,
}


interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }
  
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

const NewsFeedCard: React.FC<Props> = (props) => {
    const navigate = useNavigate();
    const {getSession} = useContext(UserAccountContext)
    const [expanded, setExpanded] = React.useState(false);
    const [user, setUser] = React.useState<User>();
    const [letter, setLetter] = React.useState('');
    const [date, setDate] = React.useState('');
    const [connectedUser, setConnectedUser] = React.useState('');
    const [edit, setEdit] = React.useState(false);
    const [text, setText] = React.useState(props.post.htmlContent);
    const [like, setLike] = React.useState(false);
    const [likeCount, setLikeCount] = React.useState(props.post._count.postLikes);
    const [likeData, setLikeData] = React.useState<any>({});
    const [comments, setComments] = React.useState(props.post.postComments);
    const [comment, setComment] = React.useState('');
    const [post] = React.useState(props.post);

    useEffect(() => {
        const session = getSession()
            if (session) {                
                const token = session.idToken.jwtToken;
                const decoded: {email: string} = jwt_decode(token);
                setConnectedUser(decoded?.email)
            } else {
                navigate('/login');
            }
        
        if (!user) {
            axios.get('/users/' + post.userId)
            .then(function (response) {
                setUser(response.data);
                setLetter(response.data.firstname[0].toUpperCase());
                const finalDate = dateCompare(post.createdAt)
                setDate(finalDate);
            })
            .catch(function (error) {
                console.log(error);
            });
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

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const openEdit = () => {
        setEdit(true);
    }

    const deleteItem = async () => {
        axios.delete('/posts/' + post.id)
        .then(function (response) {
            props.getPosts(props.setPosts);
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
        .then(function (response) {
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

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: grey[500] }} aria-label="recipe">
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

            {/* <CardMedia
                component="img"
                height="194"
                image="/static/images/cards/paella.jpg"
                alt="Paella dish"
            /> */}
            <CardContent>
                
            {edit ? <div>
                <TextField fullWidth value={text} id="quickEditPost"
                onChange={changeText} />
            </div> : 
            <Typography variant="body2" color="text.secondary">
                {post.htmlContent}
            </Typography>
            }
                
            </CardContent>
            <CardActions disableSpacing>
                {connectedUser && user && connectedUser !== user.email ?
                <IconButton aria-label="add to favorites" onClick={handleLike}>
                    <FavoriteIcon /> <span className='comments-count'>{likeCount}</span>
                </IconButton> : <IconButton aria-label="add to favorites">
                    <FavoriteIcon /> <span className='comments-count'>{likeCount}</span>
                </IconButton>}
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
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
                <div className='add-button'>
                    <Fab color="default" aria-label="add" size='large'>
                        <span className='add-button-text'>+</span>
                    </Fab>
                </div>
                <CardContent>
                    {comments.map((value, index) =>    
                            <div key={index}>
                                <Divider />
                                <Comments comment={value} connectedUser={connectedUser} getPosts={props.getPosts} setPosts={props.setPosts} setComments={setComments} comments={comments}></Comments>
                            </div>
                        )}
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default NewsFeedCard;