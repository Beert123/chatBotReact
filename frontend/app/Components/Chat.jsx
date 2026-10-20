import { useState } from "react"
import React from "react";
import { Form, useNavigation } from "react-router";
export function Message({ user, children }) {
    return (
        <div className={`message ${user}-message`}>
            <div className="message-content">
                {children}
            </div>
        </div>
    )
}

export function ChatMessages({ messages = [] }) {
    return (
        <main className="chat-container">
            <div className="chat-messages">
                {messages.map(message => (
                    <Message key={message.id} user={message.user}>
                        {message.content}
                    </Message>
                ))}
            </div>
        </main>
    )
}

export function ChatInput({ onAddMessage }) {
    return (

        <div className="chat-input-container">
            <Form method="post" className="chat-input-wrapper">
                <textarea
                    name="message"
                    className="chat-input"
                    placeholder="Type your message here..."
                    rows="1"
                    required
                />
                <button className="send-button" type="submit">
                </button>
            </Form>
        </div>
    )
}
