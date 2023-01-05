import React, { useState } from 'react';

const ChatFooter = () => {
    const [message, setMessage] = useState('');

    const sendMessage = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log('Message envoyé');
        setMessage('');
    }

    return(
        <>
            <div className='chat__footer'>
                <form className='form' onSubmit={sendMessage}>
                    <input
                        type='text'
                        placeholder='Write a message'
                        value={message}
                        className='message'
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type='submit' className='send'></button>
                </form>
            </div>
        </>
    )
}

export default ChatFooter;