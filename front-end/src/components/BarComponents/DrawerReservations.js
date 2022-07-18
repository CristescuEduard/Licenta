import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DrawerReservations.css";
import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    Button,
    useDisclosure,
    Accordion,
    AccordionItem,
    AccordionButton,
    Box,
    AccordionPanel,
} from "@chakra-ui/react";

import { AddIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons";

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
                });
        } catch (err) {
            console.error(err.response);
        }
    }, [reservations]);

    function deleter(idReservation) {
        var id = idReservation;
        axios.delete("http://localhost:8080/deleteReservation/" + id);
    }

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
                    <div className="Drawer">
                        {Array.from(reservations)
                            .sort(function (a, b) {
                                return (
                                    new Date(a.reservationStartTime) -
                                    new Date(b.reservationStartTime)
                                );
                            })
                            .map((reservation) => {
                                return (
                                    <div
                                        key={reservation.idReservation}
                                        className="ReservationItem"
                                    >
                                        <Accordion allowMultiple>
                                            <AccordionItem>
                                                {({ isExpanded }) => (
                                                    <>
                                                        <h2>
                                                            <div className="Item">
                                                                <AccordionButton>
                                                                    <Box
                                                                        flex="1"
                                                                        textAlign="left"
                                                                    >
                                                                        Reservation
                                                                        for Date{" "}
                                                                        {new Date(
                                                                            reservation.reservationStartTime
                                                                        ).getDate()}
                                                                        {"/"}
                                                                        {new Date(
                                                                            reservation.reservationStartTime
                                                                        ).getMonth() +
                                                                            1}
                                                                    </Box>

                                                                    {isExpanded ? (
                                                                        <MinusIcon fontSize="12px" />
                                                                    ) : (
                                                                        <AddIcon fontSize="12px" />
                                                                    )}
                                                                </AccordionButton>
                                                            </div>
                                                        </h2>

                                                        <AccordionPanel pb={4}>
                                                            <div className="Content">
                                                                {" "}
                                                                Table:{" "}
                                                                {
                                                                    reservation.idTable
                                                                }{" "}
                                                                start hour:{" "}
                                                                {new Date(
                                                                    reservation.reservationStartTime
                                                                ).getHours() -
                                                                    3}{" "}
                                                                duration:{" "}
                                                                {
                                                                    reservation.time
                                                                }{" "}
                                                                hours for:
                                                                {
                                                                    reservation.name
                                                                }
                                                                <Button
                                                                    variant="ghost"
                                                                    onClick={() =>
                                                                        deleter(
                                                                            reservation.idReservation
                                                                        )
                                                                    }
                                                                >
                                                                    <DeleteIcon></DeleteIcon>
                                                                </Button>
                                                            </div>
                                                        </AccordionPanel>
                                                    </>
                                                )}
                                            </AccordionItem>
                                        </Accordion>
                                    </div>
                                );
                            })}
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default DrawerExample;
