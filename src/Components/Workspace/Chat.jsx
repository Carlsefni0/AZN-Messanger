/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Client } from "@stomp/stompjs";
let stompClient = null;
export default function Chat({ callBack, chatName, currentMessage, user, setStompClientToLift, key, setMessages, ...props }) {
  function chooseChat() {
    callBack(true);
    const socket = new SockJS("http://25.18.217.244:8080/ws");
    stompClient = Stomp.over(socket);

    stompClient.connect({}, onConnected, onError);
    setStompClientToLift(stompClient);
  }
  function onConnected() {
    stompClient.subscribe(`/topic/chat/6-7`, onMessageReceived);
  }

  function onError(error) {
    console.log(error);
  }
  function onMessageReceived(payload) {
    const body = JSON.parse(payload.body);
    const content = body.content;
    console.log("Received message content:", content);
  }

  return (
    <li
      {...props}
      onClick={chooseChat}
      className="w-[450px] h-[70px] bg-slate-700 border-2  border-slate-600 mb-5 shadow-2xl rounded-xl hover:bg-slate-500 duration-500 cursor-pointer"
    >
      <h3 className="px-4 py-2  md:text-2sm text-stone-200 ">{chatName}</h3>
    </li>
  );
}
