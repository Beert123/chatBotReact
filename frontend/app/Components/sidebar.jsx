export function SidebarHeader() {
    return (
        <div className="sidebar-header">
            <h2 className="chatbot-title">Chatbot</h2>
            <a href="/chat/new" className="new-chat-btn">
                + New
            </a>
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

export function ChatThreadItem({ href, title, id, onDelete }) {
    return (
        <li className="chat-thread-item">
            <a
                href={href} className="chat-thread-link">
                {title}
            </a>
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



export function ChatThreadsList({threads,onDelete}) {
    return (
        <nav className="chat-threads-list" aria-label="Chat threads">
            <ul>
                {threads.map(thread => (
                    <ChatThreadItem
                        key={thread.id}
                        id={thread.id}
                        href={thread.href}
                        title={thread.title}
                        onDelete={onDelete}
                        />
                    
                ))}
            </ul>
        </nav>
    )
}

export default function Sidebar({threads, onDelete}) {
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