import React, { useContext, useEffect } from 'react';
import "./NewsFeed.css";
import TextField from '@mui/material/TextField';
import { Fab, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserAccountContext } from '../../provider/UserProvider';
import NewsFeedCard, { Post } from './NewsFeedCard';
import axios from 'axios';

const getPosts = (setPosts: React.Dispatch<React.SetStateAction<[] | Post[]>>) => {
    axios.get('/posts')
    .then(function (response) {
        const posts = response.data;
        posts.sort((a: any, b: any) => {
            return b.id - a.id;
        });
        setPosts(posts);
        
    })
    .catch(function (error) {
    console.log(error);
    });
};

const NewsFeed: React.FC = () => {    
    const navigate = useNavigate();
    const {getSession} = useContext(UserAccountContext)
    const [posts, setPosts] = React.useState<Post[] | []>([])
    const [text, setText] = React.useState('')
    
    useEffect(() => {
        getSession().then((res: any) => {
            if (!res) {
                navigate('/login')
            }
        });
    // console.log(res.session.getIdToken().getJwtToken())

        if (posts.length === 0) {
            getPosts(setPosts)
        }
    }, [getSession, navigate, posts.length]);

    function changeText(event: React.ChangeEvent<HTMLInputElement>) {
        setText(event.target.value);
    }

    function sendPost() {
        if (text === '') {
            return alert('Veuillez écrire un message avant de publier !')
        }
        const data = {
            htmlContent: text,
            userId: 15
        };
        axios.post('/posts', data)
          .then(function (response) {
            setPosts([])
            setText('');
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <div className='main-container'>
            <div className='add-new-publication-container'>
                <TextField fullWidth label="Publication Rapide" id="quickPost"
                onChange={changeText}
                value={text}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" onClick={sendPost}>
                        <Fab color="inherit" aria-label="add" size='small'>
                            <span className='add-button-text'> {'>'} </span>
                        </Fab>
                      </InputAdornment>
                    ),
                  }} />
            </div>
            {/* <div className='add-button'>
                <Fab color="default" aria-label="add" size='large'>
                    <span className='add-button-text'>+</span>
                </Fab>
            </div> */}
            <div className='publication-feed-container'>
                <div className='feed-block'>

                {posts.map((value, index) =>    
                    <div className='feed-card' key={index}>
                        <NewsFeedCard value={value} getPosts={getPosts} setPosts={setPosts} posts={posts}></NewsFeedCard>
                    </div>
                )}
                
                    {/* 
                    <div className='feed-card'>
                        <NewsFeedCard></NewsFeedCard>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default NewsFeed;