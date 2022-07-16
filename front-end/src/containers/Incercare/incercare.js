import React, { useState, useEffect } from "react";

import DrawerExample from "../../components/BarComponents/DrawerReservations";
import NavBarMain from "../../components/NavBarMain/NavBarMain";
import Statistics from "../Statistics/Statistics";
function Incercare() {
    return (
        <div className="BarPage">
            <NavBarMain />
            <Statistics />
        </div>
    );
}

export default Incercare;
