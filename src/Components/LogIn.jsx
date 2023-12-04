import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Img/logo.png";

function LogIn({ callBack }) {
  const [Email, setEmail] = useState(undefined);
  const navigate = useNavigate();
  function changeEmail(e) {
    e.preventDefault();
    setEmail(e.target.value);
    console.log(Email);
  }
  async function sendEmail() {
    const fetchParametres = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Email),
    };
    const response = await fetch("http://25.29.145.192:8080/api/v1/user", fetchParametres);
    if (response.ok) {
      const data = await response.json();

      console.log(data.id);
      navigate("/WorkSpace");
      callBack({ login: Email, id: data.id });
    } else {
      console.log("Error");
    }
  }
  return (
    <div className="bg-[url('./assets/Img/bg.jpg')]  w-screen h-screen pt-20">
      <div className="w-[80px] h-[80px] bg-slate-400 m-auto mb-[35px] rounded-full flex items-center shadow">
        <img src={logo} className="w-10 h-10 m-auto "></img>
      </div>
      <div className="w-[420px] h-[500px] shadow rounded-xl bg-slate-400 block m-auto pt-[5px]">
        <h1 className="text-3xl font-mono text-center text-slate-250 font-bold">Welcome!</h1>
        <form>
          <div className="ml-[40px] mt-[40px]">
            <label className="text-2ml font-bold"> Email</label>
            <input className="block  mt-[10px] w-[340px] h-[30px] shadow rounded bg-slate-50 border-slate-50 " type="email" placeholder="Email" onChange={changeEmail}></input>
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
