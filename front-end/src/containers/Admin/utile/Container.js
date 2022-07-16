import update from "immutability-helper";
import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { useDrop } from "react-dnd";
import { DraggableBox } from "./DraggableBox.js";
import { ItemTypes } from "./ItemTypes.js";
import { snapToGrid as doSnapToGrid } from "./snapToGrid.js";
const styles = {
    width: 800,
    height: 800,
    border: "1px solid black",
    position: "relative",
    background: "white",
};
export const Container = ({ snapToGrid, idLayout }) => {
    const [boxes, setBoxes] = useState({});
    useEffect(() => {
        try {
            axios
                .get("http://localhost:8080/getTablesForLayout/" + idLayout)
                .then((res) => {
                    const tables = res.data;
                    setBoxes(tables);
                });
        } catch (err) {
            console.error(err.response);
        }
    });

    const moveBox = useCallback(
        (idTable, tableX, tableY) => {
            var numar = 0;
            console.log(idTable);
            while (
                boxes[numar].idTable !== idTable + 1 ||
                numar < boxes.lenght
            ) {
                console.log(boxes[numar]);
                numar++;
            }
            setBoxes(
                update(boxes, {
                    [numar]: {
                        $merge: { tableX, tableY },
                    },
                })
            );
            idTable++;
            axios.put("http://localhost:8080/updateTableXY", {
                idTable,
                tableX,
                tableY,
            });
        },
        [boxes]
    );
    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.BOX,
            drop(item, monitor) {
                const delta = monitor.getDifferenceFromInitialOffset();
                let tableX = Math.round(item.tableX + delta.x);
                let tableY = Math.round(item.tableY + delta.y);
                if (snapToGrid) {
                    [tableX, tableY] = doSnapToGrid(tableX, tableY);
                }
                moveBox(item.id, tableX, tableY);
                return undefined;
            },
        }),
        [moveBox]
    );

    return (
        <div ref={drop} style={styles}>
            {Array.from(boxes).map((key) => (
                <DraggableBox
                    key={key.idTable}
                    id={key.idTable - 1}
                    id1={Array.from(boxes).indexOf(key) + 1}
                    {...key}
                    boxes={boxes}
                    box={key}
                />
            ))}
        </div>
    );
};

export default Container;
