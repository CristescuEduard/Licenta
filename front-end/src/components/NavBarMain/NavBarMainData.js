import React from "react";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";

export const NavBarMainData = [
    {
        title: "Home",
        path: "/",
        icon: <AiIcons.AiFillHome />,
        cName: "nav-text",
    },
    {
        title: "Menu",
        path: "/",
        icon: <RiIcons.RiAdminLine />,
        cName: "nav-text",
    },
    {
        title: "Gallery",
        path: "/gallery",
        icon: <MdIcons.MdEvent />,
        cName: "nav-text",
    },
    {
        title: "About US",
        path: "/",
        icon: <RiIcons.RiBriefcase4Line />,
        cName: "nav-text",
    },
    {
        title: "Log In",
        path: "/login",
        cName: "nav-text",
    },
    {
        title: "Register",
        path: "/register",
        cName: "nav-text",
    },
];
