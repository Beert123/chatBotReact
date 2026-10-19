import { useState } from "react";
import { useParams } from "react-router";
import { ChatMessages, ChatInput } from "../components/Chat.jsx";
import { useLoaderData } from "react-router";


export async function clientLoader({ params }) {
    
        console.log("Route params:", params);

    const threadId = params.threadId;
    console.log("Thread ID:", threadId);

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    const apiUrl = `${supabaseUrl}/threads?id=eq.${threadId}&select=*`
    const res = await fetch(apiUrl, {
        method: "GET",
        headers: {
            apikey: supabasePublishableKey,
            Authorization: `Bearer ${supabasePublishableKey}`,
        },
    })

    const data = await res.json();
    const thread = data[0];

    if (!thread) {
        throw new Response("Thread not found", { status: 404 });
    }
    const messagesResponse = await fetch(
        `${supabaseUrl}/messages?thread_id=eq.${threadId}&select=*&order=created_at.asc`,
        {
            headers: {
                apikey: supabasePublishableKey,
                Authorization: `Bearer ${supabasePublishableKey}`,
            },
        }
    );
    const messages = await messagesResponse.json();

    return { thread, messages }
}


export default function ChatThread() {
    const { thread, messages } = useLoaderData();

    const addMessage = (text) => {
        console.log("tid: " + thread.id + "messages: " + messages, "text: " + text)
    }

    return (
        <main className="chat-container">
            <div className="chat-thread-header">
                <h2>Conversation Thread {thread.title}</h2>
            </div>
            <ChatMessages messages={messages} />
            <ChatInput onAddMessage={addMessage} />
        </main>
    )
}