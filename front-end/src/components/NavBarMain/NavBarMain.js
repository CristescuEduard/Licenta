import React from "react";
import { NavBarMainData } from "./NavBarMainData";
import "./NavBarMain.css";
import { IconContext } from "react-icons";
import { Link } from "@chakra-ui/react";

function NavBarMain() {
    return (
        <React.Fragment>
            <IconContext.Provider value={{ color: "#fff" }}>
                <nav className="nav-menu active">
                    <ul className="nav-menu-items">
                        <li className="navbar-toggle"></li>
                        {NavBarMainData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link href={item.path}>
                                        {item.icon}
                                        <div className="nav-item">
                                            {item.title}
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </React.Fragment>
    );
}

export default NavBarMain;
