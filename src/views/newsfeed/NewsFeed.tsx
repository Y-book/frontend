import React, { useContext, useEffect } from 'react';
import "./NewsFeed.css";
import TextField from '@mui/material/TextField';
import { Fab, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserAccountContext } from '../../provider/UserProvider';
import NewsFeedCard from './NewsFeedCard';
import axios from 'axios';

const NewsFeed: React.FC = () => {    
    const navigate = useNavigate();
    const {getSession} = useContext(UserAccountContext)
    const [posts, setPosts] = React.useState([])
    // const [text, setText] = React.useState('')

    let text = "";
    
    useEffect(() => {
        getSession().then((res: any) => {
            if (!res) {
                navigate('/login')
            }
        });
    // console.log(res.session.getIdToken().getJwtToken())

        if (posts.length === 0) {
            axios.get('/posts')
            .then(function (response) {
                const post = response.data;
                post.sort((a: any, b: any) => {
                    return b.id - a.id;
                });
                
            setPosts(response.data);
            })
            .catch(function (error) {
            console.log(error);
            });
        }
    }, []);

    function changeText(event: React.ChangeEvent<HTMLInputElement>) {
        text = event.target.value;
        // setText(event.target.value);
    }

    function sendPost() {
        const data = {
            htmlContent: text,
        };
        axios.post('/posts', data)
          .then(function (response) {
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <div className='main-container'>
            <div className='add-new-publication-container'>
                <TextField fullWidth label="Publication Rapide" id="quickText"
                onChange={changeText}
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
            <div className='add-button'>
                        <Fab color="default" aria-label="add" size='large'>
                            <span className='add-button-text'>+</span>
                        </Fab>
                    </div>
            <div className='publication-feed-container'>
                <div className='feed-block'>

                {posts.map((value, index) =>    
                    <div className='feed-card' key={index}>
                        <NewsFeedCard value={value}></NewsFeedCard>
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