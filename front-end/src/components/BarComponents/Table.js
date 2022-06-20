import { memo } from "react";
import { Button } from "@chakra-ui/react";
import "./Table.css";
import { useDisclosure } from "react-use-disclosure";
import BarModal from "./BarModal";
import axios from "axios";
import React, { useState, useEffect } from "react";

export const Box = memo(function Box({
    tableName,
    orientation,
    tableSize,
    boxes,
    box,
}) {
    var { isOpen, open, close } = useDisclosure();
    const [reservations, setReservations] = useState({});
    const [filtered, setFiltered] = useState({});
    const [ordered, setOrdered] = useState();
    const [reservation, setReservation] = useState();

    useEffect(() => {
        var idTable = box.idTable;
        try {
            axios
                .get("http://localhost:8080/getReservations/" + idTable)
                .then((res) => {
                    const tables = res.data;
                    setReservations(tables);
                });
            axios
                .get("http://localhost:8080/getOrdersForTable/" + idTable)
                .then((res) => {
                    const tables = res.data;
                    setOrdered(tables);
                });
        } catch (err) {
            console.error(err.response);
        }
    }, [box.idTable]);

    useEffect(() => {
        var dataDummy = new Date();
        var sir = [];
        Array.from(reservations)
            .filter((reservation) => {
                var reservationHours = new Date(
                    reservation.reservationStartTime
                );
                var ore = reservationHours.getHours();
                reservationHours.setHours(ore - 3);

                return (
                    (new Date(reservation.reservationStartTime).setHours(
                        reservationHours.getHours()
                    ) <
                        dataDummy) &
                    (new Date(reservation.reservationStartTime).setHours(
                        reservationHours.getHours() + reservation.time
                    ) >
                        dataDummy)
                );
            })
            .every((reservation) => sir.push(reservation));
        setFiltered(sir);
        setReservation(sir[0]);
    }, [reservations]);

    if (orientation === "Horizontal") {
        return (
            <div>
                <Button
                    onClick={() => {
                        open();
                        isOpen = true;
                    }}
                    width={tableSize * 25}
                    height="60px"
                    {...(ordered
                        ? { colorScheme: "red" }
                        : Array.from(filtered).length
                        ? { colorScheme: "yellow" }
                        : { colorScheme: "green" })}
                >
                    {"Masa " + (Array.from(boxes).indexOf(box) + 1)}
                </Button>
                <BarModal
                    close={close}
                    isOpen={isOpen}
                    table={box}
                    reserved={filtered}
                    reservation={reservation}
                    ordered={ordered}
                    id={Array.from(boxes).indexOf(box) + 1}
                />
            </div>
        );
    } else
        return (
            <div>
                <Button
                    onClick={() => {
                        open();
                        isOpen = true;
                    }}
                    id="rotate"
                    width={tableSize * 25}
                    {...(ordered
                        ? { colorScheme: "red" }
                        : Array.from(filtered).length
                        ? { colorScheme: "yellow" }
                        : { colorScheme: "green" })}
                >
                    <div className="rotateText">
                        {"Masa " + (Array.from(boxes).indexOf(box) + 1)}
                    </div>
                </Button>
                <BarModal
                    close={close}
                    isOpen={isOpen}
                    table={box}
                    reserved={filtered}
                    ordered={ordered}
                    reservation={reservation}
                    id={Array.from(boxes).indexOf(box) + 1}
                />
            </div>
        );
});
