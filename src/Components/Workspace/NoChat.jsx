import noChat from "../../assets/Img/noChat.png";
export default function NoChat() {
  return (
    <div className=" mt-[50px] w-[400px] h-[250px] bg-slate-600 rounded-2xl pt-[20px]  border-slate-550 border-4 shadow-2xl">
      <img src={noChat} className="w-20 h-20 m-auto "></img>

      <h2 className=" mt-[30px] md:text-xl text-center text-stone-200 px-2">You don't have any active chat. Choose any to start</h2>
    </div>
  );
}
