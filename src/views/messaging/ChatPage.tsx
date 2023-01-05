import React from 'react';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';

const ChatPage = ({ socket }) => {
    return(
        <div className='chat__main'>
            <ChatBody />
            <ChatFooter socket={socket} />
        </div>
    )
}

export default ChatPage;