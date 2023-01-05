import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';


const ListMessage: React.FC = () => {
    return(
        <>
        <List sx={{ width: '100%', bgcolor: 'background.paper'}}>
            <NavLink to="/message" style={{ textDecoration: 'none', display: 'block', color: "inherit"}}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Avatar du user" src="/faudraFaireAppel" />
        </ListItemAvatar>
        <ListItemText
          primary = {
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                color="text.primary"
              >
                Laura Mathieu
              </Typography>
            </React.Fragment>
          }
            secondary = {
                <React.Fragment>
                {" Hi, I'm Venti…"}
                </React.Fragment>
            }
        />
      </ListItem>
      </NavLink>
    </List>
        </>
    )
}

export default ListMessage;