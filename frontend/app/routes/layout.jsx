import { Outlet } from "react-router";
import Sidebar from "../Components/sidebar";
import { useState } from "react";

const initThreads = [
  {
    id: 1,
    title: "why-blue"
  },
  {
    id: 2,
    title: "testetsetste1"
  },
  {
    id: 3,
    title: "jasdjasjdasjd"
  },
  {
    id: 4,
    title: "min-morgenmad-er-lækker"
  },
]

export default function Layout() {
  const [threads, setThreads] = useState(initThreads)

  function handleDelete(id) {
    setThreads((threads) =>
      threads.filter((thread) => thread.id !== id)
    );
  }

  return (
    <div className="app-layout">
      <Sidebar 
      threads={threads}
      onDelete={handleDelete} />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
