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
  await new Promise((resolve) => setTimeout(resolve,300));
  return {threads: initThreads};
}

export default function Layout() {
  const {threads} = useLoaderData();

  function handleDelete(id){
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
