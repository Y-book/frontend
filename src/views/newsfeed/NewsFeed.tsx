import React, { useEffect } from 'react';
import "./NewsFeed.css";
import TextField from '@mui/material/TextField';
import { CircularProgress, Fab, InputAdornment } from '@mui/material';
import NewsFeedCard from './NewsFeedCard';
import axios from 'axios';
import { Post } from '../../interfaces/Types';
import { blue } from '@mui/material/colors';

const getPosts = (setPosts: React.Dispatch<React.SetStateAction<[] | Post[]>>, profile: boolean, type: string) => {
    if (profile && type === 'posts') {
        setPosts([]);
        axios.get('/posts')
        .then(function (response) {
            const posts = response.data;        
            if (posts.length > 1) {
                posts.sort((post1: any, post2: any) => {
                    return post2.id - post1.id;
                });
            }
            setPosts(posts);
            return posts;
        })
        .catch(function (error) {
        console.log(error);
        });
    } else if (profile && type === 'comments') {
        setPosts([]);
        axios.get('/posts/comments')
        .then(function (response) {
            const posts = response.data;        
            if (posts.length > 1) {
                posts.sort((post1: any, post2: any) => {
                    return post2.id - post1.id;
                });
            }
            setPosts(posts);
            return posts;
        })
        .catch(function (error) {
        console.log(error);
        });
    } else if (profile && type === 'likes') {
        setPosts([]);
        axios.get('/posts/likes')
        .then(function (response) {
            const posts = response.data;        
            if (posts.length > 1) {
                posts.sort((post1: any, post2: any) => {
                    return post2.id - post1.id;
                });
            }
            setPosts(posts);
            return posts;
        })
        .catch(function (error) {
        console.log(error);
        });
    } else {
        setPosts([]);
        axios.get('/posts/all')
        .then(function (response) {
            const posts = response.data;        
            if (posts.length > 1) {
                posts.sort((post1: any, post2: any) => {
                    return post2.id - post1.id;
                });
            }
            setPosts(posts);
            return posts;
        })
        .catch(function (error) {
        console.log(error);
        });
    }
};

const NewsFeed: React.FC<{profile: boolean, type: string}> = (props) => {    
    const [posts, setPosts] = React.useState<Post[] | []>([])
    const [text, setText] = React.useState('')
    const [loading, setLoading] = React.useState(true)
    const profile = props.profile;
    const type = props.type;
    
    useEffect(() => {
        if (posts.length === 0) {
            getPosts(setPosts, profile, type)
        }
        if (posts.length > 0) {
            setLoading(false)
        }
    }, [posts.length, profile, type, setPosts, setLoading]);

    function changeText(event: React.ChangeEvent<HTMLInputElement>) {
        setText(event.target.value);
    }

    function sendPost() {
        if (text === '') {
            return alert('Veuillez écrire un message avant de publier !')
        }
        const data = {
            htmlContent: text,
        };
        axios.post('/posts', data)
          .then(function (response) {
            getPosts(setPosts, profile, type)
            setText('');
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    function handleKeyPress (event: any) {
        if(event.key === 'Enter'){
            sendPost();
        }
    }

    return (
        <div className='main-container'>
            {loading && <div className="loading"><CircularProgress /></div>}
            {!loading && !profile && <div className='add-new-publication-container'>
                <TextField fullWidth label="Publication Rapide" id="quickPost"
                onChange={changeText}
                value={text}
                onKeyPress={handleKeyPress}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" onClick={sendPost}>
                        <Fab color="inherit" aria-label="add" size='small'>
                            <span className='add-button-text'> {'>'} </span>
                        </Fab>
                      </InputAdornment>
                    ),
                  }} />
            </div>}
            {/* <div className='add-button'>
                <Fab color="default" aria-label="add" size='large'>
                    <span className='add-button-text'>+</span>
                </Fab>
            </div> */}
            {!loading && !posts && <div className='no-publication-container'>Il n'y a aucun post</div>}
            {!loading && !profile &&
            <div className='publication-feed-container'>
                <div className='feed-block' style={{backgroundColor: blue[100]}}>

                {posts.map((value, index) =>    
                    <div className='feed-card' key={index}>
                        <NewsFeedCard post={value} getPosts={getPosts} setPosts={setPosts} profile={profile} type={type} posts={posts}></NewsFeedCard>
                    </div>
                )}
                </div>
            </div>}
            {!loading && profile &&
            <div className='publication-feed-container-for-profile'>
                <div className='feed-block' style={{backgroundColor: blue[100]}}>

                {posts.map((value, index) =>    
                    <div className='feed-card' key={index}>
                        <NewsFeedCard post={value} getPosts={getPosts} setPosts={setPosts} profile={profile} type={type} posts={posts}></NewsFeedCard>
                    </div>
                )}
                </div>
            </div>}
        </div>
    );
};

export default NewsFeed;