import  "./Login.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {

  const [login, setLogin] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()
  const [role, setRole] = useState("")



  const loginSubmit =(event)=>{

    event.preventDefault()
    fetch("https://u-dev.uz/api/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber : login,
        password : password
      })
    })
    .then((res)=> res.json())
    .then((item)=> {
      if(item?.token){
        localStorage.setItem("token", item?.token)
        getMyInfo().then((item)=> {
          setRole(item?.role)
          if (item?.role === "USER") {
            toast.success("Login Successful");
            navigate("/buyrutmalar");
          } else {
            toast.warning("Siz Foydalanuvchi emassiz");
            navigate("/");
          }
        })
      } else{
        toast.error("Login Failed")
      }
    })
  }

  const getMyInfo = () => {
    return fetch("https://u-dev.uz/api/profile", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return data; 
      });
  };

  return (
    <>
      <div className="login__page">
        <form
          onSubmit={loginSubmit}
          action="#"
          method="post"
          className="space-y-4 log-in"
        >
          <div>
            <label htmlFor="login" className="mb-2  text-white text-lg">
              Login
            </label>
            <input
              style={{ padding: "8px 12px", marginBlock: "8px" }}
              onChange={(e) => setLogin(e.target.value)}
              id="text"
              className="border p-3 dark:bg-indigo-700 text-white  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
              type="login"
              placeholder="Login"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-2 text-white text-lg">
              Password
            </label>
            <input
              style={{ padding: "8px 12px", marginBlock: "8px" }}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              className="border p-3 shadow-md dark:bg-indigo-700 text-white  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <Link
            to={"/register"}
            
            className="group text-blue-400 transition-all duration-100 ease-in-out"
          >
            <span className="bg-left-bottom bg-gradient-to-r text-sm from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
              Register
            </span>
          </Link>
            <button
              style={{ padding: "8px 12px", marginBlock: "8px" }}
              className="bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
              type="submit"
            >
              LOG IN
            </button>
        </form>
      </div>
    </>
  );
}

export default Login;
