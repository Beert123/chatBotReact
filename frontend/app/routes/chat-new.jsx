import { useState } from "react";
import { ChatInput, ChatMessages } from "../Components/Chat";
import React from "react";
import { Form, redirect } from "react-router";


export async function clientAction({ params, request }) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

    const formData = await request.formData();
    const fieldValue = formData.get("message")

    if (!fieldValue || !fieldValue.trim()) {
        return { error: "Empty message" }
    }

    const title =
        fieldValue.trim().length > 50
            ? fieldValue.trim().slice(0, 50) + "..."
            : fieldValue.trim();

    try {
        const threadResponse = await fetch(`${supabaseUrl}threads`, {
            method: "POST",
            headers: {
                apikey: supabasePublishableKey,
                Authorization: `Bearer ${supabasePublishableKey}`,
                "Content-Type": "application/json",
                Prefer: "return=representation",
            },
            body: JSON.stringify({ title })
        })
        if (!threadResponse.ok) {
            return { error: "couldnt create thread" + threadResponse.status }
        }
        const [thread] = await threadResponse.json();

        const messageResponse = await fetch(`${supabaseUrl}messages`, {
            method: "POST",
            headers: {
                apikey: supabasePublishableKey,
                Authorization: `Bearer ${supabasePublishableKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                thread_id: thread.id,
                type: "user",
                content: fieldValue.trim(),
            }),
        });
        
        if(!messageResponse || !messageResponse.trim()){
            return {error: "no message" + messageResponse.status}
        }

        //den her virker ikke
        return redirect(`/chat/${thread.id}`);
    } catch (e) {
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