import { memo } from "react";
import { Button } from "@chakra-ui/react";
import "./Box.css";

export const Box = memo(function Box({ tableName, orientation, tableSize }) {
    const afisare = async (e) => {
        console.log(tableName, orientation, tableSize);
    };

    if (orientation === "Horizontal") {
        return (
            <Button
                onClick={afisare}
                width={tableSize * 25}
                height="60px"
                colorScheme={"facebook"}
            >
                {tableName}
            </Button>
        );
    } else
        return (
            <Button
                onClick={afisare}
                id="rotate"
                width={tableSize * 25}
                colorScheme={"facebook"}
            >
                <div className="rotateText">{tableName}</div>
            </Button>
        );
});
