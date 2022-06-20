import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Stack,
    Box,
    useDisclosure,
    FormLabel,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightAddon,
    Select,
    Textarea,
} from "@chakra-ui/react";

function DrawerExample() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const firstField = React.useRef();

    const [reservations, setReservations] = useState({});

    useEffect(() => {
        try {
            axios
                .get("http://localhost:8080/getAllReservations")
                .then((res) => {
                    const reservationsDB = res.data;
                    setReservations(reservationsDB);
                    console.log(reservations);
                });
        } catch (err) {
            console.error(err.response);
        }
    }, []);

    return (
        <>
            <Button colorScheme="teal" onClick={onOpen}>
                See Reservations
            </Button>
            <Drawer
                isOpen={isOpen}
                placement="right"
                initialFocusRef={firstField}
                onClose={onClose}
                size="md"
            >
                <DrawerOverlay />
                <DrawerContent>
                    {Array.from(reservations).map((reservation) => {
                        return (
                            <div key={reservation.idReservation}>
                                {" "}
                                Rezervarea pentru masa: {reservation.idTable} va
                                incepe la ora:
                                {new Date(
                                    reservation.reservationStartTime
                                ).getHours()}{" "}
                                si va dura: {reservation.time} ore
                            </div>
                        );
                    })}
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default DrawerExample;
