import { useState } from "react"

export function Message({user, children}) {
    return (
        <div className={`message ${user}-message`}>
            <div className="message-content">
            {children}
            </div>
        </div>
    )
}

export function ChatMessages({messages}) {
    return (
        <main className="chat-container">
            <div className="chat-messages">
                {messages.map(message =>(
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
