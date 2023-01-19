import React, { useEffect } from 'react';
import "./NewsFeed.css";
import TextField from '@mui/material/TextField';
import { Fab, InputAdornment } from '@mui/material';
import NewsFeedCard, { Post } from './NewsFeedCard';
import axios from 'axios';

const getPosts = (setPosts: React.Dispatch<React.SetStateAction<[] | Post[]>>) => {
    axios.get('/posts')
    .then(function (response) {
        const posts = response.data;
        posts.sort((post1: any, post2: any) => {
            return post2.id - post1.id;
        });
        setPosts(posts);
        return posts;
    })
    .catch(function (error) {
    console.log(error);
    });
};

const NewsFeed: React.FC = () => {    
    const [posts, setPosts] = React.useState<Post[] | []>([])
    const [text, setText] = React.useState('')
    
    useEffect(() => {
        if (posts.length === 0) {
            getPosts(setPosts)
        }
    }, []);

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
                        <NewsFeedCard post={value} getPosts={getPosts} setPosts={setPosts} posts={posts}></NewsFeedCard>
                    </div>
                )}
                </div>
            </div>
        </div>
    );
};

export default NewsFeed;