/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react"; // Import React

export default function Conversation({ setCurrentMessage, stompClientToLift, messages, user, sharedTopicId }) {
  const sendMessage = (e) => {
    if (e.key === "Enter") {
      const newMessage = e.target.value;
      setCurrentMessage(newMessage);

      if (newMessage && stompClientToLift) {
        var chatMessage = {
          senderId: user.id,
          receiver: 7,
          sender: user.login,
          content: newMessage,
          type: "CHAT",
        };
        stompClientToLift.send(`/app/chat/${sharedTopicId}`, {}, JSON.stringify(chatMessage));
      }

      e.target.value = "";
    }
  };

  return (
    <div className="w-1/3 h-[700px] bg-slate-50 mt-[47px] rounded-lg px-4 border-slate-400 border-4">
      <div className="h-[550px] overflow-y-auto py-[4px] flex flex-col gap-[6px] ">
        {messages !== undefined &&
          messages.map((item, index) => (
            <div className="text-lg bg-slate-300 px-2 rounded" key={index}>
              <p className="text-slate-600 font-bold">{item[0]}</p>
              <p className="text-slate-500">{item[1]}</p>
            </div>
          ))}
      </div>
      <div className="w-full h-[2px] bg-slate-200 mt-[5px]"></div>

      <label className="text-slate-700 block mb-2 text-sm font-medium dark:text-white">Your message</label>
      <textarea
        id="message"
        rows="4"
        className="block w-full text-smborder-slate-300 bg-slate-200 text-slate-600 focus:outline-none focus:border-stone-600 rounded"
        placeholder="Write your thoughts here..."
        onKeyDown={sendMessage}
      ></textarea>
    </div>
  );
}
