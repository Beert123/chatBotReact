export function Message(props) {
    return (
        <div className={`message ${props.user}-message`}>
            <div className="message-content">
                {props.children}
            </div>
        </div>
    )
}

export function ChatMessages(props) {
    return (
        <main className="chat-container">
            <div className="chat-messages">
                {props.messages.map(message =>(
                    <Message key={message.id} user={message.user}>
                        {message.content}
                    </Message>
                ))}
            </div>

        </main>
    )
}

export function ChatInput() {
    return (
        <div className="chat-input-container">
            <div className="chat-input-wrapper">
                <textarea
                    className="chat-input"
                    placeholder="Type your message here..."
                    rows="1"
                />
                <button className="send-button" type="button">
                    Send
                </button>
            </div>
        </div>
    )
}