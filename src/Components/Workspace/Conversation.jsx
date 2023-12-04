/* eslint-disable react/prop-types */
import { Client } from "@stomp/stompjs";

import { useState } from "react";

export default function Conversation({ setCurrentMessage }) {
  // const [messages, setMessages] = useState([]);

  const sendMessage = (e) => {
    if (e.key === "Enter") {
      const newMessage = e.target.value;
      setCurrentMessage(newMessage);
      // setMessages([...messages, newMessage]);
      stompClient.publish({
        destination: `/app/sendMessage/1-6`, // URL для відправки повідомлення
        body: JSON.stringify(e.target.value), // Повідомлення у форматі JSON
      });

      e.target.value = "";
    }
  };

  return (
    <div className="w-1/3 h-[700px] bg-slate-50 mt-[47px] rounded-lg px-4 border-slate-400 border-4">
      <div className=" h-[5px] py-[4px] flex flex-col gap-[12px]">
        {/* {messages.map((message, index) => (
          <p key={index} className="inline-block min-w-[40px] text-slate-600 bg-slate-300 px-2 rounded-sm">
            {message}
          </p>
        ))} */}
      </div>
      <div className="w-full h-[2px] bg-slate-200 mt-[550px]"></div>

      <label className="text-slate-700 block mb-2 text-sm font-medium dark:text-white">Your message</label>
      <textarea
        id="message"
        rows="4"
        className="block  w-full text-smborder-slate-300 bg-slate-200 text-slate-600 focus:outline-none focus:border-stone-600 rounded"
        placeholder="Write your thoughts here..."
        onKeyDown={sendMessage}
      ></textarea>
    </div>
  );
}
