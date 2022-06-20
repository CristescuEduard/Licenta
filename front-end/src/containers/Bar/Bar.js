import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "../../components/BarComponents/Container";
import { Button } from "@chakra-ui/react";
import { useDisclosure } from "react-use-disclosure";
import DrawerExample from "../../components/BarComponents/DrawerReservations";
function Bar() {
    const [idLayout, setIdLayout] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const firstField = React.useRef();
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
        <div>
            <Container idLayout={idLayout} />
            <DrawerExample />
        </div>
    );
}

export default Bar;
