import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaShoppingBag,
    FaThList,
    FaQq,
    FaSteamSquare,
    FaRegUser
} from "react-icons/fa";
import logo from '../../assets/sidebar/logo.png'
import { NavLink, useNavigate } from 'react-router-dom';
import { AiFillProduct } from 'react-icons/ai';
import { MdCategory, MdContactPage } from 'react-icons/md';
import { RiDiscountPercentFill } from 'react-icons/ri';
import { GiResize } from 'react-icons/gi';
import { IoColorPalette, IoNewspaper } from 'react-icons/io5';
import { GrUserWorker } from 'react-icons/gr';
import { CiBoxes } from 'react-icons/ci';
import { BsMenuButtonWideFill } from 'react-icons/bs';


const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useNavigate()
    const menuItem = [
        {
            path: "/buyrutmalar",
            name: "Activ buyrutmalar",
        },
        {
            path: "/history",
            name: "Buyrutmalar tarixi",
        },       

    ]
    return (
        <div className=" admin">
            <div  className={`${!isOpen ?'sidebar':"sidebar__open"}`}>
                <div className="top_section">
                    <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center",width:"100%"}}>
                        <img style={{width:"80px" }} src={logo} alt="" /> <br />
                        <h1 className='text-2xl'>User</h1>
                    </div>
                </div>
                <hr className="sidebar__hr" />
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" >
                            <div style={{display:"flex", alignItems:"center"}} className="icon">{item.icon}</div>
                            <div style={{ display: !isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
                 <button onClick={()=>{
                    navigate("/")
                    localStorage.clear()
                    }} className='log__out relative top-[42vh] w-full'>CHIQISH</button>
            </div>
            <main style={{ marginLeft: !isOpen ? "300px" : "50px", padding:"5px" }} className=''>{children}</main>
        </div>
    );
};

export default Sidebar;