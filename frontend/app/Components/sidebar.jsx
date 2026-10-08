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

export function ChatThreadItem(props) {
  return (
    <li className="chat-thread-item">
      <a
        href={props.href} className="chat-thread-link">
        {props.title}
      </a>
    </li>
  )
}

export function ChatThreadsList() {
  return (
    <nav className="chat-threads-list" aria-label="Chat threads">
      <ul>
        <ChatThreadItem href="/chat/why-sky-blue" title="Why is the sky blue?" />
        <ChatThreadItem href="/chat/How-to-eat-cate" title="My name is jeff" />
        <ChatThreadItem href="/chat/test1" title="Who is Noah?" />
        <ChatThreadItem href="/chat/test2" title="I like cake" />
        <ChatThreadItem href="/chat/test3" title="This is a test!" />
        <ChatThreadItem href="/chat/test4" title="It was an inside job" />
      </ul>
    </nav>
  )
}

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <SidebarHeader />
      <ChatThreadsList />
      <SidebarFooter />
    </aside>
  );
}