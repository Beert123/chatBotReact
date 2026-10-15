import { Outlet, useLoaderData } from "react-router";
import Sidebar from "../Components/sidebar";


const initThreads = [
  {
    id: "1",
    title: "why-blue"
  },
  {
    id: "2",
    title: "testetsetste1"
  },
  {
    id: "3",
    title: "jasdjasjdasjd"
  },
  {
    id: "4",
    title: "min-morgenmad-er-lækker"
  },
]

export async function clientLoader() {

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

  const apiUrl = `${supabaseUrl}/threads?select=id,title`;
  const res = await fetch(apiUrl, {
    method: "GET",
    headers: {
      apikey: supabasePublishableKey,
      Authorization: `Bearer ${supabasePublishableKey}`,
    },
  })
  const threads = await res.json();
  console.log(threads);

  return { threads: threads};
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
