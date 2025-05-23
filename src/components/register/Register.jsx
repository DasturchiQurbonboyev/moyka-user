import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
    const token = localStorage.getItem("token");

    const [fullName, setFullName] = useState("")
    const [password, setPassword] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const navigate = useNavigate()

    const registerSubmit = (e) => {
        e.preventDefault();
      
        fetch("http://45.154.2.116:7010/api/auth/signup", {
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
    <div className="login__page">
        <form  onSubmit={registerSubmit} action="#" method="post" className="space-y-4 log-in">
            <div>
              <label htmlFor="login" className="mb-2  text-white text-lg">Login</label>
              <input
              style={{padding:"8px 12px", marginBlock:"8px"}}
                onChange={(e)=> setFullName(e.target.value)}
                id="text"
                className="border p-3 dark:bg-indigo-700 text-white  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="login"
                placeholder="Login"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="mb-2 text-white text-lg">Phone Number</label>
              <input
              style={{padding:"8px 12px", marginBlock:"8px"}}
                onChange={(e)=> setPhoneNumber(e.target.value)}
                id="phone"
                className="border p-3 shadow-md dark:bg-indigo-700 text-white  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="text"
                placeholder="Phone Number"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 text-white text-lg">Password</label>
              <input
              style={{padding:"8px 12px", marginBlock:"8px"}}
                onChange={(e)=> setPassword(e.target.value)}
                id="password"
                className="border p-3 shadow-md dark:bg-indigo-700 text-white  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <button
            style={{padding:"8px 12px", marginBlock:"8px"}}
              className="bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
              type="submit"
            >
              LOG IN
            </button>
          </form>
      </div> 
  )
}

export default Register