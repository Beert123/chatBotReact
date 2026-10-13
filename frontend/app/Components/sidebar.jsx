import React from "react";
import { Link, href} from "react-router";
export function SidebarHeader() {
    return (
        <div className="sidebar-header">
            <h2 className="chatbot-title">Chatbot</h2>
            <Link to="/chat/new" className="new-chat-btn">
                + New
            </Link>
        </div>
    )
}

export function SidebarFooter() {
    return (
        <div className="sidebar-footer">
            <a href="/profile" className="user-profile">
                <img
                    src="https://ui-avatars.com/api/?name=Batman&background=0D0D0D&color=fff&size=40"
                    alt="User avatar"
                    className="user-avatar"
                    width={30}
                    height={30}
                />
                <span className="user-name">Batman</span>
            </a>
        </div>
    )
}

export function ChatThreadItem({ thread, onDelete }) {
    const { id, title } = thread;

    return (
        <li className="chat-thread-item">
            <Link
                to={href("/chat/:threadId", { threadId: id })}
                className="chat-thread-link">
                {title}
            </Link>
            <button
                type="button"
                className="delete-chat-btn"
                aria-label={`Slet chat: ${title}`}
                onClick={() => onDelete(id)}
            >
                x
            </button>
        </li>
    )
}



export function ChatThreadsList({ threads = [], onDelete }) {
    const [searchValue, setSearchValue] = React.useState("");

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }
    const filterThreads = threads.filter((thread) =>
        thread.title.includes(searchValue));

    return (
        <nav className="chat-threads-list" aria-label="Chat threads">
            <input
                type="text"
                className="search-input"
                value={searchValue}
                onChange={handleChange}>
            </input>
            <ul>
                {filterThreads.map(thread => (
                    <ChatThreadItem
                        key={thread.id}
                        thread={thread}
                        onDelete={onDelete}
                    />
                ))}
            </ul>
        </nav>
    )
}

export default function Sidebar({ threads, onDelete }) {
    return (
        <aside className="sidebar">
            <SidebarHeader />
            <ChatThreadsList
                threads={threads}
                onDelete={onDelete} />
            <SidebarFooter />
        </aside>
    );
}