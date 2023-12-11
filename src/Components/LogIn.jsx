/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

function LogIn({ callBack }) {
  const [Email, setEmail] = useState(undefined);
  const navigate = useNavigate();
  function changeEmail(e) {
    e.preventDefault();
    setEmail(e.target.value);
  }
  async function sendEmail() {
    const fetchParametres = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Email),
    };
    const response = await fetch("http://192.168.43.246:8080/api/v1/user", fetchParametres);
    if (response.ok) {
      const data = await response.json();

      navigate("/WorkSpace");
      callBack({ login: Email, id: data.id });
    } else {
      alert("Error");
    }
  }
  return (
    <div className="bg-[url('./assets/Img/bg.jpg')]  w-screen h-screen pt-20">
      <div className="w-[80px] h-[80px] bg-gradient-to-t from-slate-500 to-slate-600 m-auto mb-[35px] rounded-full flex items-center shadow border-slate-400 border-2 ">
        <FontAwesomeIcon className="text-4xl text-slate-300 px-4" icon={faPaperPlane} />
      </div>
      <div className="w-[420px] h-[500px] shadow rounded-xl bg-gradient-to-t from-slate-500 to-slate-600  border-slate-400 border-2 block m-auto pt-[5px]">
        <h1 className="text-3xl font-mono text-center text-slate-250 font-bold text-slate-300">Welcome!</h1>
        <form>
          <div className="ml-[40px] mt-[40px]">
            <label className="text-2ml font-bold text-slate-300"> Email</label>
            <input className="block  mt-[10px] w-[340px] h-[30px] shadow rounded disabled:opacity-75 border-none " type="email" placeholder="Email" onChange={changeEmail}></input>
          </div>
        </form>
        <button className=" block m-auto mt-[190px] rounded-sm bg-slate-600 w-[240px] h-[50px] hover:bg-slate-300 duration-500" onClick={sendEmail}>
          Sign In
        </button>
      </div>
      <footer>
        <h3 className="text-2xl font-mono text-center block mt-[100px]">Created by AZN Corporation</h3>
      </footer>
    </div>
  );
}
export default LogIn;
