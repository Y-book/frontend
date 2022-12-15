import * as React from 'react';
import Container from '@mui/material/Container';
import FiSend from '@mui/icons-material/Send';
import { IconButton, Input, inputAdornmentClasses } from '@mui/material';
import { StreamChat } from 'stream-chat';

const Message: React.FC = () => {

    let state = {
        sendMessage: "Hello" && "Hi" && "How are you?",
        receiveMessage: [{}],
    }

    return (
            <><Container
            style={{
                display: "flex",
                bottom: "1%",
                position: "fixed",
                width: "100%",
                justifyContent: "center",
            }}
        >
            <input
                value={state.sendMessage}
                type="textArea"
                style={{
                    width: "100%",
                    justifyContent: "center",
                    position: "relative",
                }} />
            <IconButton
                onClick={() => {
                    if (state.sendMessage !== "") {
                        state.receiveMessage.push(state.sendMessage);
                    }
                } }
                style={{
                    marginLeft: "1%",
                    justifyContent: "right",
                    position: "relative",
                }}
            >
                <FiSend />
            </IconButton>
        </Container>
        <Container>
            </Container>
            </>
    )
}

export default Message;

