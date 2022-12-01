import { Button } from '@mui/material';
import React from 'react';
import "./Home.css";
import {Link} from "react-router-dom";

const Home: React.FC = () => {

    return (
        <div className='main-container'>
            <h1>
                Bienvenue <br />
                sur Ybook !
            </h1>
            <Button color='inherit' variant="contained">
                <Link to="/login"> Se connecter </Link>
            </Button>
        </div>
    );
};

export default Home;