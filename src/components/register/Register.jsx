import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
    const token = localStorage.getItem("token");

    const [fullName, setFullName] = useState("")
    const [password, setPassword] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const navigate = useNavigate()

    const registerSubmit = (e) => {
        e.preventDefault();
      
        fetch("https://u-dev.uz/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            fullName,
            phoneNumber,
            password,
          }),
        })
          .then(async (res) => {
            const text = await res.text();
      
            if (!text) {
              console.log("Javob bo‘sh:", res.status);
              toast.success("Register Successfull")
              navigate("/")
              return;
            }
      
            try {
              const data = JSON.parse(text);
            } catch (err) {
                toast.error(text)
            }
        })
        .catch((err) => {
            toast.error("Xatolik:", err.message);
          });
      };
      

  return (
    <div className="wrapper">
    {/* FON QATLAMI — qoraytirilgan rasm */}
    <div className="login__page"></div>
  
    {/* BLUR + REGISTER FORMA QATLAMI */}
    <div className="log-in">
      {/* Orqa fon blur holatda */}
      <div className="log-in__blur"></div>
  
      {/* Asosiy forma (tiniq) */}
      <form
        onSubmit={registerSubmit}
        action="#"
        method="post"
        className="log-in__content space-y-4"
      >
        <div>
          <label htmlFor="login" className="mb-2 text-white text-lg">
            Login
          </label>
          <input
            style={{ padding: "8px 12px", marginBlock: "8px" }}
            onChange={(e) => setFullName(e.target.value)}
            id="login"
            className="border p-3 dark:bg-indigo-700 text-white dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
            type="text"
            placeholder="Login"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 text-white text-lg">
            Phone Number
          </label>
          <input
            style={{ padding: "8px 12px", marginBlock: "8px" }}
            onChange={(e) => setPhoneNumber(e.target.value)}
            id="phone"
            className="border p-3 shadow-md dark:bg-indigo-700 text-white dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
            type="text"
            placeholder="Phone Number"
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
            className="border p-3 shadow-md dark:bg-indigo-700 text-white dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <Link
                to={"/"}
                className="group text-blue-400 transition-all duration-100 ease-in-out"
              >
                <span className="bg-left-bottom bg-gradient-to-r text-sm from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                  Log In
                </span>
              </Link>
        <button
          style={{ padding: "8px 12px", marginBlock: "8px" }}
          className="bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
          type="submit"
        >
          REGISTER
        </button>
      </form>
    </div>
  </div>
  
  )
}

export default Register