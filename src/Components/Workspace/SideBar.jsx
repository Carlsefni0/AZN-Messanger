/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faAddressBook } from "@fortawesome/free-solid-svg-icons";
import Chat from "./Chat";

export default function SideBar({ chatsArray, callBack, currentMessage, setStompClientToLift, user, setMessages, setSharedTopicId, messages }) {
  return (
    <aside className="w-[27%] h-[800px] bg-slate-600 rounded-lg px-3 mt-[47px] bg-gradient-to-b from-slate-500 to-slate-600 border-4 border-l-slate-600">
      <div className=" flex items-center justify-center">
        <h2 className="mb-8 mt-[20px] font-bold uppercase md:text-3xl text-stone-300 text-center">Your Chats</h2>
        <FontAwesomeIcon className="ml-[10px] text-3xl text-slate-300" icon={faComments} />
      </div>
      <ul>
        {chatsArray === undefined && <FontAwesomeIcon className="text-9xl text-slate-300 ml-[160px] mt-[220px]" icon={faAddressBook} />}
        {chatsArray !== undefined &&
          chatsArray.map((item) => (
            <Chat
              user={user}
              setMessages={setMessages}
              chatName={item.name}
              key={item.id}
              id={item.id}
              callBack={callBack}
              currentMessage={currentMessage}
              setStompClientToLift={setStompClientToLift}
              setSharedTopicId={setSharedTopicId}
              messages={messages}
            />
          ))}
      </ul>
    </aside>
  );
}
