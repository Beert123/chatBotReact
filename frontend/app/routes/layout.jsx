import { Outlet, useLoaderData } from "react-router";
import Sidebar from "../Components/sidebar";
import { apiFetch } from "../lib/apiFetch";

export async function clientLoader() {
  const res = await apiFetch("/api/threads")
  const threads = await res.json();
  console.log(threads);

  return { threads: threads };
}
export async function clientAction({ params }) {
  const threadId = params.threadId;
  const formData = await request.formData();

  try {
    const res = await apiFetch(`api/threads/${threadId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      return { error: "failed to delete thread" }
    }

    return { succes: true }
  } catch (e) {
    return { error: e.message }
  }
}

export default function Layout() {
  const { threads } = useLoaderData();

  function handleDelete(id) {
    console.log("delete this thread: " + id)
  }
  /*
  function handleDelete(id) {
    setThreads((threads) =>
      threads.filter((thread) => thread.id !== id)
    );
  }
  */

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
