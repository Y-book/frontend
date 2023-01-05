import React from 'react';
import { NavLink } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

const ChatBody = () => {
    const leaveChat = () => {
        <NavLink to='/listMessage' style={{ textDecoration: 'none', display: 'block', color: "inherit"}}></NavLink>
        window.location.reload();
    }
    return(
        <>
            <header className='chat__mainHeader'>
                <IconButton onClick={leaveChat}>
                    <Badge color="error">
                        <KeyboardReturnIcon />
                    </Badge>
                </IconButton>
            </header>
            <div className="message__container">
        <div className="message__chats">
          <p className="sender__name">You</p>
          <div className="message__sender">
            <p>Hello there</p>
          </div>
        </div>

        <div className="message__chats">
          <p>Other</p>
          <div className="message__recipient">
            <p>Hey, I'm good, you?</p>
          </div>
        </div>

        <div className="message__status">
          <p>Someone is typing...</p>
        </div>
      </div>
        </>
    )
}

export default ChatBody;