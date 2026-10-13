import { useState } from "react";
import { ChatInput, ChatMessages } from "../Components/Chat";
import React from "react";

export default function ChatNew() {
    const [messages, setMessages] = useState([])


    const addMessage = (text) => {
        const newMessage = {
            id: messages.length + 1,
            type: "user",
            content: text
        }
        setMessages([...messages, newMessage]);

    }
    return (
        <main className="chat-container">
            <div className="chat-thread-header">
                <h2>new convo here</h2>
                <p>Type a message below to begin chatting</p>
            </div>
            <ChatMessages messages={messages} />
            <ChatInput onAddMessage={addMessage} />
        </main>
    )
}