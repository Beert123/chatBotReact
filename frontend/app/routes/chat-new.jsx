import { useState } from "react";
import { ChatInput, ChatMessages } from "../Components/Chat";
import React from "react";
import { Form, redirect } from "react-router";


export async function clientAction({ params, request }) {
    const apiURL = import.meta.env.VITE_API_URL

    const formData = await request.formData();
    const content = formData.get("message")

    if (!content || !content.trim()) {
        return { error: "Empty message" }
    }

    const title =
        content.trim().length > 50
            ? content.trim().slice(0, 50) + "..."
            : content.trim();

    try {
        const res = await fetch(`${apiURL}/api/threads`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: title,
                content: content.trim(),
            })
        })
        if (res.status === 400) {
            const error = await response.json();
            return { error: error.error || "Invalid thread data" };
        }
        if (!res.ok) {
            return { error: `Failed to create thread: ${res.status}` };
        }

        const data = await res.json();
        return redirect(`/chat/${data.thread.id}`)
    }

    catch (e) {
        return { error: e.message }
    }
}

export default function ChatNew() {
    const [messages, setMessages] = useState([]);


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