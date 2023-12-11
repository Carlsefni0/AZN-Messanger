/* eslint-disable react/no-unescaped-entities */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentSlash } from "@fortawesome/free-solid-svg-icons";

export default function NoChat() {
  return (
    <div className=" mt-[50px] w-[400px] h-[250px] bg-gradient-to-b from-slate-500 to-slate-600 rounded-2xl pt-[20px]  border-slate-550 border-4 shadow-2xl">
      <FontAwesomeIcon className="text-slate-300 text-6xl px-[160px]" icon={faCommentSlash} />

      <h2 className=" mt-[30px] md:text-xl text-center text-slate-300 px-2 ">You don't have any active chat. Choose any to start</h2>
    </div>
  );
}
