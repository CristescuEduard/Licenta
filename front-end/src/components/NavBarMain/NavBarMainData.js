import React from "react";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";

export const NavBarMainData = [
    {
        title: "Tables",
        path: "/admin/tables",
        icon: <AiIcons.AiFillHome />,
        cName: "nav-text",
    },
    {
        title: "Products",
        path: "/admin/stock",
        icon: <RiIcons.RiAdminLine />,
        cName: "nav-text",
    },
    {
        title: "Add User",
        path: "/register",
        icon: <MdIcons.MdEvent />,
        cName: "nav-text",
    },
    {
        title: "Statistics",
        path: "/admin/statistics",
        icon: <RiIcons.RiBriefcase4Line />,
        cName: "nav-text",
    },
    {
        title: "Log Out",
        path: "/",
        cName: "nav-text",
    },
];
