import { useState, useEffect } from "react";
import SideBar from "./Workspace/SideBar";
import NoChat from "./Workspace/NoChat";
import Conversation from "./Workspace/Conversation";

function WorkSpace({ user }) {
  const [chats, setChats] = useState([]);
  const [isChatChosen, setIsChatChosen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState();

  useEffect(() => {
    async function getChats() {
      try {
        const fetchParameters = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: 6 }),
        };

        const response = await fetch("http://25.29.145.192:8080/api/v1/user/getAll", fetchParameters);

        if (response.ok) {
          const uploadedChats = await response.json();
          console.log(uploadedChats);
          setChats(uploadedChats);
        } else {
          console.log("Error fetching data");
        }
      } catch (error) {
        console.error("Error in getChats:", error);
      }
    }

    getChats();
  }, []);

  return (
    <div className="w-screen h-screen bg-slate-300">
      <h1 className="text-4xl pt-[20px] text-center text-slate-700">{`Hi! ${user}`}</h1>
      <div className={`flex ${!isChatChosen ? "gap-60" : "gap-40"}`}>
        <SideBar chatsArray={chats} callBack={setIsChatChosen} currentMessage={currentMessage} user={user} />
        {!isChatChosen ? <NoChat /> : <Conversation setCurrentMessage={setCurrentMessage} />}
      </div>
    </div>
  );
}

export default WorkSpace;
