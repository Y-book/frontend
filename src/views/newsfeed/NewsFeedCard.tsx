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
import { Fab, InputAdornment, TextField } from '@mui/material';

type Props = {
    value: any;
}

type User = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
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
    const {getSession} = useContext(UserAccountContext)
    const [expanded, setExpanded] = React.useState(false);
    const [user, setUser] = React.useState<User>();
    const [letter, setLetter] = React.useState('');
    const [date, setDate] = React.useState('');
    const [connectedUser, setConnectedUser] = React.useState('');
    const [edit, setEdit] = React.useState(false);
    const [text, setText] = React.useState(props.value.htmlContent);

    const post = props.value;

    // let edit = false;

    useEffect(() => {
        getSession().then((res: any) => {
            if (res) {
                const token = res.session.idToken.jwtToken;
                const decoded: {email: string} = jwt_decode(token);
                setConnectedUser(decoded?.email)
            }
        });
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
    }, [])

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

    const deleteItem = () => {
        axios.delete('/posts/' + post.id)
    }
    
    function changeText(event: React.ChangeEvent<HTMLInputElement>) {
        setText(event.target.value);
    }

    function confirmEdit () {
        const data = {
            htmlContent: text,
        };
        
        axios.patch('/posts/' + post.id, data)
        .then(function (response) {
            setEdit(false);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    function closeEdit () {
        setEdit(false);
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
                    <IconButton aria-label="edit" onClick={confirmEdit}>
                        <DoneIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={closeEdit}>
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
            <TextField fullWidth value={text} id="quickText"
            onChange={changeText} />
        </div> : 
        <Typography variant="body2" color="text.secondary">
            {post.htmlContent}
        </Typography>
        }
            
        </CardContent>
        <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
                <FavoriteIcon />
            </IconButton>
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
            <CardContent>
                <Typography paragraph>Commentaires</Typography>
            </CardContent>
        </Collapse>
        </Card>
    );
};

export default NewsFeedCard;