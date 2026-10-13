import { useState } from "react";
import { useParams } from "react-router";
import { ChatMessages, ChatInput } from "../components/Chat.jsx";

const defaultMessages = [
    {
        id: 1,
        type: "user",
        content: "user",
    },
    {
        id: 2,
        type: "bot",
        content: "bot",
    },
];

export default function ChatThread() {
    const [messages,setMessages] = useState([defaultMessages]);

    const { threadId } = useParams();

    const addMessage = (text) => {
        const newMessage = {
            id: messages.length +1,
            type: "user",
            content: text
        }
        setMessages([...messages,newMessage]);
    }
    return (
        <main className="chat-container">
            <div className="chat-thread-header">
                <h2>Conversation Thread {threadId}</h2>
            </div>
            <ChatMessages messages={messages} />
            <ChatInput onAddMessage={addMessage} />
        </main>
    )
}