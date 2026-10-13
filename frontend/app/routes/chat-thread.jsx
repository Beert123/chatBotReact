import { useState } from "react";
import { useParams } from "react-router";
import { ChatMessages, ChatInput } from "../components/Chat.jsx";
import { useLoaderData } from "react-router";


export async function clientLoader({ params }) {
    const threadid = params.threadId;

    await new Promise((resolve) => setTimeout(resolve, 500));

    //mockdata
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
    return {threadId: threadid, messages: defaultMessages}
}

export default function ChatThread() {
    const {threadId,messages} = useLoaderData();

    const addMessage = (text) => {
        console.log("tid: " + threadId + "messages: " + messages, "text: " + text) 
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