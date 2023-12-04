/* eslint-disable react/prop-types */
import Chat from "./Chat";
export default function SideBar({ chatsArray, callBack, currentMessage, user }) {
  return (
    <aside className="w-[27%] h-[800px] bg-slate-600 rounded-lg px-3 mt-[47px] border-slate-500 border-4 border-l-slate-600">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200 text-center">Your Chats</h2>
      <ul>
        {chatsArray.map((item) => (
          <Chat userName={item.name} chatI={item.id} key={item.id} callBack={callBack} currentMessage={currentMessage} user={user} />
        ))}
      </ul>
    </aside>
  );
}
