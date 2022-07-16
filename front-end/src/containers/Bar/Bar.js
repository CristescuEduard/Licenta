import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "../../components/BarComponents/Container";
import "./Bar.css";
import DrawerExample from "../../components/BarComponents/DrawerReservations";
function Bar() {
    const [idLayout, setIdLayout] = useState(0);

    useEffect(() => {
        try {
            axios.get("http://localhost:8080/getLayout").then((res) => {
                const layoutDB = res.data;
                setIdLayout(layoutDB.idLayout);
            });
        } catch (err) {
            console.error(err.response);
        }
    }, []);

    return (
        <div className="BarPage">
            <Container idLayout={idLayout} />
            <div className="ReservationButton">
                <DrawerExample />
            </div>
        </div>
    );
}

export default Bar;
