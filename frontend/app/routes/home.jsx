import { useState } from "react";
import { ChatInput,ChatMessages} from "../Components/Chat";
import React from "react";

const initMessages = [
    {
        id: 1,
        user: "user",
        content: "Hello! can you help me understand React Router v7?"
    },
    {
        id: 2,
        user: "bot",
        content: "Of course! React Router v7 is the latest version that introduces several improvements including better data loading, enhanced nested routing, and improved TypeScript support. What specific aspect would you like to learn about?"
    },
    {
        id: 3,
        user: "user",
        content: "How do nested routes work in v7?"
    },
    {
        id: 4,
        user: "bot",
        content: "Nested routes in React Router v7 allow you to create hierarchical UI structures. You define parent routes that contain child routes, and use the <Outlet /> component to render child components. The parent route acts as a layout component that wraps its children."
    },
    {
        id: 5,
        user: "user",
        content: "What's the difference between route() and layout() helpers?"
    },
    {
        id: 6,
        user: "bot",
        content: "Great question! The route() helper creates routes that add URL segments, while layout() creates routes that only provide UI structure without affecting the URL. Layout routes are perfect for shared components like sidebars or headers that should appear across multiple pages."
    },
    {
        id: 7,
        user: "user",
        content: "Can you show me an example of a routes.js configuration?"
    },
    {
        id: 8,
        user: "bot",
        content: "Sure! Here's a basic example: You can use route(), index(), and layout() helpers to create nested route structures. The layout() function creates wrapper components, while route() adds URL segments. This approach gives you clean, hierarchical routing that's easy to maintain."
    },
    {
        id: 9,
        user: "user",
        content: "How do I handle data loading in React Router v7?"
    },
    {
        id: 10,
        user: "bot",
        content: "React Router v7 provides excellent data loading capabilities through loader functions. You can define a loader function in your route component that runs before the component renders, ensuring your data is available immediately. You can access the loaded data using the useLoaderData() hook within your component."
    }
];

export default function Home() {
  const [messages, setMessages] = React.useState(initMessages);

  function addMessage(text){
    const newMessage = {
      id: messages.length + 1,
      user: "user",
      content: text
    }
    setMessages([...messages, newMessage])
  }

  return (
    <div>
      <ChatMessages messages ={messages} />
      <ChatInput onAddMessage={addMessage}/>
    </div>
  );
}