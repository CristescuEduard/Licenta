import { memo } from "react";
import { Button } from "@chakra-ui/react";
import { useDisclosure } from "react-use-disclosure";
import "./Box.css";
import AdminModal from "../../../components/AdminComponents/AdminModal";

export const Box = memo(function Box({
    tableName,
    orientation,
    tableSize,
    table,
}) {
    var { isOpen, open, close } = useDisclosure();

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
                    colorScheme={"facebook"}
                >
                    {tableName}
                </Button>
                <AdminModal
                    close={close}
                    isOpen={isOpen}
                    table={table}
                    idMasa={tableName}
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
                    colorScheme={"facebook"}
                >
                    <div className="rotateText">{tableName}</div>
                </Button>
                <AdminModal
                    close={close}
                    isOpen={isOpen}
                    table={table}
                    idMasa={tableName}
                />
            </div>
        );
});
