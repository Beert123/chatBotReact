import { useState } from "react"

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
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    function handleSubmit(e) {
        e.preventDefault();
        if (isSubmitting) return;

        const formData = new FormData(e.target);

        const message = formData.get("message").trim();
        if (!message) return;

        if (onAddMessage) {
            onAddMessage(message);
        }
        e.target.reset();
        setIsSubmitting(true)

        setTimeout(() => {
            setIsSubmitting(false);
        }, 1000);
    }
    return (
        <div className="chat-input-container">
            <form className="chat-input-wrapper"
                onSubmit={handleSubmit}>
                <textarea
                    name="message"
                    className="chat-input"
                    placeholder="Type your message here..."
                    rows="1"
                    disabled={isSubmitting}
                />
                <button className="send-button" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send"}
                </button>
            </form>
        </div>
    )
}
