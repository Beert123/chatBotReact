import { useState } from "react";
import { useActionData, useParams } from "react-router";
import { ChatMessages, ChatInput } from "../components/Chat.jsx";
import { useLoaderData } from "react-router";
import { Form } from "react-router";


export async function clientLoader({ params }) {
    const threadId = params.threadId;

    const apiURL = import.meta.env.VITE_API_URL;
    const threadURL = `${apiURL}/api/threads/${threadId}`;

    const threadRes = await fetch(threadURL)

    if(threadRes.status === 404){
        throw new Response("Thread not found", {status: 404})
    }
    const thread = await threadRes.json();

    const messagesResponse = await fetch(`${apiURL}/api/threads/${threadId}/messages`);

    if(messagesResponse.status === 404){
        throw new Response("Message not found", {status: 404})
    }
    
    const messages = await messagesResponse.json();

    return { thread, messages }
}

export async function clientAction({ params, request }) {
    
    const apiURL = import.meta.env.VITE_API_URL;
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