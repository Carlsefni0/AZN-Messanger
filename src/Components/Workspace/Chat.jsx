/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Client } from "@stomp/stompjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
let stompClient = null;
export default function Chat({ callBack, chatName, currentMessage, user, setStompClientToLift, id, setMessages, setSharedTopicId, messages, ...props }) {
  const topicId = `${id < user.id ? id : user.id}-${id > user.id ? id : user.id}`;

  async function putInBD() {
    const uploadParametres = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ senderId: user.id, receiverId: id, content: currentMessage.trim() }),
    };
    const uploadedMessages = await fetch("http://192.168.43.246:8080/api/v1/message", uploadParametres);
  }
  async function getFromBD() {
    const downloadParametres = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idOfFirstUser: user.id, idOfSecondUser: id }),
    };
    const downloadMessages = await fetch("http://192.168.43.246:8080/api/v1/message/getAll", uploadParametres);
    setMessages(downloadMessages);
  }
  function chooseChat() {
    callBack(true);
    setSharedTopicId(topicId);

    const socket = new SockJS("http://192.168.43.246:8080/ws");
    stompClient = Stomp.over(socket);

    stompClient.connect({}, onConnected, onError);
    setStompClientToLift(stompClient);
    console.log(id);
    console.log(user.id);

    putItBD();
  }

  function onConnected() {
    stompClient.subscribe(`/topic/chat/${topicId}`, onMessageReceived);
  }

  function onError(error) {
    console.log(error);
  }
  function onMessageReceived(payload) {
    const body = JSON.parse(payload.body);
    const content = body.content;
    const senderName = body.username;

    console.log("Received message content:", content);
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      updatedMessages.push([senderName, content]);
      return updatedMessages;
    });
  }

  return (
    <li
      {...props}
      onClick={chooseChat}
      className="w-[450px] h-[70px]  bg-slate-700 border-2  border-slate-500 mb-5 shadow-2xl rounded-xl hover:bg-slate-500 duration-500 hover:border-slate-600  cursor-pointer flex items-center"
    >
      <FontAwesomeIcon className=" ml-[20px] text-3xl text-slate-400" icon={faUser} />

      <h3 className="px-4 py-2  md:text-2sm text-stone-200 ">{chatName}</h3>
    </li>
  );
}
