import { useState, useEffect } from "react";
import axios from "axios";
import { DraggableBox } from "../BarComponents/Box";

const styles = {
    width: 800,
    height: 800,
    background: "white",
    display: "flex",
    position: "center",
    border: "1px solid black",
};
export const Container = ({ idLayout }) => {
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
    }, [idLayout]);

    return (
        <div style={styles} className="tables">
            {Array.from(boxes).map((box) => (
                <DraggableBox
                    key={box.idTable}
                    id={box.idTable - 1}
                    boxes={boxes}
                    box={box}
                />
            ))}
        </div>
    );
};

export default Container;
