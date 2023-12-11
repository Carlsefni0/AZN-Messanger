/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import SideBar from "./Workspace/SideBar";
import NoChat from "./Workspace/NoChat";
import Conversation from "./Workspace/Conversation";

function WorkSpace({ user }) {
  const [chats, setChats] = useState();
  const [isChatChosen, setIsChatChosen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState();
  const [stompClientToLift, setStompClientToLift] = useState();
  const [messages, setMessages] = useState([]);
  const [sharedTopicId, setSharedTopicId] = useState();

  useEffect(() => {
    async function getChats() {
      try {
        const fetchParameters = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.id }),
        };
        const response = await fetch("http://192.168.43.246:8080/api/v1/user/getAll", fetchParameters);

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
      <h1 className="text-4xl pt-[20px] text-center text-slate-700">{`Hi! ${user.login}`}</h1>
      <div className={`flex ${!isChatChosen ? "gap-60" : "gap-40"}`}>
        <SideBar
          chatsArray={chats}
          callBack={setIsChatChosen}
          currentMessage={currentMessage}
          setStompClientToLift={setStompClientToLift}
          setMessages={setMessages}
          user={user}
          setSharedTopicId={setSharedTopicId}
          messages={messages}
        />
        {!isChatChosen ? (
          <NoChat />
        ) : (
          <Conversation
            setMessages={setMessages}
            setCurrentMessage={setCurrentMessage}
            stompClientToLift={stompClientToLift}
            messages={messages}
            user={user}
            sharedTopicId={sharedTopicId}
          />
        )}
      </div>
    </div>
  );
}

export default WorkSpace;
