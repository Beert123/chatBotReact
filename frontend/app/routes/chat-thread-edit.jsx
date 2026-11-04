import { useActionData, Form, redirect, Link, useRouteLoaderData } from "react-router";

export async function clientAction({ params, request }) {
    const apiUrl = import.meta.env.VITE_API_URL;
    const formData = await request.formData();
    const title = formData.get("title");
    const threadId = params.threadId;

    if (!title || !title.trim()) {
        return { error: "Enter a title" };
    }
    try {
        const response = await fetch(`${apiUrl}/api/threads/${threadId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: title.trim() }),
        });

        if (response.status === 404) {
            return { error: "thread not found" }
        }
        if (!response.ok) {
            const error = response.message
            return { error: `failed to update title ${response.status} error: ${error}` }
        }

        redirect("..");
    } catch (e) {
        return { error: e.message };
    }

}

export default function chatThreadEdit() {
    const thread = useRouteLoaderData("routes/chat-thread");
    const actionData = useActionData();

    return (
    <div className="edit-title-overlay">
        <Form method="post" className="edit-title-form">
            <div className="form-field">
                <label htmlFor="title">Edit thread title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    defaultValue={thread.title}
                    autoFocus
                    required
                    className="title-input"
                />
            </div>

            <div className="form-buttons">
                <button type="submit" className="save-button">
                    Save
                </button>
                <Link to=".." className="cancel-button">
                    Cancel
                </Link>
            </div>
        </Form>
        {actionData?.error && (
            <div className="error-message">{actionData.error}</div>
        )}
    </div>)
}