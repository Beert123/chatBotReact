import { useState } from "react";
import { useActionData, useParams } from "react-router";
import { ChatMessages, ChatInput } from "../components/Chat.jsx";
import { useLoaderData } from "react-router";
import { Form } from "react-router";


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

export async function clientAction({ params, request }) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

    const formData = await request.formData();
    const fieldValue = formData.get("message")

    if (!fieldValue || !fieldValue.trim()) {
        return { error: "mesage is empty" };
    }

    const newMessage = {
        thread_id: params.threadId,
        type: "user",
        content: fieldValue.trim(),
    }
    try {
        const res = await fetch(`${supabaseUrl}messages`, {
            method: "POST",
            headers: {
                apikey: supabasePublishableKey,
                Authorization: `Bearer ${supabasePublishableKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMessage)
        })

        if (!res.ok) {
            return { error: "coudlnt fetch supabase message" }
        }

        return { succes: true }

    } catch (e) {
        return { error: e.message }
    }

}

export default function ChatThread() {
    const { threadId, messages } = useLoaderData();

    const actionData = useActionData();

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
            {actionData?.error && (
                <div className="error-message">{actionData.error}</div>
            )}
        </main>
    )
}