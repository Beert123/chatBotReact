import { Outlet } from "react-router";
import Sidebar from "../Components/sidebar";

const threads =[
    {
        id: 1,
        href: "Why sy blue",
        title: "why-blue"
    },
    {
        id: 2,
        href: "test1",
        title: "testetsetste1"
    },
    {
        id: 3,
        href: "test2",
        title: "jasdjasjdasjd"
    },
    {
        id: 4,
        href: "grød",
        title: "min-morgenmad-er-lækker"
    },
]

export default function Layout() {
  return (
    <div className="app-layout">
      <Sidebar threads ={threads}/>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
