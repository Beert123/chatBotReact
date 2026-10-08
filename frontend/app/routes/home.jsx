import { ChatInput,ChatMessages} from "../Components/Chat";

export default function Home() {
  return (
    <div>
      <ChatMessages />
      <ChatInput/>
    </div>
  );
}