import React, { useState, useEffect } from "react";

import DrawerExample from "../../components/BarComponents/DrawerReservations";
import NavBarMain from "../../components/NavBarMain/NavBarMain";
import Statistics from "../Statistics/Statistics";
import "./incercare.css";
function Incercare() {
    return (
        <div className="barPage">
            <NavBarMain />
            <div>
                <h1 className="titlu">Value of products in stock</h1>
                <Statistics />
            </div>
        </div>
    );
}

export default Incercare;
