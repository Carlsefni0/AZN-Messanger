/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Client } from "@stomp/stompjs";
export default function Chat({ userName, callBack, currentMessage, chatId, user, ...props }) {
  function chooseChat() {
    //!: купа всякої фігні яка не спрацювала. Підписку треба зробити хоча б на '/topic'
    // const client = new Client({
    //   brokerURL: "ws://25.29.145.192:8080/ws",
    //   connectHeaders: {
    //     login: "user",
    //     passcode: "password",
    //   },
    //   debug: function (str) {
    //     console.log(str);
    //   },
    //   reconnectDelay: 5000,
    //   heartbeatIncoming: 4000,
    //   heartbeatOutgoing: 4000,
    // });

    // client.onConnect = function (frame) {
    //   // Do something, all subscribes must be done in this callback
    //   // This is needed because this will be executed after a (re)connect
    //   client.subscribe("/topic");
    // };

    // client.onStompError = function (frame) {
    //   // Will be invoked in case of an error encountered at the Broker
    //   // Bad login/passcode typically will cause an error
    //   // Complaint brokers will set `message` header with a brief message. Body may contain details.
    //   // Compliant brokers will terminate the connection after any error
    //   console.log("Broker reported error: " + frame.headers["message"]);
    //   console.log("Additional details: " + frame.body);
    // };

    // // Activate the client outside the chooseChat function
    // client.activate();

    const stompClient = new Client({
      brokerURL: "ws://25.29.145.192:8080/ws",
      onConnect: (frame) => {
        console.log("Connected: " + frame);

        // Підписка на канал для отримання повідомлень
        stompClient.subscribe(`/topic/chat/${user.id < chatId ? user.id : chatId}-${chatId}`, (message) => {
          console.log(`Received: ${message.body}`);
          // Обробка отриманого повідомлення, наприклад, виведення його на екран
        });

        // Відправка повідомлення на канал
        // stompClient.publish({
        //   destination: `/app/sendMessage/${chatId}`, // URL для відправки повідомлення
        //   body: JSON.stringify(currentMessage), // Повідомлення у форматі JSON
        // });
      },
    });

    stompClient.activate();
    console.log(chatId);
    //   const stompClient = new Client({
    //     brokerURL: "ws://25.29.145.192:8080/messenger",
    //   });

    //   stompClient.onConnect = (frame) => {
    //     setConnected(true);
    //     console.log("Connected: " + frame);
    //     stompClient.subscribe("/topic/chat/1-6", (greeting) => {
    //       showGreeting(JSON.parse(greeting.body).content);
    //     });
    //   };

    //   stompClient.onWebSocketError = (error) => {
    //     console.error("Error with websocket", error);
    //   };

    //   stompClient.onStompError = (frame) => {
    //     console.error("Broker reported error: " + frame.headers["message"]);
    //     console.error("Additional details: " + frame.body);
    //   };
    //   stompClient.activate();
  }
  return (
    <li
      {...props}
      onClick={chooseChat}
      className="w-[450px] h-[70px] bg-slate-700 border-2  border-slate-600 mb-5 shadow-2xl rounded-xl hover:bg-slate-500 duration-500 cursor-pointer"
    >
      <h3 className="px-4 py-2  md:text-2sm text-stone-200 ">{userName}</h3>
    </li>
  );
}
